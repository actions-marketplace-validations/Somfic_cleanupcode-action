const terminal = require("child_process").spawn("bash");
const config = require("../config/config");
const core = require("@actions/core");

terminal.stdout.on("data", function (data) {
    console.log("stdout: " + data);
});

terminal.on("exit", function (code) {
    console.log("child process exited with code " + code);
});

module.exports = (command) =>
    new Promise((resolve, reject) => {
        try {
            var child = require("child_process");
            child.stdout.on("data", (data) => {
                core.debug(data);
            });
            child.on("exit", () => {
                core.debug("Resharper process exited");
                resolve();
            });
            child.execSync(command);
        } catch (err) {
            reject(err);
        }
    });
