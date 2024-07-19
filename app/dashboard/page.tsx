"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleUser, Menu, Search, LibraryBig } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import type { Folder, Paper } from "@/lib/definitions";
import PaperTable from "@/components/paper-table";
import FileExplorer from "@/components/file-explorer";

import { testData } from "../test-data";

export default function Page() {
  // Current path state
  const [currentPath, setCurrentPath] = useState<number[]>([0]);
  const [folders, setFolders] = useState<Folder[]>(testData);
  const [currentPapers, setCurrentPapers] = useState<Paper[]>(
    folders[0].papers ?? []
  );

  const collectPapers = (folder: Folder) => {
    let papers = folder.papers ?? [];
    if (folder.folders) {
      folder.folders.forEach((subFolder) => {
        papers = papers.concat(collectPapers(subFolder));
      });
    }
    return papers;
  };

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
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <LibraryBig className="h-6 w-6" />
              <span className="">Arxiv Library</span>
            </Link>
          </div>
          <FileExplorer
            folders={folders}
            setFolders={setFolders}
            onPathChange={handlePathChange}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <FileExplorer
                folders={folders}
                setFolders={setFolders}
                onPathChange={handlePathChange}
              />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search papers..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Papers</h1>
          </div>
          <PaperTable papers={currentPapers} />
        </main>
      </div>
    </div>
  );
}
