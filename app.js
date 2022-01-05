import dotenv from 'dotenv';
import express from 'express';
import request from 'request';

dotenv.config();
const app = express();

async function main() {
    app.get('/', (req, res) => {
        const dest = req.headers['x-destination'];
        console.log(`Forwarding request to '${dest}' for '${req.ip}'`);
        req.pipe(request(dest)).pipe(res);
    })

    app.listen(process.env.PORT, () => {
        console.log(`Eagle middleman server listening on port ${process.env.PORT}`);
    });
}

main();