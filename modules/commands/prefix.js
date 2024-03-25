module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Khanh Shado",
  description: "Xem dấu lệnh bot",
  commandCategory: "Tiện ích",
  usages: "",
  usePrefix: false,
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"", 
    "axios":""
  }
};

module.exports.run = async function ({ api, event, args, client }) {
  const { threadID, messageID, senderID, messageReply } = event;
  const request = require('request');
  const fs = require("fs-extra");
  const axios = require("axios");
  const { resolve } = require("path");
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY");
  const timeStart = Date.now();
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
   
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  const nameBot = config.BOTNAME;
  const name = global.data.userName.get(event.senderID);
  const { commands } = global.client;
  
    return api.sendMessage(`==== [ PREFIX ] ====\n✏️ - Prefix gốc: ${global.config.PREFIX}\n📌 - Prefix hiện tại: ${prefix}\n📝 - Số lệnh: ${commands.size.length}\n👤 - Tổng người dùng: ${global.data.allUserID.length}\n👥 - Tổng nhóm: ${global.data.allThreadID.length}\n⏰ - Bây giờ là: ${time}\n💓 - Tên Bot: ${nameBot}\n⚙️ - Ping: ${Date.now() - timeStart}ms\n👉 Request: ${name} - `, event.threadID, event.messageID);
  }