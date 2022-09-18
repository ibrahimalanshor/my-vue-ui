<script>
import { ref, watch, computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-modal',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: String,
    header: {
      type: Boolean,
      default: true,
    },
    footer: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue);

    const titleClass = computed(() => {
      return 'ui-text-xl ui-font-semibold ui-text-gray-900';
    });

    function close() {
      visible.value = false;

      emit('update:modelValue', visible.value);
      emit('close');
    }

    const handleClickClose = () => {
      close();
    };
    const handleClickOutside = () => {
      close();
    };

    watch(
      () => props.modelValue,
      () => {
        visible.value = props.modelValue;
      }
    );

    return { visible, handleClickOutside, titleClass, handleClickClose };
  },
});
</script>

<template>
  <teleport to="body" v-if="visible">
    <div
      tabindex="-1"
      class="ui-overflow-y-auto ui-overflow-x-hidden ui-fixed ui-top-0 ui-right-0 ui-left-0 ui-z-50 ui-w-full md:ui-inset-0 ui-h-full ui-flex ui-justify-center ui-items-center ui-bg-gray-500 ui-bg-opacity-50"
    >
      <div
        class="ui-relative ui-p-4 ui-w-full ui-max-w-2xl ui-h-full md:ui-h-auto"
        v-click-outside="handleClickOutside"
      >
        <!-- Modal content -->
        <div class="ui-relative ui-bg-white ui-rounded-lg ui-shadow">
          <!-- Modal header -->
          <div
            class="ui-flex ui-justify-between ui-items-center ui-p-4 ui-rounded-t ui-border-b"
            v-if="header"
          >
            <slot name="title" :class="titleClass">
              <h3 :class="titleClass">
                {{ title }}
              </h3>
            </slot>
            <button
              type="button"
              class="ui-text-gray-400 ui-bg-transparent hover:ui-bg-gray-200 hover:ui-text-gray-900 ui-rounded-lg ui-text-sm ui-p-1.5 ui-ml-auto ui-inline-flex ui-items-center"
              v-on:click="handleClickClose"
            >
              <svg
                aria-hidden="true"
                class="ui-w-5 ui-h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div
            class="ui-p-6 ui-space-y-6 ui-text-base ui-leading-relaxed ui-text-gray-500"
          >
            <slot />
          </div>
          <!-- Modal footer -->
          <div
            class="ui-flex ui-items-center ui-p-6 ui-space-x-2 ui-rounded-b ui-border-t ui-border-gray-200"
            v-if="footer"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
