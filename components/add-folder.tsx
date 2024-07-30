import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { createFolder } from "@/lib/actions";
import { useFolderData } from "@/components/folder-context";

export default function AddFolder() {
  const { folders, currentId } = useFolderData();
  const currentName = folders.find((folder) => folder.id === currentId)?.name;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-8 h-8 p-0 mr-4">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
        </DialogHeader>
        <form action={createFolder}>
          <div className="flex items-center gap-4 py-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input name="name" className="flex-grow" />
            <input type="hidden" name="currentId" value={currentId} />
            <DialogClose>
              <Button type="submit">Add</Button>
            </DialogClose>
          </div>
        </form>
        <DialogFooter>Subfolder of {currentName}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
