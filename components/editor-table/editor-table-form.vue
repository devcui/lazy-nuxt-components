<template>
  <UForm v-if="form" v-bind="form" @submit="_onSearch">
    <template v-for="(field, index) in fields" :key="index">
      <EditorTableFormField
        v-if="field"
        v-bind="field"
        :inline="_inline"
        :state="_formState"
        @update:model-value="_onFieldChange"
      />
    </template>
    <UButton type="submit">
      {{ text?.submit }}
    </UButton>
  </UForm>
</template>

<script lang="ts" setup generic="T">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { ETButtonProps, ETFormItem, ETFormProps, ETPageParam, ETPageResult, ETTextProps } from './types'

const { form, inline } = defineProps<{
  url?: string
  form?: ETFormProps
  fields?: ETFormItem[]
  inline?: boolean
  text?: ETTextProps
  pageInex?: number
  pageSize?: number
  buttons?: ETButtonProps[]
  onCreate?: () => Promise<void>
  onSearch?: (param: ETPageParam<T>) => Promise<ETPageResult<T>>
  onReset?: () => Promise<ETPageResult<T>>
}>()

const _inline = computed(() => {
  if (inline) return inline
  return false
})

const _formState = form?.state ? reactive(unref(form.state)) : reactive({})

const _onFieldChange = (name: string, value: any) => {
  _formState[name] = value
}

const _onSearch = (e: FormSubmitEvent<T>) => {
  console.log(e.data)
}
</script>

<style></style>
