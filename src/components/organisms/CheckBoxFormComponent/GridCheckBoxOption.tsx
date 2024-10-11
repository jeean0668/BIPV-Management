import React, { Dispatch, SetStateAction } from 'react'
import { FormField } from '@/components/ui/form'
import { CheckBoxWithTitle } from '@/components/molecules/checkbox/CheckBoxWithTitle'
import { useDispatch } from 'react-redux'

interface GridCheckBoxOptionProps {
    info: any
    setInfo: Dispatch<SetStateAction<any>>
    form: any // type: useForm 
    onSubmit: (data: any) => void // data: z.infer<typeof schema>
}

export const GridCheckBoxOption = (
  {
    info, 
    setInfo, 
    form, 
    onSubmit, 
  }: GridCheckBoxOptionProps) => {

    const dispatch = useDispatch(); 

    const handleCheckboxChange = (field: any, checked: boolean, index: number) => {
      
    };

    return (
      <>
        <h2 className="text-lg font-semibold">Select your options:</h2> 
        {/* Grid 적용: 가로로 최대 5개의 체크박스를 배치 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {form.watch("options").map((_ : any, index : number) => (
            <FormField
              key={index}
              control={form.control}
              name={`options.${index}.isSelected`}
              render={({ field }) => (
                <CheckBoxWithTitle
                  title={info.selectedOptions[index].label}
                  field={field}
                  index={index}
                  onChange={(checked: boolean) => handleCheckboxChange(field, checked, index)} // 상태 변경 함수
                />
              )}
            />
          ))}
        </div>
      </>
    )
}
