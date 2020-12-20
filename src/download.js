const fs = require("fs");
const https = require("https");
const core = require("@actions/core");

function download(url, dest) {
    return new Promise((resolve, reject) => {
        core.info(`Downloading...`);
        core.debug(`Downloading Resharper from ${url}`);

        const request = https.get(url, (response) => {
            if (response.statusCode === 200) {
                const file = fs.createWriteStream(dest, { flags: "wx" });
                file.on("finish", () => {
                    core.info(`Downloaded`);
                    resolve();
                });
                file.on("error", (err) => {
                    file.close();
                    if (err.code === "EEXIST") reject("File already exists");
                    else fs.unlink(dest, () => reject(err.message)); // Delete temp file
                });
                response.pipe(file);
            } else if (
                response.statusCode === 302 ||
                response.statusCode === 301
            ) {
                //Recursively follow redirects, only a 200 will resolve.
                download(response.headers.location, dest).then(() => resolve());
            } else {
                reject(
                    `Server responded with ${response.statusCode}: ${response.statusMessage}`
                );
            }
        });

        request.on("error", (err) => {
            core.warning("Could not download");
            core.error(response);
            reject(err.message);
        });
    });
}

module.exports = download;
