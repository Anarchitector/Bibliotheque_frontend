export interface IBook {
  id: string;
  book_name: string;
  author_name: string;
  author_surname: string;
  year: string;
  ISBN: string;
  publisher: string;
  library_id: string;
  Quantity: string;
  Available: string;
}

export interface BookListOldProps {
  front?: boolean
}

export interface  ILibrary {
  id: string;
  name: string;
  country: string;
  city: string;
  street: string;
  number: string;
  zip: string;
  phone: string;
  librarian_id: string;
}