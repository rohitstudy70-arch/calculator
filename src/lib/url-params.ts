export function encodeCalculatorParams(params: Record<string, number | string>): string {
  const searchParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  }
  
  const paramStr = searchParams.toString();
  return paramStr ? `?${paramStr}` : '';
}

export function decodeCalculatorParams(searchParams: URLSearchParams): Record<string, string> {
  const params: Record<string, string> = {};
  
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
}

export function generateShareableLink(basePath: string, params: Record<string, number | string>): string {
  const typeofWindow = typeof window !== 'undefined';
  const origin = typeofWindow ? window.location.origin : 'https://calcmaster.in';
  
  const encodedParams = encodeCalculatorParams(params);
  return `${origin}${basePath.startsWith('/') ? basePath : `/${basePath}`}${encodedParams}`;
}
