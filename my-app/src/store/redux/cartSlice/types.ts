export interface Book {
  id: string
  title: string
  author: string
  isbn: string
  publisher: string
  year: string
}

export interface CartState {
  items: Book[]
}
