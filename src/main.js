const command = require("./command");
const core = require("@actions/core");

module.exports = () =>
    new Promise(async (resolve, reject) => {
        try {
            let solution = core.getInput("solution");
            // let solution =
            //     "C:\\Users\\somfi\\Documents\\GitHub\\EliteAPI\\EliteAPI.sln";
            await command(
                `dotnet tool install -g JetBrains.ReSharper.GlobalTools`
            );
            await command(`jb cleanupcode ${solution}`);
            resolve();
        } catch (err) {
            reject(err);
        }
    });
