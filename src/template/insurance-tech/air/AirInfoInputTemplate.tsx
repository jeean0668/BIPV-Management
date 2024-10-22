'use client'

import React from 'react'
import { useAirInfoInputTemplate } from './useAirInfoInputTemplate'
import { Form } from '@/components/ui/form'
import { InputField } from '@/components/organisms/form/Inputfield'
import { InputButtonField } from '@/components/organisms/form/InputButtonField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CardWithProgress } from '@/components/organisms/card/card-with-progress'
import { IoMdTime } from 'react-icons/io'
import Script from 'next/script'
import { Label } from '@/components/ui/label'
import { CardWithTitle } from '@/components/organisms/card/card-title'
import { Marker } from 'react-leaflet'
import { DynamicMap } from '@/template/gis/DynamicMap';
import { renderBuildingPropos } from '@/components/organisms/list/renderList'
import Image from 'next/image'
import "leaflet/dist/leaflet.css";
import { BuildingBarChart } from '@/components/organisms/charts/BuildingBarChart'

export const AirInfoInputTemplate = () => {
  
  // 커스텀 훅을 사용
  const {
    form,
    handleAddressSearch,
    position, 
    tileURL, 
    RecenterAutomatically, 
    isLoading, 
    isCalculationFinished,
    buildPropos, 
    handleSubmit,
  } = useAirInfoInputTemplate();

  return (
    <div className="flex flex-col w-full items-center justify-center py-2 min-h-screen max-w-[500px] m-auto">
      {/* 다음 주소 검색 API를 위한 스크립트 */}
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>

      {/* 계산 완료 전 로딩 중인 상태 */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-64">
          <Image src={"/images/loading.gif"} alt="loading animation" height={50} width={50}/>
          <p>계산중입니다...</p> {/* 로딩 메시지 또는 로딩 스피너 추가 가능 */}
        </div>
      )}

       {/* 계산 시작 전, 입력 폼을 표시 */}
      {!isCalculationFinished && !isLoading && (
      <>
        <div className="w-5/6 mt-20">
        <CardWithTitle
            title={"화재파급력 분석"} 
            description={'지역인구, 건물밀도를 기준으로 화재 파급력을 계산합니다.'}
            url = {"/docs/fire"}
        />
      </div>
      <Card className='w-5/6 mt-2 p-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <InputField id={'username'} label={"건물 이름"} form={form}></InputField>
            <InputButtonField form={form} label={"건물 위치"} description={'건물 위치를 입력해주세요'} onClick={handleAddressSearch} />
            <InputField id={"zonecode"} disabled form={form} label={"우편번호"} description={'우편번호 입니다.'}></InputField>
            <InputField id={"bcode"} disabled form={form} label={"법정동코드"} description={'법정동 코드입니다.'}></InputField>

            <Button type="submit">제출하기</Button>
          </form>
        </Form>
        
      </Card>
      </>)}

      {/* 계산 완료 후 결과 화면만 표시 */}
      {isCalculationFinished && !isLoading && (
        <Card className = 'w-5/6 flex flex-col'>
          {/* 건물 용도별 데이터 출력 */}
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold">건물 용도별 분류</h3>
            {renderBuildingPropos(buildPropos)}
          </div>
          {/* 작성한 위치 지도상으로 보여주는 부분 */}
            <div className = "w-full h-[300px] border-2 mt-2">
              <DynamicMap initialPosition={[position.lat, position.lng]} tileURL={tileURL} zoom={13}>
                <Marker position={[position.lat, position.lng]}> 
                </Marker>
                <RecenterAutomatically lat={position.lat} lng={position.lng}/>
              </DynamicMap>
            </div>
          {/* 차트로 보여주는 부분  */}
          <div className="w-full mt-2 bt-2">
            <Label className="text-lg font-semibold">근처에 가장 많은 용도별 건물이에요.</Label>
            <BuildingBarChart buildPropos={buildPropos} />
          </div>
        </Card>
      )}
      
    </div>
  )
}