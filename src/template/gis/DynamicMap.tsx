'use client'

import dynamic from "next/dynamic";
import React, { ReactNode, useEffect } from "react";
import { LatLngTuple } from "leaflet";
// import MapWithTileLayer from "@/components/organisms/MapContainer/MapWithTileLayer";

interface DynamicMapProps { 
   initialPosition : LatLngTuple, 
   tileURL : string, 
   zoom? : number, 
   children? : ReactNode
}

const MapWithTileLayer = dynamic(() => import("@/components/organisms/MapContainer/MapWithTileLayer"), { ssr: false });

export function DynamicMap({initialPosition, tileURL, children, zoom} : DynamicMapProps) {

  return (
      <MapWithTileLayer initialPosition={initialPosition} tileURL={tileURL} zoom={zoom}>{children}</MapWithTileLayer>
  );
}