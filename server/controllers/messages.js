import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export const fetchMessages = async (req, res) => {
  const { user1, user2 } = req.headers;

  try {
    const chat = await Chat.findOne({
      participants: { $all: [user1, user2] },
    })
      .populate("messages")
      .populate("participants")
      .populate({
        path: "messages",
        populate: "sender",
      });

    res.status(200).json({ chat });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const createMessage = async (req, res) => {
  const { content, user1, user2 } = req.body;
  console.log(content, user1, user2);
  if (!content) {
    return res.status(403).json({ message: "Cannot send empty message" });
  }

  try {
    const chat = await Chat.findOne({ participants: { $all: [user1, user2] } });
    const newMessage = new Message({ content, sender: user1 });

    if (!chat) {
      console.log("no chat");
      const newChat = new Chat({
        participants: [user1, user2],
        messages: [newMessage],
      });

      await newChat.save();
      console.log("chat created");
    } else {
      console.log("chat exists");
      chat.messages.push(newMessage);
      await chat.save();
    }

    await newMessage.save();
    res.status(201).json({ message: "Message created successfully!" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};
