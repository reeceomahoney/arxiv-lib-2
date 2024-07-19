"use client";

import React, { useState } from "react";
import { Folder as FolderIcon, ChevronRight, ChevronDown } from "lucide-react";

import type { Folder } from "@/lib/definitions";

export default function FileExplorer({
  folders,
  setFolders,
  onPathChange,
}: {
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  onPathChange: (path: number[]) => void;
}) {
  const toggleFolder = (index: number, path: number[] = []): void => {
    setFolders((currentFolders) => {
      const findAndToggleFolder = (
        folders: Folder[],
        path: number[]
      ): Folder[] => {
        // Base case: If path is empty, toggle the folder at the root level.
        if (path.length === 0) {
          return folders.map((folder, idx) =>
            idx === index ? { ...folder, isOpen: !folder.isOpen } : folder
          );
        }

        // Recursive case: Navigate deeper into the folders structure.
        const [currentIndex, ...restPath] = path;
        return folders.map((folder, idx) =>
          idx === currentIndex
            ? {
                ...folder,
                folders: findAndToggleFolder(folder.folders || [], restPath),
              }
            : folder
        );
      };

      return findAndToggleFolder(currentFolders, path);
    });
  };

  const renderFolders = (folders: Folder[], path: number[] = []) => (
    <ul className="list-none">
      {folders.map((folder, index) => (
        <li key={index}>
          <div className="hover:bg-gray-300">
            <div
              className={`cursor-pointer p-2 flex items-center truncate ${
                "pl-" + 4 * path.length
              }`}
            >
              {folder.folders && folder.folders.length > 0 ? (
                folder.isOpen ? (
                  <ChevronDown
                    className="mr-2 hover:text-gray-400"
                    onClick={() => {
                      toggleFolder(index, path);
                    }}
                  />
                ) : (
                  <ChevronRight
                    className="mr-2 hover:text-gray-400"
                    onClick={() => {
                      toggleFolder(index, path);
                    }}
                  />
                )
              ) : (
                <div className="w-6 h-6 mr-2"></div> // Placeholder for alignment
              )}
              <div
                className="flex items-center hover:text-gray-500"
                onClick={() => {
                  onPathChange([...path, index]);
                }}
              >
                <FolderIcon className={`mr-2 ${folder.papers && folder.papers.length > 0 ? 'text-green-500' : ''}`} />
                <span className="truncate">{folder.name}</span>
              </div>
            </div>
          </div>
          {folder.isOpen && folder.folders && (
            <ul className="">
              {renderFolders(folder.folders, [...path, index])}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex-1">
      <h1 className="text-lg font-semibold md:text-2xl p-6">File Explorer</h1>
      {renderFolders(folders)}
    </div>
  );
}
