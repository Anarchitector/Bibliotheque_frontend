export interface BookProps {
  book: {
    id: string;
    title: string;
    authorName: string;
    authorSurname: string;
    year: string;
    isbn: string;
    publisher: string;
    libraryId: string
    quantity: string
    available: string
    picture?: string
  };
  librarianFunction?: boolean
}

export enum BookItemStates {
  NORMAL = "normal",
  LIBRARIAN = "librarian",
  DELETED = "deleted"
}
