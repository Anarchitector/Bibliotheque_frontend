export interface IBook {
  id?: string;
  book_name: string;
  author_name: string;
  author_surname: string;
  year: string;
  ISBN: string;
  publisher: string;
  library_id: string;
  Quantity: string;
  Available: boolean;
}

export interface BookSliceState {
  selectedBook: IBook | null
}