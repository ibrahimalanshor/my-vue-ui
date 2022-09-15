<script setup>
import { reactive } from 'vue';
import { BaseButton, BaseBadge } from '@/components';

const button = reactive({
  colors: [null, 'primary', 'success', 'error', 'warning'],
  sizes: [null, 'xs', 'sm', 'lg', 'xl'],
  color: null,
  size: null,
  text: 'Button',
  loading: false,
  outline: false,
  disabled: false,
  block: false,
  withIcon: false,
  withBadge: false,
});
</script>

<template>
  <div>
    <div class="mb-4">
      <input v-model="button.text" type="text" placeholder="Button Text" />
      <select v-model="button.color">
        <option v-for="color in button.colors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
      <select v-model="button.size">
        <option v-for="size in button.sizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
      <input
        type="checkbox"
        id="button-icon"
        :value="true"
        v-model="button.withIcon"
      />
      <label for="button-icon">With Icon</label>
      <input
        type="checkbox"
        id="button-block"
        :value="true"
        v-model="button.block"
      />
      <label for="button-block">Block</label>
      <input
        type="checkbox"
        id="button-badge"
        :value="true"
        v-model="button.withBadge"
      />
      <label for="button-badge">With Badge</label>
      <input
        type="checkbox"
        id="button-loading"
        :value="true"
        v-model="button.loading"
      />
      <label for="button-loading">Loading</label>
      <input
        type="checkbox"
        id="button-disabled"
        :value="true"
        v-model="button.disabled"
      />
      <label for="button-disabled">Disabled</label>
      <input
        type="checkbox"
        id="button-outline"
        :value="true"
        v-model="button.outline"
      />
      <label for="button-outline">Outline</label>
    </div>

    <base-button
      :color="button.color"
      :size="button.size"
      :label="button.text"
      :loading="button.loading"
      :disabled="button.disabled"
      :block="button.block"
      :outline="button.outline"
      v-if="!button.withIcon && !button.withBadge"
    />

    <template v-else>
      <base-button
        :color="button.color"
        :size="button.size"
        :label="button.text"
        :loading="button.loading"
        :disabled="button.disabled"
        :block="button.block"
        :outline="button.outline"
        v-if="button.withBadge"
      >
        <template #badge="{ badgeClass }">
          <base-badge :class="badgeClass" color="primary" label="2" circle />
        </template>
      </base-button>
      <base-button
        :color="button.color"
        :size="button.size"
        :label="button.text"
        :loading="button.loading"
        :disabled="button.disabled"
        :block="button.block"
        :outline="button.outline"
        v-else-if="button.withIcon"
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
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </template>
      </base-button>
    </template>
  </div>
</template>
