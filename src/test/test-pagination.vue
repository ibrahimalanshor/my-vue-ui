<script setup>
import { reactive } from 'vue';
import { BasePagination } from '@/components';

const pagination = reactive({
  hasPrev: true,
  hasNext: true,
  size: 5,
  active: 2,
});

const handlePrev = () => {
  pagination.active > 1 && pagination.active--;
};

const handleNext = () => {
  pagination.active < pagination.size && pagination.active++;
};

const handleClickItem = (number) => (pagination.active = number);
</script>

<template>
  <input
    type="checkbox"
    :value="true"
    v-model="pagination.hasPrev"
    id="pagination-has-prev"
  />
  <label for="pagination-has-prev">With Previous</label>
  <input
    type="checkbox"
    :value="true"
    v-model="pagination.hasNext"
    id="pagination-has-next"
  />
  <label for="pagination-has-next">With Next</label>
  <input type="number" v-model="pagination.size" />
  <input type="number" v-model="pagination.active" />
  <base-pagination
    :has-prev="pagination.hasPrev"
    :has-next="pagination.hasNext"
    :size="pagination.size"
    :active="pagination.active"
    v-on:prev="handlePrev"
    v-on:next="handleNext"
    v-on:click-item="handleClickItem"
  />
</template>
