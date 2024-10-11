import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapZoomHandlerProps {
  zoom?: number;
}

const MapZoomHandler = ({ zoom }: MapZoomHandlerProps) => {
  const map = useMap(); // Map 인스턴스 가져오기

  // 줌 값이 변경될 때마다 Map 인스턴스의 줌을 업데이트
  useEffect(() => {
    if (map && zoom !== undefined) {
      map.setZoom(zoom); // Zoom level 업데이트
    }
  }, [zoom, map]);

  return null; // 렌더링하지 않음, 줌 컨트롤만 담당
};

export default MapZoomHandler;
