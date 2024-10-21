import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { UseFormReturn } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'

  interface SelectFormProps {
    name : string
    form : UseFormReturn<any>
    infoList : any
    onSubmit : (data : any) => void
  }

export const SelectForm = ({name, form, infoList, onSubmit} : SelectFormProps) => {
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name={name}
                render = {({field}) => (
                    <FormItem>
                        <FormLabel>패널 선택</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}></Select>
                        <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={form.getValues(name)}/>
                            </SelectTrigger>
                            <SelectContent>
                                {infoList && infoList.map((info : any, index : number) => (<SelectItem key={`id-${name}-${index}`} value={info.name}>{info.name}</SelectItem>))}
                            </SelectContent>
                        </FormControl>
                    </FormItem>
                )}
            />
        </form>
    </Form>
    
  )
}
