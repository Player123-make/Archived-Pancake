const http = require("http");
const fs = require("fs");
const path = require("path");
const process = require("child_process")

let serv = http.createServer((req, res) => {

    // Page
    if (req.url === "/") {

        const files = fs.readdirSync("./Toindex");

        let html = `
        <!DOCTYPE html>
        <html>
        <body>
            <p style="text-align:center; font-size:20px">⚠</p><p style="color:red; font-weight:2px; font-size:20px; text-align: center">You need to know your IPv4 address to access the site from another device. To do this, you need to run the "ipconfig" command in a separate CMD tab.</p>
            <h1>Files</h1>
        `;

        // Encoded files
        for (const file of files) {
            html += `<a href="/${encodeURIComponent(file)}">${file}</a><br>`;
        }

        html += `
        </body>
        </html>
        `;

        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });

        return res.end(html);
    }


    // Decoded files and folder path
    const file = decodeURIComponent(req.url.slice(1));
    const filePath = path.join(__dirname, "Toindex", file);

    if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        return res.end("File not found");
    }

    res.setHeader(
        "Content-Disposition",
        `attachment; filename="${path.basename(filePath)}"`
    );

    fs.createReadStream(filePath).pipe(res);

}).listen(3030);

async function start() {
    process.exec("start http://localhost:3030")
}

start()