<script>
import { computed, defineComponent } from 'vue';
import BaseSpinner from './base-spinner.vue';

export default defineComponent({
  name: 'base-table',
  components: { BaseSpinner },
  props: {
    id: {
      type: String,
      default: 'id',
    },
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const headTdClass = computed(() => {
      return 'ui-py-3 ui-px-6';
    });

    const bodyTrClass = computed(() => {
      return 'ui-bg-white ui-border-b hover:ui-bg-gray-50';
    });

    const bodyTdClass = computed(() => {
      return 'ui-py-4 ui-px-6';
    });

    return { headTdClass, bodyTrClass, bodyTdClass };
  },
});
</script>

<template>
  <div class="ui-overflow-x-auto ui-relative ui-shadow sm:ui-rounded-lg">
    <div
      class="ui-absolute ui-top-0 ui-left-0 ui-w-full ui-h-full ui-flex ui-items-center ui-justify-center ui-bg-gray-50 ui-bg-opacity-50"
      v-if="loading"
    >
      <base-spinner />
    </div>
    <table class="ui-w-full ui-text-sm ui-text-left ui-text-gray-500">
      <thead class="ui-text-xs ui-text-gray-700 ui-uppercase ui-bg-gray-50">
        <slot name="head" :td-class="headTdClass">
          <tr>
            <th
              scope="col"
              :class="headTdClass"
              v-for="column in columns"
              :key="column.key"
            >
              {{ column.name }}
            </th>
          </tr>
        </slot>
      </thead>
      <tbody v-if="data.length">
        <slot name="body" :tr-class="bodyTrClass" :td-class="bodyTdClass">
          <tr :class="bodyTrClass" v-for="data in data" :key="data[id]">
            <td
              :class="bodyTdClass"
              v-for="column in columns"
              :key="column.key"
            >
              {{ data[column.key] }}
            </td>
          </tr>
        </slot>
      </tbody>
      <tbody v-else>
        <tr class="ui-bg-white ui-border-b">
          <td :colspan="columns.length" class="ui-py-4 ui-px-6">Data Empty</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
