export const fetchLatLngFromAddress = async (address: string): Promise<{ lat: number, lng: number } | null> => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // 환경 변수에 저장된 Google Maps API 키를 불러옵니다.

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    const data = await response.json();

    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      console.error('Geocoding API Error:', data.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching Lat/Lng from address:', error);
    return null;
  }
};
