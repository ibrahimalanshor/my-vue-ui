<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-table',
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
  },
  setup(props) {
    const headTdClass = computed(() => {
      return 'py-3 px-6';
    });

    const bodyTrClass = computed(() => {
      return 'bg-white border-b hover:bg-gray-50';
    });

    const bodyTdClass = computed(() => {
      return 'py-4 px-6';
    });

    return { headTdClass, bodyTrClass, bodyTdClass };
  },
});
</script>

<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
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
        <tr class="bg-white border-b">
          <td :colspan="columns.length" class="py-4 px-6">Data Empty</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
