const imgur = require("imgur");
const fs = require("fs");
const { downloadFile } = require("../../utils/index");

module.exports.config = {
  name: "imgur",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Khanh Shado",
  description: "Imgur",
  commandCategory: "Tiện ích",
  usages: "[reply]",
  usePrefix: false,
  cooldowns: 0
};

module.exports.run = async function ({ api, event, threads }) {
  const axios = require("axios")
  const { threadID, type, messageReply, messageID } = event;
  const ClientID = "c76eb7edd1459f3";
  if (type !== "message_reply" || messageReply.attachments.length == 0);
return api.sendMessage("Bạn phải reply một ảnh, video nào đó", threadID, messageID);
imgur.setClientId(ClientID);
  const attachmentSend = [];
  async function getAttachments(attachments) {
    let startFile = 0;
    for (const data of attachments) {
      const ext = data.type == "photo" ? "jpg" :
        data.type == "video" ? "mp4" :
          data.type == "audio" ? "m4a" :
            data.type == "animated_image" ? "gif" : "txt";
      const pathSave = __dirname + `/cache/${startFile}.${ext}`
      ++startFile;
      const url = data.url;
      await downloadFile(url, pathSave);
      attachmentSend.push(pathSave);
  await getAttachments(messageReply.attachments);
  let msg = "", Succes = 0, Error = [];
  for (const getImage of attachmentSend) {
    try {
      const getLink = await imgur.uploadFile(getImage)
      console.log(getLink);
      msg += `"${getLink.link}",\n`
      fs.unlinkSync(getImage)
    } catch {
      Error.push(getImage);
      fs.unlinkSync(getImage)
   api.sendMessage(`${msg}`, threadID, messageID);
   }                         
          }