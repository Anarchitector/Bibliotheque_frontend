export interface Book {
  id: string
  title: string
  authorName: string
  authorSurname: string
  isbn: string
  publisher: string
  year: string
  libraryId: string
  quantity: string
  available: string
}

export interface CartState {
  items: Book[]
}
