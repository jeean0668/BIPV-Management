import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
interface MapZoomControl {
    currentZoom : number; 
    handleZoomIn : () => void;
    handleZoomOut : () => void; 
}

const MapZoomControlView = ({currentZoom, handleZoomIn, handleZoomOut} : any) => {
    return (
        <div className="absolute top-16 left-2"
            style={{
              zIndex: 9999, // z-index를 높게 설정
              // pointerEvents: 'none', // 지도를 클릭 가능하도록 설정
            }}>
            <div className='flex flex-col items-start'>
              {/* <Label className='bg-white mb-2 mt-1'>zoom: {currentZoom}</Label> */}
              <div className='flex flex-col space-y-0.5'>
                <Button variant="outline" onClick={handleZoomIn} className='bg-blue-500'>+</Button>
                <Button variant="outline" onClick={handleZoomOut} className='bg-red-500'>-</Button>
               </div>
            </div>
        </div>
      );
}

const MapZoomControl = ({currentZoom, handleZoomIn, handleZoomOut} : MapZoomControl) => {

    const props = {
        currentZoom, 
        handleZoomIn, 
        handleZoomOut, 
    }

    return <MapZoomControlView {...props}></MapZoomControlView>
};

export default MapZoomControl;
