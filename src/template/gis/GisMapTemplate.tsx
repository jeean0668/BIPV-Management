'use client'
import React, { useState } from 'react';
import { DynamicMap } from './DynamicMap';
import { RootState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { setZoom } from '@/store/actions/mapSlice';
import dynamic from 'next/dynamic';
import { LabelButtonPlaceholder } from '@/components/molecules/input/button-placeholder';
import MapZoomControl from '@/components/organisms/MapControl/MapZoomControl';
const WFSLayer = dynamic(() => import('@/components/molecules/gis/layer/gis-wfs-layer'), { ssr: false })
const MapLayerControl = dynamic(() => import('@/components/organisms/MapControl/MapLayerControl'), { ssr: false })
const CustomMarker = dynamic(() => import('@/components/molecules/gis/marker/marker'), { ssr: false })

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MarkerDrawer } from '@/components/organisms/drawer/MarkerDrawer';
import { AccordionTitleDetailLinkCk } from '@/components/molecules/accordion/title-detail-link-checkbox';
import { Textarea } from '@/components/ui/textarea';

export const GisMapTemplate = () => {

  const title = useSelector((state: RootState) => state.map.title);
  const initialPosition = useSelector((state: RootState) => state.map.initialPosition);
  const tileURL = useSelector((state: RootState) => state.map.tileURL);
  const zoom = useSelector((state: RootState) => state.map.zoom);
  const dispatch = useDispatch();
  const checkList = useSelector((state: RootState) => state.map.checklist);

  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  // Drawer 상태 관리

  const handleZoomIn = () => {
    dispatch(setZoom({ newZoom: zoom + 1 })); // zoom을 1 증가
  };
    
  const handleZoomOut = () => {
    dispatch(setZoom({ newZoom: zoom - 1 })); // zoom을 1 감소
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  }
    
  const props = {
    title,
    initialPosition,
    tileURL,
    zoom,
    handleZoomIn,
    handleZoomOut,  
    handleDrawerOpen,
    isDrawerOpen,
    setDrawerOpen,
    checkList,
  };

  return <GisMapTemplateView {...props} />;
};

const GisMapTemplateView = ({ title, initialPosition, tileURL, zoom, handleZoomIn, handleZoomOut, handleDrawerOpen, isDrawerOpen, setDrawerOpen, checkList}: any) => {
  return (
    <div className="flex flex-col w-full items-center min-h-screen border">
      {/* 맵 표시 */}
      <div className="relative w-full h-full border-2">
        {/* 지도 표시 */}
        <DynamicMap initialPosition={initialPosition} tileURL={tileURL} zoom={zoom}>
          
          <LabelButtonPlaceholder label="주소 입력" placeholder="도로명 주소를 입력하세요" />
          
          <MapLayerControl>
            {/* WFS layer */}
            {/* <WFSLayer zoom={zoom} /> */}
            <CustomMarker position={initialPosition} click={handleDrawerOpen}></CustomMarker>
          </MapLayerControl>
          {/* 줌 레벨 컨트롤  */}
          <MapZoomControl currentZoom={zoom} handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} />
        </DynamicMap>
      </div>
      {/* 마커 정보 표시 drawer */}
      <MarkerDrawer title={'테스트 타이틀'} isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen}>
        { /* 체크리스트 항/목 표시 */}
        <Label>{"해당 건물 ZEB 전환시 화재 안정성을 체크합니다..."}</Label>
        // 화재 안정성 체크리스트 제시, 계산후 색깔로 표현(위험, 보통, 낮음) 
        <Button type ="submit" >submit</Button>
      </MarkerDrawer>
    </div>
  );
};


// 과전류 + 시간에 따른 헐거워짐 -> 접속함 화재 발생.
