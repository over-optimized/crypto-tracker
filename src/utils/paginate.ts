export function paginate<T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): {
  paginatedItems: T[];
  currentPage: number;
  totalPages: number;
} {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return { paginatedItems, currentPage, totalPages };
}
