import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Paper } from "@/lib/definitions";

export default function PaperTable({papers}: {papers: Paper[]}) {
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
