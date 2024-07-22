import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Folder } from "@/lib/definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function collectPapers(folder: Folder) {
  return null;
}

export function nestFolders(folders: Folder[]): Folder[] {
  const folderMap: { [key: string]: Folder } = {};
  const nestedFolders: Folder[] = [];

  // Map folders by id for easy lookup
  folders.forEach((folder) => {
    folderMap[folder.id] = { ...folder, folders: [] };
  });

  // Assign children to their respective parents or identify root folders
  folders.forEach((folder) => {
    if (folder.parentId && folderMap[folder.parentId]) {
      folderMap[folder.parentId].folders!.push(folderMap[folder.id]);
    } else {
      nestedFolders.push(folderMap[folder.id]);
    }
  });

  return nestedFolders;
}
