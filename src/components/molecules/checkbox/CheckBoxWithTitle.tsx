import React from 'react'
import { FormItem, FormControl, FormLabel, FormDescription} from '@/components/ui/atoms/form'
import { Checkbox } from '@/components/ui/atoms/checkbox'
import { Option } from '@/utils/types'
import Link from 'next/link'

interface CheckBoxWithTitleProps {
  title : string; 
  field: any;
  index: number;
  onChange : (field : any, checked: boolean, index : number) => void
}

export function CheckBoxWithTitle({ title, field, index, onChange }: CheckBoxWithTitleProps) {
  
  const handleCheckboxChange = (checked: boolean) => {
    // 상태 업데이트
    onChange(field, checked, index)
  };

  return (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={handleCheckboxChange} // 상태 업데이트 핸들러
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>{title}</FormLabel>
        <FormDescription>
          You can manage this option in the{" "}
          <Link href="/examples/forms">settings</Link> page.
        </FormDescription>
      </div>
    </FormItem>
  );
}
