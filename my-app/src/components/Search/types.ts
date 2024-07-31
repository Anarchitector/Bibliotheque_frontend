// Определение возможных типов поиска
export type SearchType = 'book' | 'author';

// Типизация для пропсов компонента Search
export interface SearchProps {
  onSearch: (query: string) => void;
}
