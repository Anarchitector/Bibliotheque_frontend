export interface OrderByLibrary {
    userId: string,
    name: string,
    email: string,
    reservedBooks: OrderedBook[]    
}

export interface OrderedBook {
    title: string;
    authorName: string;
    authorSurname: string;
    year: string;
    isbn: string;
    publisher: string;
    libraryId: string
    quantity: string
    available: string
    picture: string
}