<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  options: Array,
  size: {
    type: String,
    default: 'default',
  },
  position: {
    type: String,
    default: 'left',
  },
});
const emit = defineEmits(['update:modelValue', 'click-option']);

const visible = ref(props.modelValue);

const dropdownClass = computed(() => {
  const sizes = {
    default: 'w-44',
    md: 'w-56',
    lg: 'w-72',
    auto: 'w-auto',
  };
  const positions = {
    left: 'left-0',
    right: 'right-0',
  };

  const sizeClass = sizes[props.size] ?? sizes.default;
  const positionClass = positions[props.position] ?? positions.default;

  return [sizeClass, positionClass];
});
const wrapperClass = computed(() => {
  return 'py-1 text-sm text-gray-700';
});
const optionClass = computed(() => {
  return 'block py-2 px-4 hover:bg-gray-100';
});

const handleClickToggle = () => {
  visible.value = !visible.value;

  emit('update:modelValue', visible.value);
};
const handleClickOutside = () => {
  visible.value = false;

  emit('update:modelValue', visible.value);
};
const handleClickOption = (option) => {
  option.onClick && option.onClick(option);

  emit('click-option', option);
};

watch(
  () => props.modelValue,
  () => {
    visible.value = props.modelValue;
  }
);
</script>

<template>
  <div class="relative w-auto">
    <slot name="toggle" :toggle="handleClickToggle" />

    <div
      class="z-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 block absolute top-12"
      :class="dropdownClass"
      v-if="visible"
      v-click-outside="handleClickOutside"
    >
      <slot
        name="content"
        :wrapper-class="wrapperClass"
        :option-class="optionClass"
      >
        <ul :class="wrapperClass">
          <li
            v-for="(option, key) in options"
            :key="key"
            v-on:click="handleClickOption(option)"
            :class="[
              optionClass,
              option.divideTop ? 'border-t border-gray-100' : '',
              option.divideBottom ? 'border-b border-gray-100' : '',
            ]"
          >
            {{ option.label }}
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>
