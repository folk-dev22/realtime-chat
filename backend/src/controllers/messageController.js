const Message = require('../models/Message');

// ดึงข้อความใน room
const getMessages = async (req, res) => {
  try {
    const { room } = req.params;
    const messages = await Message.find({ room })
      .populate('sender', 'username avatar')
      .sort({ createdAt: 1 })
      .limit(50);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMessages };