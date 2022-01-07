import dotenv from 'dotenv';
import express from 'express';
import request from 'request';
import fs from 'fs';

if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}

const logname = `logs/log-${new Date().getTime()}.txt`;
const log = fs.createWriteStream(logname);
process.stdout.write = process.stderr.write = log.write.bind(log);

dotenv.config();
const app = express();

async function main() {
    app.get('/cool-log-mama-horse', (req, res) => {
        const file = fs.readFileSync(logname).toString('ascii').replace(/\n/g, '<br>');
        res.send(`<p>${file}</p>`);
    });

    app.get('/', (req, res) => {
        const dest = req.headers['x-destination'];
        console.log(`Forwarding request to '${dest}' for '${req.ip}'`);
        try {
            req.pipe(request(dest)).pipe(res);
        } catch (e) {
            res.send(e);
        }
    });

    app.listen(process.env.PORT, () => {
        console.log(`Eagle middleman server listening on port ${process.env.PORT}`);
    });
}

main();