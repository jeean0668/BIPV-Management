

import { LatLngTuple } from 'leaflet'
import React, { ReactNode } from 'react'
import { Marker, Popup } from 'react-leaflet'


interface CustomMarkerProps {
    position : LatLngTuple,
    click? : () => void,
    children? : ReactNode, 
}

const CustomMarker = ({position, click, children} : CustomMarkerProps) => {
    
    const props = {
        position, 
        click, 
        children,
    }

    return <CustomMarkerView {...props}/>
}

const CustomMarkerView = ({position, click, children} : any) => {
  return (
    <Marker
        position={position}
        eventHandlers={{
            click: (e) => {
                click();            },
        }}
    />
  )
}

export default CustomMarker
