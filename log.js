const fs = require("fs");

function saveLog(message) {
  const messageWithSpace = message + "\n";
  fs.appendFile("./logs.txt", messageWithSpace, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = saveLog;
