const fs = require("fs");
const Path = require("path");

module.exports = (dir) =>
    new Promise(async (resolve, reject) => {
        try {
            if (fs.existsSync(dir)) {
                clearFolder(dir);
            }

            fs.mkdirSync(dir);

            resolve();
        } catch (err) {
            reject(err);
        }
    });

function clearFolder(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            const curPath = Path.join(path, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                clearFolder(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
