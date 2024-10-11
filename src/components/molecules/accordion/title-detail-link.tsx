import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'


const AccordionTitleDetailLinkView = ({title, detail, link} : any) => {
    return (
        <Accordion type="single" collapsible>
        <AccordionItem value={`item-${title}`}>
          
          <AccordionTrigger className='text-lg'>{title}</AccordionTrigger>
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

interface AccordionTitleDetailLinkProps {
    title : string, 
    detail : string,
    link : string, 
}
export const AccordionTitleDetailLink = ({title, detail, link} : AccordionTitleDetailLinkProps) => {

    const props = {
        title,
        detail, 
        link, 
    }; 

  return <AccordionTitleDetailLinkView {...props}></AccordionTitleDetailLinkView>
}
