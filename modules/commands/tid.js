const config = {
  name: "tid",
  hasPermssion: 0,
  credits: "Khanh Shado ",
  description: "Lấy id box",
  commandCategory: "Tiện ích",
  usages: "tid",
  usePrefix: false,
  cooldowns: 5,

  };
const run = async function ({ api, event, args }) {
  
  const tid = event.threadID;
 
  return api.sendMessage(`${tid}`, event.threadID, event.messageID);
}

module.exports = { config, run };