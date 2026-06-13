export async function getFiles() {
    const response = await fetch("/api/file");

    if (!response.ok) {
        throw new Error("Failed to fetch files");
    }

    return response.json();
}