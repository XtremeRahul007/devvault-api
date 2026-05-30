import fs from 'fs';
import path from 'path';
import type { ErrorLogData, RequestLogData } from '../@types/vault.types.js';

const folderPath = path.join(process.cwd(), "logs");

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