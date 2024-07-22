import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function fetchPapersAndTitle(folderId: string) {
  const folderWithPapers = await prisma?.folder.findUnique({
    where: { id: folderId },
    include: { papers: true },
  });
  const papers = folderWithPapers?.papers || [];
  const title = folderWithPapers?.name || "All Papers";
  return { papers, title };
}

export default async function PaperTable({ folderId }: { folderId: string }) {
  const { papers, title } = await fetchPapersAndTitle(folderId);

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
          {papers?.map((paper) => (
            <TableRow key={paper.title}>
              <TableCell>{paper.title}</TableCell>
              <TableCell>{paper.authors.join(", ")}</TableCell>
              <TableCell>{new Date(paper.date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
