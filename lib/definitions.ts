export type Paper = {
  title: string;
  authors: string[];
  date: string;
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
