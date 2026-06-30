import { toast } from "../services/toastService";

export async function apiResponse<T>(response: Response): Promise<T | undefined>{
    if (!response.ok) {
        toast.error(`API request failed with status ${response.status}`);
        return undefined;
    }

    return response.json() as Promise<T>;
}

/*
const response = await fetch(`/api/file/download/${fileId}`, { method: 'GET' });

if (!response.ok) {
    throw new Error("Download Failed");
}

const filename = getFilenameFromResponse(response) ?? 'download';

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = filename;

document.body.appendChild(a);
a.click();

a.remove();
window.URL.revokeObjectURL(url);
*/

/*
export function getFilenameFromResponse(response: Response): string | null {
    const disposition = response.headers.get('Content-Disposition');
    if (!disposition) return null;

    const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
    if (utf8Match) {
        return decodeURIComponent(utf8Match[1]);
    }

    const asciiMatch = disposition.match(/filename="?([^";]+)"?/i);
    if (asciiMatch) {
        return asciiMatch[1];
    }

    return null;   
}
*/