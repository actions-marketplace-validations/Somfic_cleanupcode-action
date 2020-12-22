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
            var spawn = require("child_process").spawn;

            core.debug(`> ${command}`);

            var child = spawn(command, {
                stdio: "inherit",
                shell: true,
                cwd: config.tempDirectory,
            });

            child.on("close", function (code) {
                resolve();
            });
        } catch (err) {
            reject(err);
        }
    });
