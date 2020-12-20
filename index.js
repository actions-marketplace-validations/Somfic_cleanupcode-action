const core = require("@actions/core");
const main = require("./src/main");

async function run() {
    try {
        await main();
        process.exit();
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
