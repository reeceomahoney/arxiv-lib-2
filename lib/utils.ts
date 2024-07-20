import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Folder } from "@/lib/definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function collectPapers(folder: Folder) {
  let papers = folder.papers ?? [];
  if (folder.folders) {
    folder.folders.forEach((subFolder) => {
      papers = papers.concat(collectPapers(subFolder));
    });
  }
  return papers;
}
