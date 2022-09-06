<script setup>
import { reactive } from 'vue';
import { BaseToggle } from '@/components';

const toggle = reactive({
  model: false,
});

const handleChange = () => console.log('onchange');
</script>

<template>
  <div>
    {{ toggle.model }}
    <base-toggle
      label="namun"
      id="test-toggle"
      v-model="toggle.model"
      v-on:change="handleChange"
    ></base-toggle>
  </div>
</template>
