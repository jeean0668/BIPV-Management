// src/store/actions/counterSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LatLngTuple } from 'leaflet';
import { act } from 'react';
import { LayersControl } from 'react-leaflet';
import { LayerType } from '@/utils/types';
import { HouseCheck } from '@/utils/types';
import { PanelInfo } from '@/utils/types';
import { LatLngPos } from '@/utils/gis/mapUtils';
import { BuildingData } from '@/utils/gis/buildingUtils';

const initialPanelInfo : PanelInfo[] = [
  {
    name : "패널 1",
    capacity : 84, // 패널 용량
    age : 7, // 패널 수명
    location : "울산광역시 울주군 점촌안길 4-10 102호", // 도로명 or 지번 주소
    zonenumber : "44579", // 우편번호
    total_floor_area : 379.02, // 연면적
    building_density : 65.2, // 건물이 위치한 지역의 밀도
    population : 35642, // 건물이 위치한 법정동 인구 수
    state : [
      {
        time : "2024.10.12.16:00",
        light : 5.3,
        predicted : 1.4,
        measured : 1.0,
      },
    ]
  },
  {
    name : "패널 2",
    capacity : 84, // 패널 용량
    age : 7, // 패널 수명
    location : "울산광역시 울주군 점촌안길 4-10 102호", // 도로명 or 지번 주소
    zonenumber : "44579", // 우편번호
    total_floor_area : 379.02, // 연면적
    building_density : 65.2, // 건물이 위치한 지역의 밀도
    population : 35642, // 건물이 위치한 법정동 인구 수
    state : [
      {
        time : "2024.10.12.16:00",
        light : 5.3,
        predicted : 1.4,
        measured : 1.0,
      },
    ]
  }
]

interface AnalysisState {
    initialPosition : LatLngTuple
    tileURL : string
    title : string
    markerIconUrl : string
    markerIconShadowUrl : string
    layers : LayerType[]
    checklist : HouseCheck[]
    zoom : number 
    address : string, 
    panels : PanelInfo[]
    selectedPanel : PanelInfo | undefined 
    population : number 
    latlngpos: LatLngPos
    bcode : string
    buildingData : BuildingData[]
}

const initialState: AnalysisState = {
    initialPosition : [37.5665, 126.978],
    tileURL : `https://api.vworld.kr/req/wmts/1.0.0/${process.env.NEXT_PUBLIC_VWORLD_API_KEY}/Base/{z}/{y}/{x}.png`,
    title : "태양광 GIS 시뮬레이터",
    markerIconUrl : '/images/marker-icon.png',
    markerIconShadowUrl: '/images/marker-shadow.png',
    layers : [], 
    checklist : [
      {title : "구조적 안정성", detail : "건물이 구조적으로 안정적인지 평가합니다.", "img" : null, link : "/docs/structure"},
      {title : "화재 안전성", detail : "건물의 화재 발생 위험도를 평가합니다.", "img" : null, link:"/docs/fire"},
      {title : "유해 물질", detail : "건물에서 발생할 수 있는 유해물질을 조사합니다.", "img" : null, link:"/docs/substances"},
    ],
    zoom : 13,
    address : "",
    panels : initialPanelInfo,
    selectedPanel : initialPanelInfo[0],
    population : 1, // 배포시에는 0
    latlngpos: {lat : 37.5665, lng : 126.978},
    // initialPosition : [37.5665, 126.978],
    bcode : "",
    buildingData : []

};

export const analysisSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setAddress : (state, action : PayloadAction<{newAddress : string}>) => {
      state.address = action.payload.newAddress
    },
    setSelectedPanel : (state, action : PayloadAction<{newName : string}>) => {
      state.selectedPanel = state.panels.filter((panel) => {
        panel.name === action.payload.newName
        })[0];
    },
    setPopulation : (state, action : PayloadAction<{newPopulation : number}>) => {
      state.population = action.payload.newPopulation;
    },
    setPosition : (state, action : PayloadAction<{newPosition : LatLngPos}>) => {
      state.latlngpos= action.payload.newPosition;
    },
    // 법정동코드 저장
    setBcode : (state, action : PayloadAction<{newBcode : string}>) => {
      state.bcode= action.payload.newBcode
    },
    // 주변 건물 저장
    setBuildingData : (state, action : PayloadAction<{newBuildingData : BuildingData[]}>) => {
      state.buildingData = [... action.payload.newBuildingData]
    },
  },
});

export const { setAddress, setPopulation, setPosition, setBcode, setBuildingData } = analysisSlice.actions;
export default analysisSlice.reducer;

// 화재 위험도 산출 함수
