export function validatePostExtension(extension: string) {
  if (extension.trim() === "." || extension.trim() === "") {
    return ".unknown";
  }
  return extension;
}
