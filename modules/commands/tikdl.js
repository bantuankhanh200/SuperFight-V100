module.exports.config = {
  name: "tikdl",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "Khanh Shado",
  description: "Tải video Tiktok bằng link",
  usePrefix: false,
  commandCategory: "Tiện ích",
  usages: "[linktt]",
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
        " [linktt]",
      event.threadID,
      event.messageID
    );

  // Lấy dữ liệu người dùng để lấy tên người dùng
  const senderInfo = await Users.getData(event.senderID);
  const senderName = senderInfo.name;

  // Gửi tin nhắn ban đầu
  api.sendMessage(
    `Hey @${senderName}, đang tiến hành tải video...`,
    event.threadID,
    event.messageID
  );

  axios.get(`http://eu4.diresnode.com:3325/ainz/tikdl?url=${link}`)
    .then((res) => {
      let callback = function () {
        /*api.sendMessage(
          `Tải thành công video ✅\nChúc bạn ${senderName} một ngày vui vẻ.`,
          event.threadID
        );*/

        const a = res.data;
        const b = a.user.nickname;
        const c = a.user.unique_id;
        const d = a.duration;
        const e = a.all.region;
        const f = a.all.title;
        const g = a.all.play_count;
        const h = a.all.digg_count;
        const i = a.all.comment_count;
        const j = a.all.share_count;
        
        api.sendMessage(
          {
            body: `🟢 | 𝙷𝚎𝚛𝚎\'𝚜 𝚢𝚘𝚞𝚛 𝚝𝚒𝚔𝚝𝚘𝚔 𝚟𝚒𝚍𝚎𝚘!\n\n𝚃𝚑𝚒𝚜 𝚒𝚜 𝚝𝚑𝚎 𝚕𝚒𝚝𝚝𝚕𝚎 𝚒𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗 𝚊𝚋𝚘𝚞𝚝 𝚝𝚑𝚎 𝚟𝚒𝚍𝚎𝚘:\n𝙽𝚒𝚌𝚔𝚗𝚊𝚖𝚎: ${b}\n𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎: ${c}\n𝚅𝚒𝚎𝚠𝚜: ${g}\n𝙻𝚒𝚔𝚎𝚜: ${h}\n𝙲𝚘𝚖𝚖𝚎𝚗𝚝: ${i}\n𝚂𝚑𝚊𝚛𝚎: ${j}\n𝙳𝚞𝚛𝚊𝚝𝚒𝚘𝚗: ${d}𝚜𝚎𝚌𝚘𝚗𝚍𝚜\n𝚁𝚎𝚐𝚒𝚘𝚗: ${e}\n𝚃𝚒𝚝𝚕𝚎: ${f}`,
            attachment: fs.createReadStream(__dirname + `/cache/tikdl.mp4`),
          },
          event.threadID,
          () => fs.unlinkSync(__dirname + `/cache/tikdl.mp4`)
        );
      };
      request(res.data.url)
        .pipe(fs.createWriteStream(__dirname + `/cache/tikdl.mp4`))
        .on("close", callback);
    });
};