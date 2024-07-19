"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, LibraryBig } from "lucide-react";

import { Input } from "@/components/ui/input";

import type { Folder, Paper } from "@/lib/definitions";
import PaperTable from "@/components/paper-table";
import { Explorer, SheetExplorer } from "@/components/explorer";
import { ModeToggle } from "@/components/mode-toggle";
import AccountDropdown from "@/components/account-dropdown";

import { testData } from "../test-data";

export default function Page() {
  // Current path state
  const [currentPath, setCurrentPath] = useState<number[]>([0]);
  const [folders, setFolders] = useState<Folder[]>(testData);

  const collectPapers = (folder: Folder) => {
    let papers = folder.papers ?? [];
    if (folder.folders) {
      folder.folders.forEach((subFolder) => {
        papers = papers.concat(collectPapers(subFolder));
      });
    }
    return papers;
  };

  const [currentPapers, setCurrentPapers] = useState<Paper[]>(
    collectPapers(folders[0])
  );

  const handlePathChange = (newPath: number[]) => {
    setCurrentPath(newPath);
    // Use the path to fetch the papers from the folders state
    let current: Folder | undefined = folders[0];
    for (const index of newPath.slice(1)) {
      if (!current) break;
      current = current.folders?.[index];
    }
    const allPapers = current ? collectPapers(current) : [];
    setCurrentPapers(allPapers);
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex flex-col h-full max-h-screen">
          <div className="sticky top-0 flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <LibraryBig className="w-6 h-6" />
              <span className="">Arxiv Library</span>
            </Link>
          </div>
          <div className="sticky top-[60px] overflow-y-auto">
            <Explorer
              folders={folders}
              setFolders={setFolders}
              onPathChange={handlePathChange}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 backdrop-blur flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <SheetExplorer
            folders={folders}
            setFolders={setFolders}
            handlePathChange={handlePathChange}
          />
          <div className="flex-1 w-full">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search papers..."
                  className="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <ModeToggle />
          <AccountDropdown />
        </header>
        <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Papers</h1>
          </div>
          <PaperTable papers={currentPapers} />
        </main>
      </div>
    </div>
  );
}
