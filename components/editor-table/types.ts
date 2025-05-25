import type { ComponentProps } from 'vue-component-type-helpers'
import type { UTable, UCheckbox, UPagination, UCheckboxGroup, UColorPicker, UForm, UFormField, UInput, UInputMenu, UInputNumber, URadioGroup, USelect, USelectMenu, USlider, USwitch, UTextarea, UButton } from '#components'

export type ETFormItem =
  | ({ type: 'input', field?: ETFormItemProps, component?: ETInputProps }
    | { type: 'input-menu', field?: ETFormItemProps, component?: ETInputMenuProps }
    | { type: 'input-number', field?: ETFormItemProps, component?: ETInputNumberProps }
    | { type: 'select', field?: ETFormItemProps, component?: ETSelectProps }
    | { type: 'select-menu', field?: ETFormItemProps, component?: ETSelectMenuProps }
    | { type: 'radio-group', field?: ETFormItemProps, component?: ETRadioGroupProps }
    | { type: 'checkbox', field?: ETFormItemProps, component?: ETCheckboxProps }
    | { type: 'checkbox-group', field: ETFormItemProps, component?: ETCheckboxGroupProps }
    | { type: 'switch', field?: ETFormItemProps, component?: ETSwitchProps }
    | { type: 'textarea', field?: ETFormItemProps, component?: ETTextareaProps }
    | { type: 'color-picker', field?: ETFormItemProps, component?: ETColorPickerProps }
    | { type: 'slider', field?: ETFormItemProps, component?: ETSliderProps }
  ) & { inline?: boolean }

export type ETFormItemProps = /* @vue-ignore */ComponentProps<typeof UFormField>
export type ETFormProps =/* @vue-ignore */ ComponentProps<typeof UForm>
export type ETButtonProps = /* @vue-ignore */ ComponentProps<typeof UButton>
export type ETPaginationProps =/* @vue-ignore */ ComponentProps<typeof UPagination>
export type ETInputProps = /* @vue-ignore */ ComponentProps<typeof UInput>
export type ETInputMenuProps =/* @vue-ignore */ ComponentProps<typeof UInputMenu>
export type ETInputNumberProps = /* @vue-ignore */ComponentProps<typeof UInputNumber>
export type ETSelectProps = /* @vue-ignore */ComponentProps<typeof USelect>
export type ETSelectMenuProps = /* @vue-ignore */ComponentProps<typeof USelectMenu>
export type ETRadioGroupProps = /* @vue-ignore */ComponentProps<typeof URadioGroup>
export type ETCheckboxProps = /* @vue-ignore */ComponentProps<typeof UCheckbox>
export type ETCheckboxGroupProps = /* @vue-ignore */ComponentProps<typeof UCheckboxGroup>
export type ETSwitchProps = /* @vue-ignore */ComponentProps<typeof USwitch>
export type ETTextareaProps = /* @vue-ignore */ComponentProps<typeof UTextarea>
export type ETColorPickerProps = /* @vue-ignore */ComponentProps<typeof UColorPicker>
export type ETSliderProps = /* @vue-ignore */ComponentProps<typeof USlider>
export type ETTableProps = /* @vue-ignore */ComponentProps<typeof UTable>

export type ETTextProps = {
  submit?: string
  reset?: string
  edit?: string
  cancel?: string
  add?: string
  delete?: string
  update?: string
  empty?: string
}

export type ETPageResult<T> = {
  index: number
  size: number
  total: number
  data: T[]
}

export type ETPageParam<T> = {
  index: number
  size: number
  data: T
}

export type ETProps<T = unknown> = {
  url?: string
  primary?: string
  className?: string
  text?: ETTextProps
  form?: ETFormProps
    & { buttons?: ETButtonProps[] }
    & { fields?: ETFormItem[] }
    & { inline?: boolean }
    & { onCreate?: () => Promise<void> }
    & { onSearch?: (param: ETPageParam<T>) => Promise<ETPageResult<T>> }
    & { onReset?: () => Promise<ETPageResult<T>> }
  table?: ETTableProps & {
    checked?: Ref<T[]>
    onSave?: (data: T) => (param: ETPageParam<T>) => Promise<ETPageResult<T>>
    onDelete?: (data: T) => (param: ETPageParam<T>) => Promise<ETPageResult<T>>
    onEdit?: (data: T) => (param: ETPageParam<T>) => Promise<ETPageResult<T>>
    onCheck?: (data: T) => Promise<void>
  }
  page?: ETPaginationProps
    & {
      size?: number
      onPageIndexChange?: (param: ETPageParam<T>) => Promise<ETPageResult<T>>
      onPageSizeChange?: (param: ETPageParam<T>) => Promise<ETPageResult<T>>
    }
}
