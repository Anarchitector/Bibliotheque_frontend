export interface IBook {
  
}

export interface BookSliceState {
  id?: string | null
  book_name: string | null
  author_name: string | null
  author_surname: string | null
  year: string | null
  ISBN: string | null
  publisher: string | null
  library_id: string | null
  Quantity: string | null
  Available: string | null
}