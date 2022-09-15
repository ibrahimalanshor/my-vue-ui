<script setup>
import { reactive, h } from 'vue';
import { BaseTable } from '@/components';

const table = reactive({
  columns: [
    {
      key: 'name',
      name: 'Name',
    },
    {
      key: 'address',
      name: 'Address',
    },
    {
      key: 'action',
      name: 'Action',
    },
  ],
  data: [
    {
      id: 1,
      name: 'Person 1',
      address: 'Bandung, Indonesia',
    },
    {
      id: 2,
      name: 'Person',
      address: 'Bandung, Indonesia',
    },
  ],
  loading: false,
});
</script>

<template>
  <div>
    <input
      type="checkbox"
      id="table-loading"
      :value="true"
      v-model="table.loading"
    />
    <label for="table-loading">Loading</label>
    <base-table
      :columns="table.columns"
      :data="table.data"
      :loading="table.loading"
    >
      <template #body="{ trClass, tdClass }">
        <tr :class="trClass" v-for="data in table.data" :key="data[table.key]">
          <template v-for="column in table.columns" :key="column.key">
            <td :class="tdClass" v-if="column.key === 'action'">Edit</td>
            <td :class="tdClass" v-else>{{ data[column.key] }}</td>
          </template>
        </tr>
      </template>
    </base-table>
  </div>
</template>
