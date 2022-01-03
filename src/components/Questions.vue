<template>
  <div class="questions" :style="'grid-template-columns: repeat(' + subjects.length + ', minmax(0, 1fr));'">
    <div
        v-for="subject in subjects"
        :key="subject"
        class="subjects"
    >
      <div class="subject">
        {{ subject }}
      </div>
      <ui-card
          v-for="question in questions[subject]"
          :key="question"
          :class="{ answered: question.answered }"
          class="question"
      >
        <div v-ripple @click="$emit('openQuestion', { subject, question })" v-text="question.score" />
      </ui-card>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();

    const questions = computed(() => store.state.questions);
    const subjects = Object.keys(questions.value);

    return {
      questions,
      subjects,
    };
  }
};
</script>

<style lang="scss" scoped>
.questions,
.subjects {
  display: grid;
  grid-gap: 2rem;
}

.subjects {
  grid-template-rows: repeat(5, minmax(0, 1fr));
}

.subject {
  display: flex;
  align-items: flex-end;
  font-weight: bold;
}

.question {
  height: 4rem;

  div {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    font-weight: bold;
  }

  &.answered div {
    background-color: rgb(0, 0, 0, .3);
    pointer-events: none;
    font-weight: normal;
  }
}
</style>
