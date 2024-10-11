'use client'
import React from 'react';
import { DynamicMap } from './DynamicMap';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { HouseCheck } from '@/utils/types';
import { AccordionTitleDetailLinkCk } from '@/components/molecules/accordion/title-detail-link-checkbox';
import { LabelPlaceholder } from '@/components/molecules/input/label-placeholder';
import MapZoomControl from '@/components/organisms/MapControl/MapZoomControl';
import { useDispatch } from 'react-redux';
import { setZoom } from '@/store/actions/mapSlice';
import { LayersControl, LayerGroup, Circle } from 'react-leaflet';
import dynamic from 'next/dynamic';
import { LabelButtonPlaceholder } from '@/components/molecules/input/button-placeholder';
const WFSLayer = dynamic(() => import('@/components/molecules/gis/layer/gis-wfs-layer'), { ssr: false })
const MapLayerControl = dynamic(() => import('@/components/organisms/MapControl/MapLayerControl'), { ssr: false })

export const GisMapTemplate = () => {

  const title = useSelector((state: RootState) => state.map.title);
  const checkList = useSelector((state: RootState) => state.map.checklist);
  const initialPosition = useSelector((state: RootState) => state.map.initialPosition);
  const tileURL = useSelector((state: RootState) => state.map.tileURL);
  const zoom = useSelector((state: RootState) => state.map.zoom); // zoom 상태 가져오기
  const dispatch = useDispatch();

  const handleZoomIn = () => {
    dispatch(setZoom({ newZoom: zoom + 1 })); // zoom을 1 증가
  };
    
  const handleZoomOut = () => {
    dispatch(setZoom({ newZoom: zoom - 1 })); // zoom을 1 감소
  };
    
  const props = {
    title,
    checkList,
    initialPosition,
    tileURL,
    zoom,
    handleZoomIn,
    handleZoomOut,  // zoom 추가
  };

  return <GisMapTemplateView {...props} />;
};

const GisMapTemplateView = ({ title, checkList, initialPosition, tileURL, zoom, handleZoomIn, handleZoomOut }: any) => {
  return (
    <div className="flex flex-col w-full items-center py-2 min-h-screen border">
      {/* 네비게이션 제목 표시 */}
      <LabelButtonPlaceholder label="주소 입력" placeholder="도로명 주소를 입력하세요" />

      {/* 맵 표시 */}
      <div className="relative w-full h-full border-2">
        {/* 지도와 오버레이 요소를 위한 부모 요소에 relative 설정 */}
        <DynamicMap initialPosition={initialPosition} tileURL={tileURL} zoom={zoom}>
          {/* LabelPlaceholder를 지도 위에 절대 위치시키고 z-index로 위에 표시되도록 함 */}
          <div className="absolute top-4 left-4 z-50">
          </div>
          <MapLayerControl>
            {/* WFS layer */}
            <WFSLayer zoom={zoom} />
          </MapLayerControl>
        </DynamicMap>
      </div>
          <MapZoomControl currentZoom={zoom} handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} />
      { /* 체크리스트 항/목 표시 */}
      {/* <div className="w-2/3 border-2 p-4 mt-4">
        <p className="text-2xl">체크리스트</p>
        {checkList.map((check: HouseCheck, index: number) => (
          <AccordionTitleDetailLinkCk key={`checkbox-${index}`} title={check.title} detail={check.detail} link={check.link} />
        ))} 
      </div> */}
    </div>
  );
};