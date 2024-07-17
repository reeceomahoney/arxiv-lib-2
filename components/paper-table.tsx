import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PaperTable() {
  function generateTestPapers() {
    const testPapers = [];
    for (let i = 1; i <= 20; i++) {
      testPapers.push({
        title: `Test Paper ${i}`,
        authors: [`Author ${i}`, `Co-Author ${i}`],
        date: `2023-07-${i.toString().padStart(2, "0")}`,
      });
    }
    return testPapers;
  }

  const papers = generateTestPapers();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Authors</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {papers.map((paper) => (
          <TableRow key={paper.title}>
            <TableCell>{paper.title}</TableCell>
            <TableCell>{paper.authors.join(", ")}</TableCell>
            <TableCell>{paper.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
