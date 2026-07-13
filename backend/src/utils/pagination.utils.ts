import type { PaginatedResponse } from "../@types/file.types.js";

export function createPaginatedResponse<T>(data: T[], totalFiles: number, page: number, limit: number): PaginatedResponse<T> {
  return {
    page,
    limit,
    totalFiles,
    totalPages: Math.ceil(totalFiles / limit),
    data
  }
}