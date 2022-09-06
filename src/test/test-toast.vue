<script setup>
import { reactive } from 'vue';
import { BaseToast } from '@/components';

const toast = reactive({
  text: 'Set yourself free.',
  withIcon: false,
  visible: false,
});

const handleClickShow = () => {
  toast.visible = true;
};
</script>

<template>
  <div>
    <input
      type="checkbox"
      :value="true"
      v-model="toast.withIcon"
      id="toast-with-icon"
    />
    <label for="toast-with-icon">With Icon</label>
    <button v-on:click="handleClickShow">Show Toast</button>
    <base-toast
      :text="toast.text"
      v-model="toast.visible"
      :with-icon="toast.withIcon"
    >
      <template #icon="{ iconClass }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          :class="iconClass"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      </template>
    </base-toast>
  </div>
</template>
