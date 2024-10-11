import { LayersControl } from "react-leaflet";


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