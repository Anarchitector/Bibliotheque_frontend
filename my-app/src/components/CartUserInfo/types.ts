export interface UserRegistrationFormValues {
    firstName: string
    lastName: string
    phone: string
    email?: string
    password?: string
    country: string
    zip: string
    city: string
    street: string
    houseNumber: string
    terms: boolean
  }
  
  export enum USER_REGISTR_FORM_NAMES {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    PHONE = 'phone',
    EMAIL = 'email',
    PASSWORD = 'password',
    COUNTRY = 'country',
    ZIP = 'zip',
    CITY = 'city',
    STREET = 'street',
    HOUSE_NUMBER = 'houseNumber',
    TERMS = 'terms'
  }