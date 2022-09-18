<script setup>
import { reactive } from 'vue';
import { BaseForm } from '@/components';

const form = reactive({
  colors: [null, 'primary', 'success', 'error', 'warning'],
  sizes: [null, 'sm', 'lg'],
  color: null,
  size: null,
  disabled: false,
  readonly: false,
  autofocus: false,
  block: true,
  withLabelRight: false,
  withButton: false,
  value: null,
  label: 'Label',
  labelRight: 'Label Right',
  button: 'Button',
});

const handleChange = () => {
  console.log(form.value);
};
</script>

<template>
  <div>
    <div class="ui-mb-4">
      <input type="text" placeholder="Label" v-model="form.label" />
      <input type="text" placeholder="Label Right" v-model="form.labelRight" />
      <input type="text" placeholder="Button" v-model="form.button" />
      <select v-model="form.size">
        <option v-for="size in form.sizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
      <select v-model="form.color">
        <option v-for="color in form.colors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
      <input
        type="checkbox"
        id="form-disabled"
        :value="true"
        v-model="form.disabled"
      />
      <label for="form-disabled">Disabled</label>
      <input
        type="checkbox"
        id="form-readonly"
        :value="true"
        v-model="form.readonly"
      />
      <label for="form-readonly">Readonly</label>
      <input
        type="checkbox"
        id="form-autofocus"
        :value="true"
        v-model="form.autofocus"
      />
      <label for="form-autofocus">Autofocus</label>
      <input
        type="checkbox"
        id="form-block"
        :value="true"
        v-model="form.block"
      />
      <label for="form-block">Block</label>
      <input
        type="checkbox"
        id="form-with-label-right"
        :value="true"
        v-model="form.withLabelRight"
      />
      <label for="form-with-label-right">Label Right</label>
      <input
        type="checkbox"
        id="form-with-button"
        :value="true"
        v-model="form.withButton"
      />
      <label for="form-with-button">Button Text</label>
    </div>
    {{ form.value }}
    <base-form
      id="test-form"
      :size="form.size"
      :color="form.color"
      :disabled="form.disabled"
      :readonly="form.readonly"
      :block="form.block"
      :autofocus="form.autofocus"
      :label="form.label"
      :label-right="form.labelRight"
      :button="form.button"
      :with-label-right="form.withLabelRight"
      :with-button="form.withButton"
      helper="Helper Text"
      v-model="form.value"
      v-on:change="handleChange"
    />
  </div>
</template>
