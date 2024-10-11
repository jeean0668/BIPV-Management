const fetchGISData = async (bbox: string) => {
    const key = process.env.NEXT_PUBLIC_VWORLD_API_KEY;
    const domain = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS;
  
    try {
      const response = await fetch(`/api/vworld/wfs?bbox=${bbox}&key=${key}&domain=${domain}`);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error fetching GIS data:', errorData);
        return null;
      }
  
      const jsonData = await response.json(); // JSON 데이터를 받아옴
      return jsonData; // GeoJSON 형식의 데이터를 반환
  
    } catch (err) {
      console.error('Error fetching GIS data:', err);
      return null;
    }
  };
  
  export { fetchGISData };
  