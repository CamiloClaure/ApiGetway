"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserPostsAgregattor_1 = require("./Aggregator/UserPostsAgregattor");
const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 3031;
const HOST = "localhost";
const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";
app.use(morgan('dev'));
// @ts-ignore
app.use('', (req, res, next) => {
    if (req.headers.authorization) {
        next();
    }
    else {
        res.sendStatus(403);
    }
});
app.get('/api/userposts', async (req, res) => {
    let dataUsers = await (0, UserPostsAgregattor_1.userPostsAggregator)();
    return res.send(dataUsers);
});
app.use('/api/*', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: async function (path, req) {
        return path.replace("api/", "");
    },
}));
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
