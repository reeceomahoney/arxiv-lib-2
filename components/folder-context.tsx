"use client";

import React, { createContext, useContext } from "react";
import type { Folder } from "@/lib/definitions";

interface FolderDataContextProps {
  folders: Folder[];
  papers: any[];
  currentId: string;
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
}

const FolderDataContext = createContext<FolderDataContextProps | undefined>(
  undefined
);

export const useFolderData = () => {
  const context = useContext(FolderDataContext);
  if (!context) {
    throw new Error("useFolderData must be used within a FolderDataProvider");
  }
  return context;
};

interface FolderDataProviderProps {
  children: React.ReactNode;
  folderData: Folder[];
  papers: any[];
}

export const FolderDataProvider: React.FC<FolderDataProviderProps> = ({
  children,
  folderData,
  papers,
}) => {
  const [folders, setFolders] = React.useState<Folder[]>(folderData);
  const allPapersFolderId =
    folders.find((f) => f.name === "All Papers")?.id || "";

  const [currentId, setCurrentId] = React.useState(allPapersFolderId);

  return (
    <FolderDataContext.Provider
      value={{ folders, papers, currentId, setFolders, setCurrentId }}
    >
      {children}
    </FolderDataContext.Provider>
  );
};
