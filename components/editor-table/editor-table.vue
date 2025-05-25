<template>
  <div v-if="className" :class="className">
    <EditorTableForm
      :form="form"
      :buttons="form?.buttons"
      :fields="form?.fields"
      :inline="form?.inline"
      :on-create="form?.onCreate"
      :on-search="form?.onSearch"
      :on-reset="form?.onReset"
      :text="text"
    />
  </div>
  <template v-else>
    <EditorTableForm
      :form="form"
      :buttons="form?.buttons"
      :fields="form?.fields"
      :inline="form?.inline"
      :on-create="form?.onCreate"
      :on-search="form?.onSearch"
      :on-reset="form?.onReset"
      :text="text"
    />
  </template>
</template>

<script lang="ts" setup generic="T">
import type { ETProps } from './types'

const props = defineProps<ETProps<T>>()

const { form, text, className } = props
</script>

<style></style>
