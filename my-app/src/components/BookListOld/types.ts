export interface LibraryRegistrationFormValues {
  name: string
  country: string
  city: string
  street: string
  number: string
  zip: string
  phone: string
}

export enum LIB_REGISTR_FORM_NAMES {
  NAME = "name",
  COUNTRY = "country",
  CITY = "city",
  STREET = "street",
  NUMBER = "number",
  ZIP = "zip",
  PHONE = "phone",
}

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