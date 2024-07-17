export type Paper = {
    title: string;
    authors: string[];
    date: string;
}

export type Folder = {
  name: string;
  isOpen?: boolean;
  folders?: Folder[];
  papers?: Paper[];
}