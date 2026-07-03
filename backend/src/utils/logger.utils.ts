import fs from 'fs';
import path from 'path';
import { infrastructureConfig } from '../core/configs/infrastructure.js';

type ErrorLogData = {
    requestId: string;
    method: string;
    url: string;
    message: string;
    statusCode?: number;
    stack?: string;
};

type RequestLogData = {
    requestId: string;
    start: string | number | Date;
    method: string;
    originalUrl: string;
    statusCode: number;
    duration: number;
    ip: string;
};

const folderPath = path.join(process.cwd(), infrastructureConfig.LOG_PATH);

export function logError(data: ErrorLogData) {
    const log = `[${data.requestId}][${new Date().toISOString()}] ${data.method} ${data.url} - ${data.message} [${data.statusCode ?? 500}]\n${data.stack}\n\n`;
    writeLog("error.log", log);
}

export function logRequest(data: RequestLogData) {
    const log = `[${data.requestId}][${new Date(data.start).toISOString()}] ${data.method} ${data.originalUrl} - ${data.statusCode} ${data.duration}ms ${data.ip}\n`;
    writeLog("requests.log", log);
}

function writeLog(fileName: string, content: string) {
    const filePath = path.join(folderPath, fileName);
    fs.appendFile(filePath, content, err => { if (err) console.error("Failed to write log:", err); });
}