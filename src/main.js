const download = require("./download");
const prepare = require("./prepare");
const decompress = require("./decompress");
const config = require("../config/config");
const command = require("./command");
const core = require("@actions/core");

module.exports = () =>
    new Promise(async (resolve, reject) => {
        try {
            let solution = core.getInput("solution");

            await prepare(config.temp);
            await download(config.resharperDownload, config.tempFile);
            await decompress(config.tempFile, config.tempDirectory);
            await command(
                `cd ${config.tempDirectory} && cleanupcode ${solution}`
            );
            resolve();
        } catch (err) {
            reject(err);
        }
    });
