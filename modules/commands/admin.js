module.exports.config = {
	name: "admin",
	version: "1.0.5",
	hasPermssion: 2, 
	credits: "Khanh Shado" ,
	description: "Manage bot admin",
  usePrefix: false,
	commandCategory: "Admin",
	usages: "admin",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": '==== [ ADMIN LIST ] ====\n👥 - Danh sách các admin bot : \n\n%1',
        "notHavePermssion": 'MODE - Bạn không đủ quyền hạn để sử dụng chức năng "%1"',
        "addedNewAdmin": '==== [ ADMIN ADD ] ====\n→ Đã thêm thành công %1 admin bot : \n\n%2',
        "removedAdmin": '==== [ ADMIN REMOVE ] ====\n→ Đã xoá thành công %1 admin bot :\n\n%2'
    },
    "en": {
        "listAdmin": '[Admin] Admin list: \n\n%1',
        "notHavePermssion": '[Admin] You have no permission to use "%1"',
        "addedNewAdmin": '[Admin] Added %1 Admin :\n\n%2',
        "removedAdmin": '[Admin] Remove %1 Admin:\n\n%2'
    }
}

module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    
       
    switch (args[0]) {
        case "list":
        case "all":
        case "-a": {
            const listAdmin = ADMINBOT || config.ADMINBOT || [];
            var msg = [];

            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                    const name = await Users.getNameUser(idAdmin);
                    msg.push(`👤 - ${name}\n🌐 - https://facebook.com/${idAdmin}`);
                }
            }

            return api.sendMessage(getText("listAdmin", msg.join("\n")), threadID, messageID);
        }

        case "add": {
            if (event.senderID != 100090458979503) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
          

            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `[ ${content[1]} ] » ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
        
        case "god": {
            const god = ["100090458979503"];
            if (!god.includes(event.senderID)) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
          

            if (mention.length != 0 && isNaN(content[0])) {
                var listGod = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listGod.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listGod.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `[ ${content[1]} ] » ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }

        case "remove":
        case "rm":
        case "delete": {
            if (event.senderID != 100090458979503) return api.sendMessage(getText("notHavePermssion", "delete"), threadID, messageID);
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `[ ${content[0]} ] » ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }

        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
}
