export interface LibraryProps {
  id: string,
  name: string, 
  country: string, 
  city: string, 
  street: string, 
  number: string, 
  zip: string, 
  phone: string, 
  librarian_id: string
  clicksDisabled?: boolean //to disable buttons if it's used without authorization 
  onClick?: () => void 
}

export enum ViewState {
  DISABLED = "disabled",
  DELETED = "deleted",
  ENABLED = "enabled"  
}
