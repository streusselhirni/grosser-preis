<template>
  <div>
    <h2>Wähle deine Themen:</h2>
    <hr>
    <div class="grid-topics">
      <ui-form-field
          v-for="t in topics"
          :key="slug(t)"
      >
        <ui-checkbox
            v-model="selectedTopics"
            :input-id="slug(t)"
            :value="t"
        />
        <label :for="slug(t)">{{ t }}</label>
      </ui-form-field>
    </div>
    <div class="mt-8">
      <ui-button type="raised" @click="$store.commit('selectTopics', selectedTopics)">
        Bestätigen
      </ui-button>
    </div>
  </div>
</template>

<script setup>
import slugify from 'slugify';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const store = useStore();
const topics = computed(() => Object.keys(store.state.topics));
const slug = slugify;

const selectedTopics = ref([]);
</script>

<style lang="scss" scoped>
.grid-topics {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
