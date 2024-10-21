import { BuildingData, BuildingProperties } from "./buildingUtils";
import L, { LatLngTuple, LatLngBounds } from 'leaflet';

export interface LatLngPos {
    lat : number
    lng : number
}

// center 중심으로 radius(m) 거리만큼 떨어진 곳의 bounding box 좌표 반환
export const getCircleBounds = (center : LatLngPos, radius: number) => {
    const {lat, lng} = center;
  
    // 지구의 반지름 (미터 단위)
    const earthRadius = 6378137;
  
    // 반경을 위도 및 경도 차이로 변환
    const latOffset = (radius / earthRadius) * (180 / Math.PI);
    const lngOffset = (radius / earthRadius) * (180 / Math.PI) / Math.cos((lat * Math.PI) / 180);
  
    const south = lat - latOffset;
    const north = lat + latOffset;
    const west = lng - lngOffset;
    const east = lng + lngOffset;
  
    const bounds = {south, north, west, east}
  
    return bounds;
  };



  // polygon 형태로 된 건물의 좌표들의 중심점을 구함
  export const getPolygonCenter = (coordinates: any) => {
    // 좌표 순서를 [위도, 경도]로 변환
    const latLngCoordinates = getCoordinates(coordinates);
  
    const polygon = L.polygon(latLngCoordinates);
    const center = polygon.getBounds().getCenter();
    return {lat : center.lat, lng : center.lng};
  };

  export const getCoordinates = (coordinates : any) => {
    // 좌표 순서를 [위도, 경도]로 변환
    const latLngCoordinates = coordinates.map((polygon: any) =>
      polygon.map((ring: any) =>
        ring.map((point: any) => [point[1], point[0]]) // [lat, lng]
      )
    );
    return latLngCoordinates
  }
  
  // 다각형 면적 계산을 위한 함수 (Shoelace 공식 사용)
export function getPolygonArea(coords: [number, number][]): number {
  let area = 0;
  const numCoords = coords.length;

  for (let i = 0; i < numCoords - 1; i++) {
    const [x1, y1] = coords[i];
    const [x2, y2] = coords[i + 1];
    area += x1 * y2 - x2 * y1;
  }

  const [x1, y1] = coords[numCoords - 1];
  const [x2, y2] = coords[0];
  area += x1 * y2 - x2 * y1;

  return Math.abs(area) / 2; // 면적의 절대값 반환
}

// 멀티폴리곤의 면적 계산
export function getMultiPolygonArea(multiPolygonCoords: number[][][][]): number {
  let totalArea = 0;

  // 멀티폴리곤은 [polygon[coord[lat, lng]]]의 구조이므로 각 계층을 순회
  for (const polygon of multiPolygonCoords) {
    for (const coords of polygon) {
      const latLngs: [number, number][] = coords.map((coord: number[]) => {
        // coords는 [lng, lat] 구조이므로 변환
        return [coord[1], coord[0]];
      });

      totalArea += getPolygonArea(latLngs);
    }
  }

  return totalArea;
}
