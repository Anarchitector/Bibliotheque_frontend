export interface RegistrationFormValues {
    name: string
    country: string
    city: string
    street: string
    number: string
    zip: string
    phone: string
    email: string
    password: string
    repeatPassword: string
  }
  
  export enum LIB_REGISTR_FORM_NAMES {
    NAME = 'name',
    COUNTRY = 'country',
    CITY = 'city',
    STREET = 'street',
    NUMBER = 'number',
    ZIP = 'zip',
    PHONE = 'phone',
    EMAIL = 'email',
    PASSWORD = 'password',
    REPEAT_PASSWORD = 'repeatPassword'
  }