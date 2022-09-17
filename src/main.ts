import {Request} from "http-proxy-middleware/dist/types";
import {AxiosResponse} from "axios";
import { User } from "./models/User";
import axios from "axios"
import {makeHttpRequest} from "./Services/RequestHelper";
import {Post} from "./models/Post";
import {userPostsAggregator} from "./Aggregator/UserPostsAgregattor";
const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = 3031;
const HOST = "0.0.0.0";
const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";
app.use(morgan('dev'));

// @ts-ignore
app.use('', (req, res, next) => {
        if (req.headers.authorization) {
                next();
        } else {
                res.sendStatus(403);
        }
});
app.get('/api/userposts', async (req: any, res: any) => {
        let dataUsers = await userPostsAggregator()
        return res.send(dataUsers)
})
app.use('/api/*', createProxyMiddleware({
        target: API_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: async function (path: string, req: Request) {
                return path.replace("api/", "");
        }
        ,
}));

app.listen(PORT, HOST, () => {
        console.log(`Starting Proxy at ${HOST}:${PORT}`);
});