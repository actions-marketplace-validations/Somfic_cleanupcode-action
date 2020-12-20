const decompress = require("decompress");
const config = require("../config/config");
const core = require("@actions/core");
module.exports = (file, dir) =>
    new Promise((resolve, reject) => {
        core.info("Decompressing ...");
        decompress(file, dir)
            .then(() => {
                core.info("Decompressed");
                resolve();
            })
            .catch((err) => {
                core.warning("Could not decompress");
                core.error(err);
                reject(err);
            });
    });
