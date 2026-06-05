

export interface IPInfo {
  countryName?: string;
  cityName?: string;
  countryCode?: string;
}

export async function getIPInfo(ip: string): Promise<IPInfo> {
  try {
    const response = await fetch(`https://freeipapi.com/api/json/${ip}`);
    const data = await response.json();
    return {
      countryName: data.countryName || 'Unknown',
      cityName: data.cityName || 'Unknown',
      countryCode: data.countryCode || 'Unknown',
    };
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return {
      countryName: 'Unknown',
      cityName: 'Unknown',
      countryCode: 'Unknown',
    };
  }
}

