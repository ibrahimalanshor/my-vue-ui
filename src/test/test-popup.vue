<script setup>
import { reactive } from 'vue';
import { BaseButton, BasePopup } from '@/components';

const popup = reactive({
  text: 'Are you sure you want to delete this product?',
  visible: false,
});

const handleClickShow = () => {
  popup.visible = true;
};
</script>

<template>
  <div>
    <button v-on:click="handleClickShow">Show Popup</button>
    <base-popup :text="popup.text" v-model="popup.visible">
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
      <template #footer>
        <div class="ui-flex ui-items-center ui-justify-center ui-space-x-3">
          <base-button color="error" label="Confirm" />
          <base-button label="Cancel" />
        </div>
      </template>
    </base-popup>
  </div>
</template>
