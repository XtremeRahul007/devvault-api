import type { FileMetaData, UploadQuery } from "../@types/file.types.js";

export function applyFilters(files: FileMetaData[], filters: UploadQuery): FileMetaData[] {
  if (!filters.name && !filters.extension) return files;

  return files.filter(file => {
    if (filters.name && !file.originalName.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }

    if (filters.extension && normalizeExtension(file.extension) !== normalizeExtension(filters.extension)) {
      return false;
    }

    return true;
  });
}

export function applySorting(files: FileMetaData[], sorting: UploadQuery): FileMetaData[] {
  if (!sorting.sort) return files;

  const multiplier = sorting.order === "asc" ? 1 : -1;
  switch (sorting.sort) {
    case "name":
      return files.sort((a, b) => a.originalName.localeCompare(b.originalName) * multiplier);

    case "size":
      return files.sort((a, b) => a.size - b.size * multiplier);

    case "uploadedAt":
      return files.sort((a, b) => a.uploadedAt - b.uploadedAt * multiplier);
  }
}

export function applyPagination(files: FileMetaData[], Pagination: UploadQuery): FileMetaData[] {
  if (!Pagination.page || !Pagination.limit) return files;

  const start = (Pagination.page - 1) * Pagination.limit;
  const end = start + Pagination.limit;

  return files.slice(start, end);
}

const normalizeExtension = (extension: string): string => {
  return extension.trim().toLowerCase().replace(/^\./, "");
}