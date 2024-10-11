import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'

const AccordionTitleDetailLinkCkView = ({ title, detail, link }: any) => {
  return (
    <div className="flex flex-row items-center">
      <Checkbox className="mr-4"></Checkbox>
      <Accordion type="single" collapsible className="justify-around w-full">
        <AccordionItem value={`item-${title}`}>
          <AccordionTrigger className="text-lg pr-4">
            <div>{title}</div>
          </AccordionTrigger>
          <AccordionContent>
            {/* Link를 사용하되, 내부에 <a> 태그를 중첩하지 않음 */}
            <Link href={link}>
              <div>
                <span>{detail}</span>
                <span className="text-gray-400 underline">(클릭시 링크로 이동합니다.)</span>
              </div>
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

interface AccordionTitleDetailLinkCkProps {
  title: string
  detail: string
  link: string
}

export const AccordionTitleDetailLinkCk = ({
  title,
  detail,
  link,
}: AccordionTitleDetailLinkCkProps) => {
  const props = {
    title,
    detail,
    link,
  }

  return <AccordionTitleDetailLinkCkView {...props}></AccordionTitleDetailLinkCkView>
}
