const axios = require('axios'); // Dùng để tương tác với Facebook Messenger API

module.exports.config = {
  name: "bard",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Tương tác với Bard",
  commandCategory: "Tiện ích",
  usages: "[câu hỏi]",
  usePrefix: false,
  cooldowns: 5,
};

module.exports.run = async function ({ event, api }) {
  try {
    const senderId = event.senderID;
    const messageText = event.message.text;

    // Kiểm tra xem người dùng có yêu cầu lệnh `bard` hay không
    if (messageText === "!bard" || messageText.startsWith("/bard")) {
      // Lấy thông tin về Bard thông qua API
      const response = await axios.get('https://bard.ai/api/v1/info');
      const info = response.data;

      // Tạo nội dung tin nhắn
      const message = `
        Bard - Trợ lý AI đa năng

        * Tên: Bard
        * Phiên bản: ${info.version}
        * Tính năng:
            * Trả lời câu hỏi theo thông tin thực tế
            * Viết văn bản sáng tạo
            * Dịch ngôn ngữ
            * ... và nhiều hơn nữa!

        Để biết thêm thông tin, hãy truy cập https://bard.google.com
      `;

      // Gửi tin nhắn cho người dùng
      return api.sendMessage(message, event.threadID);
    } else {
      // Xử lý các tin nhắn khác (tùy chọn)
    }
  } catch (error) {
    console.error(error);
    return api.sendMessage('Đã xảy ra lỗi. Vui lòng thử lại sau!', event.threadID);
  }
};
