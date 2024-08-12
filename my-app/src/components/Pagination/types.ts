export interface PaginationProps {
  usersPerPage: number
  totalUsers: number
  paginate: (pageNumber: number) => void
  currentPage: number
}
