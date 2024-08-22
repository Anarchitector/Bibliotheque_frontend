export interface IBook {
  
}

export interface BookSliceState {
  id?: string | null
  title: string | null
  authorName: string | null
  authorSurname: string | null
  year: string | null
  ISBN: string | null
  publisher: string | null
  libraryId: string | null
  quantity: string | null
  available: string | null
}