

import { SiteTitle } from '@/components/molecules/title/SiteTitle'
import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { AccordionTitleDetailLinkCk } from '@/components/molecules/accordion/title-detail-link-checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/customizable-progress'
import { CardWithProgress } from '@/components/organisms/card/card-with-progress'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CgChevronRight } from "react-icons/cg";
import { CiBatteryCharging } from "react-icons/ci";
import { RiFireFill } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { MultipleLineChart } from '@/components/organisms/charts/MultipleLineChart'
import { CardWithTitle } from '@/components/organisms/card/card-title'
import { useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { SelectForm } from '@/components/organisms/select/SelectForm'
import { useForm } from 'react-hook-form'  
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod"
import { toast } from '@/hooks/use-toast'

const FormSchema = z.object({
    name: z
      .string({
        required_error: "Please select an email to display.",
      })
  })

export const DashboardTemplate = () => {

    const router = useRouter(); 
    const panelInfo = useSelector((state : RootState) => { return ( state.analysis.panels)});


  return (
    <div className="flex flex-col w-full items-center py-2 min-h-screen border">
        <div className="flex flex-row justify-center items-start">
            <SiteTitle title={"BIPV 실시간 분석"}></SiteTitle>
        </div>
        <div className = 'flex flex-col w-5/6 justify-center items-center'>
            <CardWithTitle title={"내 건물 설정하기"} url="test"></CardWithTitle>
        </div>
        <div className = "w-5/6 mt-2 rounded-xl">
            <div className='w-full justify-center items-center text-gray-400'>
                <MultipleLineChart/>
            </div>
        </div>
        <Label className='p-2 mt-4 w-5/6 text-1xl text-gray-400'>도쿄도의 재난위험 수치 및 화재 발생원인 연구결과를 발표로 위험도를 산출합니다.</Label>
        <div className = 'w-5/6'>
            {/* <SelectForm name={form.getValues('name')} form={form} infoList={panelInfo} onSubmit={onSubmit}></SelectForm> */}
            <Card className='flex flex-col items-center justify-center space-y-2 pt-4 pb-2 mt-4 '>
                <div className = 'w-full pl-8 flex flex-col'>
                    <Label className='pt-4 text-l text-gray-400'>10월 12일 토요일 오후 4시</Label>
                    <Label className='text-xl'>{`현재 패널 1 상태는 아래와 같아요`}</Label>
                </div>
                <CardWithProgress 
                    title={"발전 효율 손실"} 
                    description={'예측된 값 대비 얼마의 효율을 내는지 알려줘요.'}
                    value={15}
                    color='bg-blue-300'
                >
                    <CiBatteryCharging size={24} className="mb-11 mr-2 mt-2"></CiBatteryCharging>
                </CardWithProgress>
                <CardWithProgress 
                    title={"과전류"} 
                    description={'전류가 너무 많이 흐르면, 화재 위험이 높아집니다.'}
                    value={33}
                    color='bg-blue-300'
                >
                    <CiBatteryCharging size={24} className="mb-11 mr-2 mt-2"></CiBatteryCharging>
                </CardWithProgress>
                <CardWithProgress 
                    title={"화재발생 파급력"} 
                    description={'화재가 발생했을 때 얼마나 큰 파급력이 미치는지 측정합니다.'}
                    value={66}
                    color='bg-yellow-300'
                >
                    <RiFireFill color='red' size={24} className="mb-11 mr-2 mt-2"></RiFireFill>

                </CardWithProgress>
                <CardWithProgress 
                    title={"수명"} 
                    description={'패널 수명을 분석하여 위험도를 측정합니다'}
                    value={70}
                    color='bg-red-300'
                >
                    <IoMdTime color='blue' size={24} className="mb-11 mr-2 mt-2"></IoMdTime>
                </CardWithProgress>
                <CardWithProgress 
                    title={"응급상황 대처"} 
                    description={'패널 수명을 분석하여 위험도를 측정합니다'}
                    value={27}
                    color='bg-blue-300'
                >
                    <IoMdTime color='blue' size={24} className="mb-11 mr-2 mt-2"></IoMdTime>
                </CardWithProgress>
                <Separator className='w-5/6'/>
                <div className='flex flex-row w-5/6 justify-center text-gray-400'>
                    <Button className="w-full" variant={'ghost'} onClick={()=>{}}>자세한 분석 결과 보기<CgChevronRight/></Button>
                </div>
            </Card>
            
        </div>
        <div className = 'flex flex-col w-5/6 pt-2 justify-center items-center'>
            <CardWithTitle title={"BIPV 교체하기"} url="/test"></CardWithTitle>
        </div>
    </div>
  )
}
