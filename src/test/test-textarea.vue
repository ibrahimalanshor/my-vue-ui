<script setup>
import { reactive } from 'vue';
import { BaseTextarea } from '@/components';

const textarea = reactive({
  colors: [null, 'primary', 'success', 'error', 'warning'],
  sizes: [null, 'sm', 'lg'],
  color: null,
  size: null,
  disabled: false,
  readonly: false,
  value: null,
});

const handleChange = () => {
  console.log(textarea.value);
};
</script>

<template>
  <div>
    <div class="mb-4">
      <select v-model="textarea.size">
        <option v-for="size in textarea.sizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
      <select v-model="textarea.color">
        <option v-for="color in textarea.colors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
      <input
        type="checkbox"
        id="textarea-disabled"
        :value="true"
        v-model="textarea.disabled"
      />
      <label for="textarea-disabled">Disabled</label>
      <input
        type="checkbox"
        id="textarea-readonly"
        :value="true"
        v-model="textarea.readonly"
      />
      <label for="textarea-readonly">Readonly</label>
    </div>
    {{ textarea.value }}
    <base-textarea
      :size="textarea.size"
      :color="textarea.color"
      :disabled="textarea.disabled"
      :readonly="textarea.readonly"
      v-model="textarea.value"
      v-on:change="handleChange"
    />
  </div>
</template>
