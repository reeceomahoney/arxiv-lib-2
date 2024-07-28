export type Paper = {
  id: string;
  title: string;
  authors: string[];
  date: string;
  folderId: string;
};

export type Folder = {
  id: string;
  name: string;
  isOpen: boolean;
  parentId: string | null;
  userId: string;
  folders?: Folder[];
  papers?: Paper[];
};
