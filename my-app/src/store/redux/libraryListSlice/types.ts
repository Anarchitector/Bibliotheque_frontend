export interface ILibrary {
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

export interface LibrariesListState {
  librariesList: ILibrary[],
  selectedLibrary: string  
}