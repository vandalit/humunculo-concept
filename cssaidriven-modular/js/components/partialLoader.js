export async function loadPartial(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load partial: ${path}`);
    }
    return await response.text();
}