const terminal = require("child_process").spawn("bash");
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

            core.info(`> ${command}`);

            var child = spawn(command, {
                stdio: "inherit",
                shell: true,
            });

            child.on("close", function (code) {
                resolve();
            });

            child.on("error", function (err) {
                reject(err);
            });
        } catch (err) {
            reject(err);
        }
    });
