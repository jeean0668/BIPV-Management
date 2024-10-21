import { LayersControl } from "react-leaflet";
import { string } from "zod";


export interface LayerType {
    overlay : typeof LayersControl.Overlay
    name : string,
    isSelected : boolean,
}

export interface HouseCheck {
    title : string, 
    detail : string,
    img : ImageData | null, 
    link : string, 
}

// House Check 적용해서 mapSlice.ts의 checklist 선언하여야 함. 

export interface PanelInfo {
    name : string, // 패널 이름
    width? : number, // 패널 가로 길이
    height? : number, // 패널 세로 길이
    capacity : number, // 패널 용량
    age : number, // 패널 수명
    location : string, // 도로명 or 지번 주소
    zonenumber : string, // 우편번호
    zeb_grade? : string, // ZEB 등급
    total_floor_area : number, // 연면적
    building_density : number // 건물이 위치한 지역의 반경 100미터 내 밀도
    population : number // 건물이 위치한 법정동 인구 수
    state : PanelState[]
}

export interface PanelState {

    time : string // 측정 시간
    light : number // 현 시간 해당 지역 일조량 
    predicted : number // 현 시간 예측 발전량
    measured : number // 현 시간 실제 발전량

}