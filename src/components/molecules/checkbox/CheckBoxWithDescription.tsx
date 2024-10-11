

import React from 'react'
import { FormItem, FormControl, FormLabel, FormDescription} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Option } from '@/utils/types'
import Link from 'next/link'

export function CheckBoxWithDescription(field:any, selectedOptions: Option[], index: number) {
    return <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange} />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>{selectedOptions[index].label}</FormLabel>
        <FormDescription>
          You can manage this option in the{" "}
        </FormDescription>
      </div>
    </FormItem>
  }