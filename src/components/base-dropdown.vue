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
        default: 'ui-w-44',
        md: 'ui-w-56',
        lg: 'ui-w-72',
        auto: 'ui-w-auto',
      };
      const positions = {
        left: 'ui-left-0',
        right: 'ui-right-0',
      };

      const sizeClass = sizes[props.size] ?? sizes.default;
      const positionClass = positions[props.position] ?? positions.default;

      return [sizeClass, positionClass, props.dropdownClass];
    });
    const wrapperStyle = computed(() => {
      return 'ui-py-1 ui-text-sm ui-text-gray-700';
    });
    const optopnStyle = computed(() => {
      return 'ui-block ui-py-2 ui-px-4 hover:ui-bg-gray-100';
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
  <div class="ui-relative ui-w-auto">
    <slot name="toggle" :toggle="handleClickToggle" />

    <div
      class="ui-z-10 ui-bg-white ui-rounded ui-divide-y ui-divide-gray-100 ui-shadow ui-block ui-absolute ui-top-12"
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
              option.divideTop ? 'ui-border-t ui-border-gray-100' : '',
              option.divideBottom ? 'ui-border-b ui-border-gray-100' : '',
            ]"
          >
            {{ option.label }}
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>
