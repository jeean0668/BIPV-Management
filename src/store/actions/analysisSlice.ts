// src/store/actions/counterSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LatLngTuple } from 'leaflet';
import { act } from 'react';
import { LayersControl } from 'react-leaflet';
import { LayerType } from '@/utils/types';
import { HouseCheck } from '@/utils/types';

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
    address : ""
};

export const analysisSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    
    setAddress : (state, action : PayloadAction<{newAddress : string}>) => {
      state.address = action.payload.newAddress
    }

  },
});

export const { setAddress } = analysisSlice.actions;
export default analysisSlice.reducer;

// 화재 위험도 산출 함수

const calculateFireDanger = () => {

  // 용량보다 실제 발전량이 클 경우 발생 
  const floor = 5
  const maxLight = 5.3
  const sunHours = 6.26 
  const storage = 200 // 단위 kW
  

}