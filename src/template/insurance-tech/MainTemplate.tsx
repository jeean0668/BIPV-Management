

import React from 'react'
import { SiteTitle } from '@/components/molecules/title/SiteTitle'
import { CardWithTitle } from '@/components/organisms/card/card-title'
const MainTemplate = () => {
  return (
    <div className="flex flex-col w-full items-center py-2 min-h-screen border">
        <div className="flex flex-row justify-center items-start">
            <SiteTitle title={"주거환경 분석"}></SiteTitle>
        </div>
        <div className='w-5/6 space-y-2'>
            <CardWithTitle
                title={"화재 파급력"} 
                description={'우리 집의 화재 파급력을 분석합니다.'}
                url = {"/docs/fire"}
            />
            <CardWithTitle
                title={"주변환경 분석"} 
                description={'우리 집 주변 환경을 분석합니다.'}
                url = {"/docs/air"}
            />
        </div>
    </div>
  )
}

export default MainTemplate
