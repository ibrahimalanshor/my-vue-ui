<script setup>
import { reactive } from 'vue';
import { BaseRadio } from '@/components';

const radio = reactive({
  model: null,
  value: 'value',
});

const handleChange = () => console.log('onchange');
</script>

<template>
  <div>
    {{ radio.model }}
    <base-radio
      label="namun"
      id="test-radio"
      name="test-radio"
      :value="radio.value"
      v-model="radio.model"
      v-on:change="handleChange"
    ></base-radio>
    <base-radio
      label="namun"
      id="test-radio-2"
      name="test-radio"
      value="radio.value"
      v-model="radio.model"
      v-on:change="handleChange"
    ></base-radio>
  </div>
</template>
