import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'


const AccordionTitleDetailLinkCkView = ({title, detail, link} : any) => {
    return (
        <Accordion type="single" collapsible>
          <AccordionItem value={`item-${title}`}>
            {/* <div> */}
              <AccordionTrigger className='text-lg pr-4'>
                <div> 
                  <Checkbox className='mr-4'></Checkbox>
                  {title}
                </div>
              </AccordionTrigger>
            <AccordionContent>
              <Link href={link}>
                <div>
                  <span>{detail}</span>
                  <span className='text-gray-400'>(클릭시 링크로 이동합니다.)</span>
                </div>
              </Link>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
    )
} 

interface AccordionTitleDetailLinkCkProps {
    title : string, 
    detail : string,
    link : string, 
}
export const AccordionTitleDetailLinkCk = ({title, detail, link} : AccordionTitleDetailLinkCkProps) => {

    const props = {
        title,
        detail, 
        link, 
    }; 

  return <AccordionTitleDetailLinkCkView {...props}></AccordionTitleDetailLinkCkView>
}
