export interface Folder {
    id: string;
    name: string;
    parentId: string | null;
    createdAt: number;
}

export type UpdateFolderInput = Partial<Pick<Folder, "name">>;
export type MoveFolderInput = Partial<Pick<Folder, "id">>;