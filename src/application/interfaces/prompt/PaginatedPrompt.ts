export interface PaginatedPrompt<T> {
  page: number;
  limit: number;
  total: number;
  data: T[];
}
