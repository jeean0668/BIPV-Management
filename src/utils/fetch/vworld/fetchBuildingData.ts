const fetchBuildingData = async (bbox : string) => {
    
    const key = process.env.NEXT_PUBLIC_VWORLD_API_KEY;
    const domain = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS;
    
    try {
      const response = await fetch(`/api/vworld/wfs?bbox=${bbox}&key=${key}&domain=${domain}`);
      
      if (!response.ok) {
        const errorData = await response.json()
        console.log('Error fetching GIS data:', errorData);
        return
      }

      const gmlData = await response.text()
      return gmlData;

    } catch (err) {
      console.error('Error fetching GIS data:', err)
      return ;
    } 
  }

export {fetchBuildingData}