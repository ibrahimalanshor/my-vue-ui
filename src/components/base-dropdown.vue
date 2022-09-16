<script>
import { ref, watch, computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-dropdown',
  props: {
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
    dropdownClass: String,
  },
  emits: ['update:modelValue', 'click-option'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue);

    const dropdownStyle = computed(() => {
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

      return [sizeClass, positionClass, props.dropdownClass];
    });
    const wrapperStyle = computed(() => {
      return 'py-1 text-sm text-gray-700';
    });
    const optopnStyle = computed(() => {
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

    return {
      visible,
      handleClickToggle,
      handleClickOutside,
      dropdownStyle,
      wrapperStyle,
      optopnStyle,
      handleClickOption,
    };
  },
});
</script>

<template>
  <div class="relative w-auto">
    <slot name="toggle" :toggle="handleClickToggle" />

    <div
      class="z-10 bg-white rounded divide-y divide-gray-100 shadow block absolute top-12"
      :class="dropdownStyle"
      v-if="visible"
      v-click-outside="handleClickOutside"
    >
      <slot
        name="content"
        :wrapper-class="wrapperStyle"
        :option-class="optopnStyle"
      >
        <ul :class="wrapperStyle">
          <li
            v-for="(option, key) in options"
            :key="key"
            v-on:click="handleClickOption(option)"
            :class="[
              optopnStyle,
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
