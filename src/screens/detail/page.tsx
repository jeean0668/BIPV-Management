
import React from 'react'
import { GisMapTemplate } from '@/template/gis/GisMapTemplate'
import { DashboardTemplate } from '@/template/dashboard/DashboardTemplate'
import { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage, FormItem } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { InputButtonField } from '@/components/organisms/form/InputButtonField'
import { InputField } from '@/components/organisms/form/Inputfield'
import { useRouter } from 'next/navigation'
import { InputPhoneNumberField } from '@/components/organisms/form/InputPhoneNumberField'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setAddress } from '@/store/actions/analysisSlice'
import { StrictMode } from 'react'
import Script from 'next/script'

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  location : z.string().min(1, {
    message : "건물명은 최소 한 글자 이상이어야 합니다."
  }),
  zonecode : z.string().min(3)
})

const DetailPageView = ({form} : any) => {
  <div>
    <Form {...form}>

    </Form>
  </div>
}

declare global {
  interface Window {
    daum : any
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

export const DetailPage = () => {

  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema), 
    defaultValues : {
      username : "",
      location : "",
      zonecode : ""
    }
  })
  
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        // 주소 업데이트.
        form.setValue('location', data.address);
        form.setValue('zonecode', data.zonecode)
        dispatch(setAddress({newAddress : data.address}));
        
      },
    }).open();
  }
  const router = useRouter();

  return (
   
    <div className="flex flex-col w-full items-center py-2 min-h-screen border">
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
      <Form {...form}>
        <form onSubmit={() => {}} className="space-y-2">
          <InputField id={"username"} form={form} label={"건물 이름"} description={'건물 이름을 입력해주세요.'}></InputField>
          <InputButtonField form={form} label={"건물 위치"} description={'건물 위치를 입력해주세요'} onClick={handleAddressSearch}/>
          <InputField id={"zonecode"} form={form} label={"우편번호"} description={'우편번호 입니다.'}></InputField>
        </form>
        <div className="w-5/6 mt-2 flex flex-row justify-around">
          <Button className="bg-gray-400" onClick={()=>{router.push('/')}}>뒤로가기</Button>
          <Button className='bg-blue-400'>확인</Button>
        </div>
      </Form>
    </div>
    
  )
}
