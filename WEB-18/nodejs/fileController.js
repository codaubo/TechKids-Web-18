const fs = require("fs");

const writeFileCustom = function(filePath, data) {
	fs.writeFileSync(filePath, data);
}

const readFileCustom = function(filePath) {
	return fs.readFileSync(filePath, { encoding: "utf8" });
}

module.exports = {
	writeFileCustom,
	readFileCustom
}