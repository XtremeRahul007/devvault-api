export function formatFileSize(bytes: number) {
    const maxFileSize = Number(import.meta.env.VITE_MAX_FILE_SIZE);

    if (bytes > maxFileSize) {
        throw new Error("File size too big!");
    }
    const units = ['B', 'KB', 'MB', 'GB'];

    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(2)}${units[unitIndex]}`;
}