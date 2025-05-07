export const camelCase = (header: string) =>
  header
    .toLowerCase()
    .replace(/\(.*?\)/g, '') // Remove text in parentheses
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, ''); // Remove spaces
