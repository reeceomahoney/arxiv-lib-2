"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useFolderData } from "@/components/folder-context";

export default function PaperTable() {
  const { folders, papers, currentId } = useFolderData();
  const title = folders.find((folder) => folder.id === currentId)?.name;

  const filteredPapers = papers.filter((paper) => paper.folderId === currentId);

  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Authors</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPapers?.map((paper) => (
            <TableRow key={paper.title}>
              <TableCell>{paper.title}</TableCell>
              <TableCell>{paper.authors.join(", ")}</TableCell>
              <TableCell>
                {new Date(paper.date).toLocaleDateString("en-US")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
