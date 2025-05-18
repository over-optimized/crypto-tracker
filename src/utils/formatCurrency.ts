export function formatCurrency(
  value: number,
  currency: 'USD',
  locale = 'en-US'
) {
  if (isNaN(value)) {
    return '';
  }
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return new Intl.NumberFormat(locale, options).format(value);
}
