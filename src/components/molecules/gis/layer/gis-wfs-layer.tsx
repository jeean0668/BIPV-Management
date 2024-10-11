import React, { useState, useEffect } from 'react';
import { LayersControl, useMap, Polygon, LayerGroup } from 'react-leaflet';
import { fetchGISData } from '@/utils/fetch/fetchVworldWFS';

interface WFSLayerProps {
  zoom: number;
}

const WFSLayer = ({ zoom }: WFSLayerProps) => {
  const [wfs, setWfs] = useState<any>([]);
  const map = useMap();

  // 맵 이동 후 bbox를 다시 계산하고 데이터를 가져오는 로직
  const fetchWFSData = async (bbox: string) => {
    try {
      if (zoom >= 17) { // 줌 레벨이 17 이상일 때만 fetch
        const data = await fetchGISData(bbox); // fetchGISData는 비동기 함수
        if (data && data.features) {
          setWfs(data.features); // WFS 데이터에서 feature 배열만 저장
        }
      } else {
        setWfs([]); // 줌 레벨이 낮아지면 폴리곤 제거
      }
    } catch (error) {
      console.error("Error fetching WFS data:", error);
    }
  };

  useEffect(() => {
    const onMapMove = () => {
      const bounds = map.getBounds();
      const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
      fetchWFSData(bbox);
    };

    // 맵이 이동할 때마다 (moveend) bbox를 계산하고 데이터를 다시 fetch
    map.on('moveend', onMapMove);

    // 초기 데이터 fetch
    onMapMove();

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
      map.off('moveend', onMapMove);
    };
  }, [map, zoom]);

  // WFS 데이터를 기반으로 폴리곤 좌표를 생성
  const renderPolygons = () => {
    return wfs.map((feature: any, index: number) => {
      const geometry = feature.geometry;

      // MultiPolygon 형식 처리
      if (geometry.type === 'MultiPolygon') {
        return geometry.coordinates.map((polygon: any, polygonIndex: number) => {
          // 각 폴리곤의 좌표 변환 [longitude, latitude] => [latitude, longitude]
          const latLngs = polygon[0].map((coord: [number, number]) => [coord[1], coord[0]]);

          return <Polygon key={`${index}-${polygonIndex}`} positions={latLngs} color="blue" />;
        });
      }

      // 일반 Polygon 형식 처리 (만약 있으면)
      if (geometry.type === 'Polygon') {
        const latLngs = geometry.coordinates[0].map((coord: [number, number]) => [coord[1], coord[0]]);
        return <Polygon key={index} positions={latLngs} fillColor="blue" />;
      }

      return null; // 다른 형식은 처리하지 않음
    });
  };

  return (
    <LayersControl.Overlay name="GIS건물통합정보">
      {/* WFS 데이터를 기반으로 폴리곤을 지도에 표시 */}
      <LayerGroup>
        {renderPolygons()}
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

export default WFSLayer