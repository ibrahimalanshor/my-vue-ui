<script setup>
import { reactive } from 'vue';
import { BaseButton, BaseModal } from '@/components';

const modal = reactive({
  title: 'Modal',
  header: true,
  footer: true,
  visible: false,
});

const handleClickShow = () => {
  modal.visible = true;
};
</script>

<template>
  <div>
    <button v-on:click="handleClickShow">Show Modal</button>
    <base-modal
      :title="modal.title"
      :header="modal.header"
      :footer="modal.footer"
      v-model="modal.visible"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
        blanditiis quidem porro laborum excepturi tenetur alias assumenda,
        cumque eos corporis rerum, dolor suscipit ipsa, voluptate nesciunt et
        repellat ea, unde.
      </p>

      <template #footer>
        <base-button color="primary" label="Save" />
        <base-button label="Cancel" />
      </template>
    </base-modal>
  </div>
</template>
