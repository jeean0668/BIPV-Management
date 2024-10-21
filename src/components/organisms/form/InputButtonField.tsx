import React from 'react'
import { FormField, FormLabel, FormControl, FormDescription, FormMessage, FormItem } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface InputButtonFieldProps {
    form: UseFormReturn<any>
    label: string
    description: string
    onClick: () => void
}

export const InputButtonField = ({ form, label, description, onClick }: InputButtonFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-row space-x-2">
              <Input disabled {...field} />
              {/* "찾기" 버튼이 submit 동작을 막기 위해 type="button" 설정 */}
              <Button type="button" className="bg-gray-400 w-[40px]" onClick={onClick}>
                <span>찾기</span>
              </Button>
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
