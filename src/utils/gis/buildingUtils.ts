import { getMultiPolygonArea, getPolygonCenter} from "./mapUtils"; // 위에서 작성한 함수들
import { LatLngPos } from "./mapUtils";
export interface BuildingProperties {
  buld_nm: string;  // 건물명
  src_objectid: number;  // 원천도형ID
  gis_idntfc_no: string; // GIS건물통합식별번호
  pnu: string;  // 고유번호
  ld_cpsg_code: string;  // 법정동 시군구코드
  mnnm: string;  // 본번
  slno: string;  // 부번
  regstr_se_code: string;  // 특수지코드
  buld_prpos_code: string; // 건축물용도코드
  strct_code: string;  // 건축물구조코드
  ar: number;  // 건축물면적(㎡)
  use_confm_de: string;  // 사용승인일자
  totar: string;  // 연면적(㎡)
  plot_ar: number;  // 대지면적(㎡)
  hg: number;  // 높이
  btl_rt: string;  // 건폐율(%)
  measrmt_rt: string;  // 용적율(%)
  buld_idntfc_no: string;  // 건축물ID
  violt_bild: string;  // 위반건축물여부
  efrn_systm_cntc_no: string;  // 참조체계연계키
  last_updt_dt: string;  // 데이터기준일자
}

export interface BuildingData {
  position: LatLngPos
  properties: BuildingProperties;
  // geometry: any;  // GIS 데이터에서 받은 geometry
  // area: number;   // 계산된 다각형 면적
}

export const parseBuildingData = (gisData: string): BuildingData[] => {
  
  const geojson = JSON.parse(gisData);
  const buildings: BuildingData[] = [];

  geojson.features.forEach((feature: any) => {
    const geometry = feature.geometry;
    const properties: BuildingProperties = feature.properties;
    let position: LatLngPos;
    let area = 0; // 다각형 면적 초기화
    console.log(`plot_ar : ${properties.plot_ar}, ar : ${properties.ar}`);
    if (properties.plot_ar == 0 && properties.ar > 0){
      // 건축면적이 대지면적 0이고 건축면적이 0보다 큰 데이터는 건축면적의 1.2배로 적용
      properties.plot_ar = properties.ar * 1.2
    }
    console.log(`plot_ar : ${properties.plot_ar}, ar : ${properties.ar}`);

    if (geometry.type === 'Point') {
      const coords = geometry.coordinates;
      position = { lat: coords[1], lng: coords[0] };  // [lat, lng]
    } else if (geometry.type === 'MultiPolygon') {
      const coords = geometry.coordinates;
      position = getPolygonCenter(coords);  // 폴리곤의 중심 좌표 계산
      // area = getMultiPolygonArea(coords);  // 폴리곤 면적 계산
    } else {
      return; // 다른 지오메트리 타입은 처리하지 않음
    }

    // buildings.push({ position, properties, geometry, area });
    buildings.push({ position, properties });
  });

  console.log(`building length : ${buildings.length}`);
  return buildings;
};
