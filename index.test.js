const process = require("process");
const cp = require("child_process");
const download = require("./src/download");
const decompress = require("./src/decompress");
const prepare = require("./src/prepare");
const command = require("./src/command");
const fs = require("fs");
const path = require("path");
const config = require("./config/config");

test("prepare", async () => {
    await prepare(config.temp);
    await expect(fs.existsSync(config.temp));
}, 5000);

test("download file", async () => {
    await download(config.resharperDownload, config.tempFile);
    await expect(fs.existsSync(config.tempFile));
}, 600000);

test("decompress file", async () => {
    await decompress(config.tempFile, config.tempDirectory);
    await expect(fs.existsSync(`${config.tempDirectory}\\cleanupcode.exe`));
    await expect(fs.existsSync(`${config.tempDirectory}\\dupfinder.exe`));
    await expect(fs.existsSync(`${config.tempDirectory}\\inspectcode.exe`));
}, 600000);

test("resharper", async () => {
    await command(`cd ${config.tempDirectory} && inspectcode --version`);
}, 10000);
