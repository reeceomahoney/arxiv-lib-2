"use client";

import { Menu } from "lucide-react";
import React from "react";
import { Folder as FolderIcon, ChevronRight, ChevronDown } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import type { Folder } from "@/lib/definitions";
import { collectPapers, nestFolders } from "@/lib/utils";

export function Explorer({
  folderData,
  folderId,
}: {
  folderData: Folder[];
  folderId: string;
}) {
  const [folders, setFolders] = React.useState<Folder[]>(folderData);
  const [currentId, setCurrentId] = React.useState(folderId);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const isCurrentFolder = (id: string) => {
    return currentId === id;
  };

  const toggleFolder = (id: string): void => {
    setFolders((folders) =>
      folders.map((f) => (f.id === id ? { ...f, isOpen: !f.isOpen } : f))
    );
  };

  const handleClick = (id: string): void => {
    const params = new URLSearchParams(searchParams);
    setCurrentId(id);
    params.set("folder", id);
    replace(`${pathname}?${params.toString()}`);
  };

  const renderFolders = (folders: Folder[], depth: number = 0) => (
    <ul className="list-none">
      {folders.map((folder) => (
        <li key={folder.id}>
          <div
            className={`cursor-pointer text-muted-foreground hover:bg-muted ${
              isCurrentFolder(folder.id) ? "bg-muted" : ""
            }`}
          >
            <div
              style={{ paddingLeft: `${0.5 + 0.5 * depth}rem` }}
              className={`flex items-center p-2`}
            >
              {folder.folders && folder.folders.length > 0 ? (
                folder.isOpen ? (
                  <ChevronDown
                    className="mr-2 hover:text-primary"
                    onClick={() => toggleFolder(folder.id)}
                  />
                ) : (
                  <ChevronRight
                    className="mr-2 hover:text-primary"
                    onClick={() => toggleFolder(folder.id)}
                  />
                )
              ) : (
                <div className="w-6 h-6 mr-2"></div> // Placeholder for alignment
              )}
              <div
                className={`flex items-center truncate hover:text-primary ${
                  isCurrentFolder(folder.id) ? "text-primary" : ""
                }`}
                onClick={() => handleClick(folder.id)}
              >
                <FolderIcon
                  className={`mr-2 flex-shrink-0 fill-current ${
                    folder.name === "All Papers" ? "text-highlight" : ""
                  }`}
                />
                <span className="text-sm truncate">{folder.name}</span>
                {/* TODO: collect paper is broken */}
                {/* {collectPapers(folder).length > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({collectPapers(folder).length})
                  </span>
                )} */}
              </div>
            </div>
          </div>
          {folder.isOpen && folder.folders && (
            <>{renderFolders(folder.folders, depth + 1)}</>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex-1">
      <h1 className="p-6 text-lg font-semibold md:text-2xl">File Explorer</h1>
      {renderFolders(nestFolders(folders))}
    </div>
  );
}

export function SheetExplorer({
  folderData,
  folderId,
}: {
  folderData: Folder[];
  folderId: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle file explorer</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <Explorer folderData={folderData} folderId={folderId} />
      </SheetContent>
    </Sheet>
  );
}
