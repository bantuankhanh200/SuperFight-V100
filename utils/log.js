const chalk = require('chalk');

module.exports = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[ Lưu ý ] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[ Lỗi rồi nhóc ] » ') + data);
			break;
		default:
			console.log(chalk.magenta(`${option} » `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[ Zeus Project ] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[ Zeus Project ] » ') + data);
			break;
		default:
			console.log(chalk.green(`[ Zeus Project ] » `) + data);
			break;
	}
}