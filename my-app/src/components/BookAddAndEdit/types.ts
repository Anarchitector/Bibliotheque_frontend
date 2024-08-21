export interface BookAEProps {
  editSwitch: boolean
}

export interface BookFormValues {
  id?: string
  title: string
  author_name: string
  author_surname: string
  year: string
  isbn: string
  publisher: string
  library_id: string
  quantity : string
  available: string
}

export enum BOOK_FORM_NAMES {
  ID = "id",
  TITLE = "title",
  AUTHOR_NAME = "author_name",
  AUTHOR_SURNAME = "author_surname",
  YEAR = "year",  
  ISBN = "isbn",
  PUBLISHER = "publisher",
  LIBRARY_ID = "library_id",
  QUANTITY = "quantity",
  AVAILABLE = "available"
}