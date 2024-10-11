// src/store/actions/counterSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LatLngTuple } from 'leaflet';
import { act } from 'react';
import { LayersControl } from 'react-leaflet';
import { LayerType } from '@/utils/types';
import { HouseCheck } from '@/utils/types';

interface MapState {
    initialPosition : LatLngTuple
    tileURL : string
    title : string
    markerIconUrl : string
    markerIconShadowUrl : string
    layers : LayerType[]
    checklist : HouseCheck[]
    zoom : number 
}

const initialState: MapState = {
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
    zoom : 13
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setPos: (state, action: PayloadAction<{ newPos: LatLngTuple }>) => {
      state.initialPosition = action.payload.newPos;
    },
    setLayers: (state, action: PayloadAction<LayerType>) => {
      state.layers.push(action.payload);
    },
    toggleLayerSelection: (state, action: PayloadAction<number>) => {
      const layer = state.layers[action.payload];
      if (layer) {
        layer.isSelected = !layer.isSelected;
      }
    },
    setZoom : (state, action : PayloadAction<{newZoom : number}>) => {
      state.zoom = action.payload.newZoom;
    }
  },
});

export const { setPos, setLayers, toggleLayerSelection, setZoom } = mapSlice.actions;
export default mapSlice.reducer;