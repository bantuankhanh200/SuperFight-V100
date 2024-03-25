module.exports.config = {
  name: "fbdl",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "Khanh Shado",
  description: "Tải video Facebook bằng link",
  usePrefix: false,
  commandCategory: "Tiện ích",
  usages: "[linkfb]",
  cooldowns: 1,
};

module.exports.run = async ({ api, event, args, Users }) => {
  const axios = require("axios");
  const request = require("request");
  const fs = require("fs");
  let link = args[0];
  if (!args[0])
    return api.sendMessage(
      "Dùng " +
        global.config.PREFIX +
        this.config.name +
        " [Link Video Facebook]",
      event.threadID,
      event.messageID
    );

  // Lấy dữ liệu người dùng để lấy tên người dùng 
  const senderInfo = await Users.getData(event.senderID);
  const senderName = senderInfo.name;

  // Send initial message
  api.sendMessage(
    `Hey @${senderName}, đang tiến hành tải video...`,
    event.threadID,
    event.messageID
  );

  axios.get(`http://eu4.diresnode.com:3325/ainz/fbdl?url=${link}`)
    .then((res) => {
      let callback = function () {
        
        api.sendMessage(
          {
            body: `Tải video thành công ✅\nChúc bạn ${senderName} một ngày vui vẻ.`,
            attachment: fs.createReadStream(__dirname + `/cache/fbdl.mp4`),
          },
          event.threadID,
          () => fs.unlinkSync(__dirname + `/cache/fbdl.mp4`)
        );
      };
      request(res.data.result)
        .pipe(fs.createWriteStream(__dirname + `/cache/fbdl.mp4`))
        .on("close", callback);
    });
};