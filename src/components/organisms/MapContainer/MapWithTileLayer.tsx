'use client'

import React, { ReactNode, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';
import L from 'leaflet';
import MapZoomHandler from '@/components/molecules/gis/control/zoomControl';

interface MapWithTileLayerProps {
  initialPosition: LatLngTuple,
  tileURL: string,
  children: ReactNode,
  zoom?: number,
}

const MapWithTileLayer = ({ initialPosition, tileURL, children, zoom }: MapWithTileLayerProps) => {

  const props = {
    initialPosition,
    tileURL,
    children,
    zoom,
  }

  let DefaultIcon = L.icon({
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return <MapWithTileLayerView {...props}>{children}</MapWithTileLayerView>
}

const MapWithTileLayerView = ({ initialPosition, tileURL, children, zoom }: any) => {
  return (
    <MapContainer center={initialPosition} zoom={zoom} className="w-full h-full" zoomControl={false} >
      {/* background tile import */}
      <TileLayer url={tileURL} />
      {/* MapZoomHandler 컴포넌트를 통해 줌 레벨 업데이트 */}
      <MapZoomHandler zoom={zoom} />
      {/* 레이어 관리 */}
      {children}
    </MapContainer>
  );
}

export default MapWithTileLayer;
