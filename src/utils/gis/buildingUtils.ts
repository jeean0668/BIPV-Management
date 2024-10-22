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

// 용도별 빌딩 분류
export const buildingPurposeCodes: { [key: string]: { name: string; color: string, count:number } } = {
  '01000': { name: '단독주택', color: '#e6194b', count:0 },           // Red
  '02000': { name: '공동주택', color: '#3cb44b', count:0 },           // Green
  '03000': { name: '제1종근린생활시설', color: '#ffe119', count:0   },   // Yellow
  '04000': { name: '제2종근린생활시설', color: '#4363d8', count:0  },   // Blue
  '05000': { name: '문화및집회시설', color: '#f58231', count:0  },     // Orange
  '06000': { name: '종교시설', color: '#911eb4', count:0  },           // Purple
  '07000': { name: '판매시설', color: '#46f0f0', count:0  },           // Cyan
  '08000': { name: '운수시설', color: '#f032e6', count:0  },           // Magenta
  '09000': { name: '의료시설', color: '#bcf60c', count:0  },           // Lime
  '10000': { name: '교육연구시설', color: '#fabebe', count:0  },       // Pink
  '11000': { name: '노유자시설', color: '#008080', count:0  },         // Teal
  '12000': { name: '수련시설', color: '#e6beff', count:0  },           // Lavender
  '13000': { name: '운동시설', color: '#9a6324', count:0  },           // Brown
  '14000': { name: '업무시설', color: '#fffac8', count:0  },           // Beige
  '15000': { name: '숙박시설', color: '#800000', count:0  },           // Maroon
  '16000': { name: '위락시설', color: '#aaffc3', count:0  },           // Mint
  '17000': { name: '공장', color: '#808000', count:0  },               // Olive
  '18000': { name: '창고시설', color: '#ffd8b1', count:0  },           // Peach
  '19000': { name: '위험물저장및처리시설', color: '#000075', count:0  }, // Navy
  '20000': { name: '자동차관련시설', color: '#808080', count:0  },     // Grey
  '21000': { name: '동식물관련시설', color: '#ffffff', count:0  },     // White
  '22000': { name: '분뇨,쓰레기처리시설', color: '#000000', count:0  }, // Black
  '23000': { name: '교정및군사시설', color: '#ffe4e1', count:0  },     // Misty Rose
  '24000': { name: '방송통신시설', color: '#4682b4', count:0  },       // Steel Blue
  '25000': { name: '발전시설', color: '#d2691e', count:0  },           // Chocolate
  '26000': { name: '묘지관련시설', color: '#bdb76b', count:0  },       // Dark Khaki
  '27000': { name: '관광휴게시설', color: '#ff1493', count:0  },       // Deep Pink
  '28000': { name: '가설건축물', color: '#7fff00', count:0  },         // Chartreuse
  '29000': { name: '장례식장', color: '#dc143c', count:0  },           // Crimson
};
