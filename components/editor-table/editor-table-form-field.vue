<template>
  <UFormField v-if="field" v-bind="field">
    <UInput
      v-if="type === 'input'"
      v-bind="component"
      v-model:model-value="value"
      @update:model-value="onChange($event)"
    />
    <UInputMenu
      v-else-if="type === 'input-menu'"
      v-bind="component"
      v-model:model-value="value"
      @update:model-value="onChange($event)"
    />
    <UInputNumber
      v-else-if="type === 'input-number'"
      v-bind="component"
      v-model:model-value="value"
      @update:model-value="onChange($event)"
    />
    <USelect
      v-else-if="type === 'select'"
      v-bind="component"
      v-model:model-value="value"
      @update:model-value="onChange($event)"
    />
    <USelectMenu
      v-else-if="type === 'select-menu'"
      v-bind="component"
      v-model:model-value="value"
      @update:model-value="onChange($event)"
    />
    <URadioGroup
      v-else-if="type === 'radio-group'"
      v-bind="component"
      v-model:model-value="value"
      @update:model-value="onChange($event)"
    />
    <UCheckbox
      v-else-if="type === 'checkbox'"
      v-bind="component"
      v-model:model-value="value"
      @update:model-value="onChange($event)"
    />
    <UCheckboxGroup
      v-else-if="type === 'checkbox-group'"
      v-bind="component"
      v-model:model-value="value"
      @update:model-value="onChange($event)"
    />
    <USwitch
      v-else-if="type === 'switch'"
      v-bind="component"
      v-model:model-value="value"
      @update:model-value="onChange($event)"
    />
    <UTextarea
      v-else-if="type === 'textarea'"
      v-bind="component"
      v-model:model-value="value"
      @update:model-value="onChange($event)"
    />
    <UColorPicker
      v-else-if="type === 'color-picker'"
      v-bind="component"
      v-model:model-value="value"
      @update:model-value="onChange($event)"
    />
    <USlider
      v-else-if="type === 'slider'"
      v-bind="component"
      v-model:model-value="value"
      @update:model-value="onChange($event)"
    />
  </UFormField>
</template>

<script lang="ts" setup>
import type { ETFormItem } from './types'

const { type, state, field, component } = defineProps<ETFormItem & { state?: any }>()
const emit = defineEmits<{ (e: 'update:model-value', name: string, value: any): void }>()

const value = computed({
  get() {
    if (state && field && field.name) {
      return state[field.name]
    }
    return undefined
  },
  set(newValue: any) {
    onChange(newValue)
  }
})

const onChange = (newValue: any) => {
  emit('update:model-value', field?.name || 'unknownField', newValue)
}
</script>

<style></style>
