
import React, { Dispatch, ReactNode, SetStateAction } from 'react'


interface MarkerDrawerProps {
    title : string, 
    isDrawerOpen : boolean
    setDrawerOpen : Dispatch<SetStateAction<boolean>>; 
    children? : ReactNode
}

const MarkerDrawer = ({
    title, 
    isDrawerOpen, 
    setDrawerOpen, 
    children, } : MarkerDrawerProps) => {

    const props = {
        title,
        isDrawerOpen,
        setDrawerOpen,
        children, 
    }

    return <MarkerDrawerView {...props}/>
}

const MarkerDrawerView = ({title, isDrawerOpen, setDrawerOpen, children}:any) => {
  return (
    <div 
          className={`fixed inset-x-0 bottom-0 transform transition-transform duration-300 bg-white shadow-lg p-4 rounded-t-lg ${
            isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ zIndex: 1000 }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button className="text-red-500" onClick={() => setDrawerOpen(false)}>닫기</button>
          </div>
          <div className="mt-2">
            <p>여기에 마커 관련 정보를 표시할 수 있습니다.</p>
          </div>
          {children}
        </div>
      
  )
}

export { MarkerDrawer } 
