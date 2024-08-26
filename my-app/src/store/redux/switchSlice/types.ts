export interface SwitchSliceState {
  //and a separate switch just for LibraryBookManager, the shame!
  lbmState: "list" | "add" | "edit"  
  //for LibrariesList
  frontLL: "libs" | "books"
  profileState: "profile" | "edit"
}