

import React, { ReactNode } from 'react'
import { LayersControl } from 'react-leaflet'

interface MapLayerControlProps {
    children? : ReactNode
    position? : "topright" | "topleft" | "bottomleft" | "bottomright"
}
const MapLayerControl = ({children, position="topright"} : MapLayerControlProps) => {
  return (
    <LayersControl position={position}>
        {children}
    </LayersControl>
  )
}

export default MapLayerControl
