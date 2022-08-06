
const server = require('express')();
const next = require('next')
const { parse } = require("url");
const fs = require("fs");
const https = require('https');
const http = require('http');

const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = {
    key: fs.readFileSync('./cert/CA/localhost/localhost.decrypted.key'),
    cert: fs.readFileSync('./cert/CA/localhost/localhost.crt')


};  


const serverHttp = https.createServer(
    {
        key: fs.readFileSync('./cert/CA/localhost/localhost.decrypted.key'),
        cert: fs.readFileSync('./cert/CA/localhost/localhost.crt')
    },
    server
)
    ;

app.prepare().then(() => {
    // const server = express()

    server.get('/service-worker.js', (req, res) => {
        app.serveStatic(req, res, './.next/service-worker.js')
    })

    const serviceWorkers = [
        {
            filename: 'service-worker.js',
            path: './.next/service-worker.js',
        },
        {
            filename: 'firebase-messaging-sw.js',
            path: './public/firebase-messaging-sw.js',
        },
    ]

    serviceWorkers.forEach(({ filename, path }) => {
        server.get(`/${filename}`, (req, res) => {
            app.serveStatic(req, res, path)
        })
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    serverHttp.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on https://localhost:${port}`)
    })
})
