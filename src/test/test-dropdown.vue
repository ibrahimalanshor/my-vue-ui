<script setup>
import { reactive } from 'vue';
import { BaseButton, BaseDropdown } from '@/components';

const dropdown = reactive({
  sizes: [null, 'auto', 'md', 'lg'],
  positions: [null, 'right'],
  options: [
    {
      key: 'profile',
      label: 'Profile',
    },
    {
      key: 'setting',
      label: 'Setting',
    },
    {
      key: 'Logout',
      label: 'Logout',
      divideTop: true,
      onClick: (option) => console.log('onclick', option),
    },
  ],
  label: 'Dropdown',
  size: null,
  position: null,
  visible: false,
});

const handleClickShow = () => {
  dropdown.visible = true;
};
const handleClickOption = (option) => {
  console.log(option);
};
</script>

<template>
  <div>
    <div class="ui-mb-4">
      <select v-model="dropdown.size">
        <option v-for="size in dropdown.sizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
      <select v-model="dropdown.position">
        <option
          v-for="position in dropdown.positions"
          :key="position"
          :value="position"
        >
          {{ position }}
        </option>
      </select>
      <button v-on:click="handleClickShow">Show</button>
    </div>

    <base-dropdown
      v-model="dropdown.visible"
      :options="dropdown.options"
      :size="dropdown.size"
      :position="dropdown.position"
      v-on:click-option="handleClickOption"
    >
      <template #toggle="{ toggle }">
        <base-button color="primary" label="Dropdown" v-on:click="toggle" />
      </template>

      <!-- <template #content="{ wrapperClass, optionClass }">
        <div :class="wrapperClass">
          <div :class="optionClass">Custom</div>
        </div>
      </template> -->
    </base-dropdown>
  </div>
</template>
