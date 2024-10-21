'use client'

import React, { useState } from 'react'
import { useFireInfoInputTemplate } from './useFireInfoInputTemplate'  // 위에서 작성한 hook import
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
import "leaflet/dist/leaflet.css";
import { DynamicMap } from '@/template/gis/DynamicMap';
import { CardWithDetailDescription } from '@/components/organisms/card/card-detail_description'
import {Spinner} from "@nextui-org/spinner";

export const FireInfoInputTemplate = () => {
  
  // 커스텀 훅을 사용
  const {
    form,
    handleAddressSearch,
    onSubmit,
    population,
    position, 
    tileURL, 
    density, 
    rippleEffect,
    RecenterAutomatically, 
    rippleEffectColor,
    rippleEffectMessage, 
    isLoading, 
    handleSubmit, 
    isCalculationFinished,

  } = useFireInfoInputTemplate();

  return (
    <div className="flex flex-col w-full items-center justify-center py-2 min-h-screen max-w-[500px] m-auto">
      {/* 다음 주소 검색 API를 위한 스크립트 */}
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
      
      {/* 계산 완료 전 로딩 중인 상태 */}
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <Spinner color="primary"/>
          <p>로딩중입니다.</p> {/* 로딩 메시지 또는 로딩 스피너 추가 가능 */}
        </div>
      )}

      {/* 계산 완료 후 결과 화면만 표시 */}
      {isCalculationFinished && !isLoading && (
        <Card className='w-5/6 flex flex-col mt-2'>
          <div className='flex flex-row w-full mt-2 items-center'>
            <Label className='text-2xl pb-10 pl-5'>{Math.round(rippleEffect)}</Label>
            <div className='w-full flex flex-col items-center'>
              <CardWithProgress
                title={"화재 파급력"}
                description={'지역인구, 건물밀도를 기준으로 화재 파급력을 계산합니다.'}
                value={rippleEffect}
                color={rippleEffectColor}
              >
                <IoMdTime color='blue' size={24} className="mb-11 mr-2 mt-2" />
              </CardWithProgress>
            </div>
          </div>

          {/* 작성한 위치 지도상으로 보여주는 부분 */}
          {/* <div className="w-full h-[300px] border-2 mt-2">
            <DynamicMap initialPosition={[position.lat, position.lng]} tileURL={tileURL} zoom={13}>
              <Marker position={[position.lat, position.lng]} />
              <RecenterAutomatically lat={position.lat} lng={position.lng} />
            </DynamicMap>
          </div> */}

          <CardWithDetailDescription
            title={"상세한 정보를 보여드릴게요"} 
            description={'우리 집 인근 정보를 분석합니다..'}
            url={"/docs/fire"}
          >
            <Label>{`인구 수 : ${population}`}</Label>
            <Label>{`건물 밀도 : ${Math.round(density * 100)}%`}</Label>
            <Label>{`분석 결과 : ${rippleEffectMessage}`}</Label>
          </CardWithDetailDescription>   
        </Card>
      )}

      {/* 계산 시작 전, 입력 폼을 표시 */}
      {!isLoading && !isCalculationFinished && (
        <>
          <div className="w-5/6 mt-20">
            <CardWithTitle
                title={"주변환경 분석"} 
                description={'우리 집 주변 환경을 분석합니다.'}
                url = {"/docs/air"}
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
        </>
      )}
    </div>
  )
}
