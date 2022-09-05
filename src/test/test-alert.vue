<script setup>
    import { reactive } from 'vue'
    import { BaseAlert } from '@/components';
    
    const alert = reactive({
      colors: [null, 'primary', 'success', 'error', 'warning'],
      color: null,
      text: 'Alert',
      withIcon: false,
      visible: true
    })
    
    const handleClickVisible = () => alert.visible = true
    </script>
    
    <template>
      <div>
        <div class="mb-4">
          <input v-model="alert.text" type="text" placeholder="Alert Text">
          <select v-model="alert.color">
            <option v-for="color in alert.colors" :key="color" :value="color">{{ color }}</option>
          </select>
          <input type="radio" id="without-icon-radio" :value="false" v-model="alert.withIcon">
          <label for="without-icon-radio">Without Icon</label>
          <input type="radio" id="with-icon-radio" :value="true" v-model="alert.withIcon">
          <label for="with-icon-radio">With Icon</label>
          <button v-if="!alert.visible" v-on:click="handleClickVisible">Show</button>
        </div>
    
        <base-alert :color="alert.color" :text="alert.text" v-model="alert.visible" v-if="!alert.withIcon" />
        <base-alert :color="alert.color" :text="alert.text" v-model="alert.visible" v-else>
          <template #icon="{ iconClass }">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              :class="iconClass">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </template>
        </base-alert>
      </div>
    </template>