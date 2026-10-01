export function formatINR(amount: number, decimals: number = 0): string {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(decimals === 0 ? Math.round(amount) : amount);
}

export function formatNumber(n: number, decimals: number = 2): string {
  if (isNaN(n)) return '0';
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
  }).format(n);
}

export function formatPercentage(n: number): string {
  if (isNaN(n)) return '0%';
  return `${formatNumber(n, 2)}%`;
}

export function parseFormattedNumber(s: string): number {
  if (!s) return 0;
  const cleanStr = s.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(cleanStr);
  return isNaN(parsed) ? 0 : parsed;
}

export function formatDuration(months: number): string {
  if (isNaN(months) || months === 0) return '0 months';
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  const yearStr = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
  const monthStr = remainingMonths > 0 ? `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : '';
  
  if (years > 0 && remainingMonths > 0) {
    return `${yearStr} ${monthStr}`;
  }
  return yearStr || monthStr;
}

export function formatCompactINR(amount: number): string {
  if (isNaN(amount) || amount === 0) return '₹0';
  
  if (Math.abs(amount) >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2).replace(/\.00$/, '')}Cr`;
  }
  
  if (Math.abs(amount) >= 100000) {
    return `₹${(amount / 100000).toFixed(2).replace(/\.00$/, '')}L`;
  }
  
  if (Math.abs(amount) >= 1000) {
    return `₹${(amount / 1000).toFixed(2).replace(/\.00$/, '')}K`;
  }
  
  return formatINR(amount);
}
