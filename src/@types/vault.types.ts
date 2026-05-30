export interface VaultItem {
    id: number,
    title: string,
    type: string,
    content: string,
    tags: string[]
}

export interface RequestLogData {
    requestId: string,
    start: number,
    method: string,
    originalUrl: string,
    statusCode: number,
    duration: number,
    ip: string | null
}

export interface ErrorLogData {
    requestId: string,
    method: string,
    url: string,
    message: string,
    statusCode: number,
    stack: string
}