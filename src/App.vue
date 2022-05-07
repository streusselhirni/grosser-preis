<template>
  <div>
    <div ref="backdrop" class="backdrop" @click="closeModals"/>
    <header>
      <h1>Großer Preis</h1>
      <ui-button type="outlined" @click="openModal">
        Team erfassen
      </ui-button>
      <ui-button type="outlined" @click="openResetModal">
        Neu starten
      </ui-button>
    </header>

    <main>
      <div class="teams">
        <teams v-for="(team, i) in $store.state.teams" :key="team.name" :team="team" :number="i"/>
      </div>
      <topics v-if="Object.keys(store.state.questions).length === 0" />
      <questions v-else @openQuestion="openQuestion"/>
    </main>

    <div ref="addTeamModal" class="small modal">
      <form @submit.prevent="addTeam">
        <h2>Team hinzufügen</h2>
        <hr>
        <ui-textfield
            type="filled"
            v-model="teamName"
            label="Name"
            fullwidth
        />
        <div class="text-right mt-8">
          <ui-button :type="0" native-type="submit">
            Hinzufügen
          </ui-button>
        </div>
      </form>
    </div>

    <div ref="questionModal" class="modal">
      <div v-if="currentQuestion">
        <h2 class="font-base">
          {{ currentQuestion.subject }}
          für
          {{ currentQuestion.question.score }}
          Punkte:
        </h2>
        <h1 v-text="currentQuestion.question.question" />
        <div
            class="team-buttons"
            :style="'grid-template-columns: repeat(' + $store.state.teams.length + ', minmax(0, 1fr));'"
        >
          <template v-for="team in $store.state.teams" :key="'answer-team' + team.name">
            <div v-text="team.name"/>
            <ui-button :type="3" @click="addPoints(team.name)">
              Volle Punktzahl
            </ui-button>
            <ui-button :type="3" @click="addPoints(team.name, false)">
              Halbe Punktzahl
            </ui-button>
          </template>
        </div>
      </div>
    </div>

    <div ref="resetModal" class="small modal">
      <form @submit.prevent="() => { store.commit('resetStore'); closeModals(); sureToRestart = false; }">
        <h2>Bist du sicher, dass du neu starten möchtest?</h2>
        <hr>
        <ui-form-field>
          <ui-checkbox
              type="filled"
              v-model="sureToRestart"
              input-id="restartCheckbox"
          />
          <label for="restartCheckbox">Yes</label>
        </ui-form-field>
        <div class="text-right mt-8">
          <ui-button class="btn-red" :disabled="!sureToRestart" :type="0" native-type="submit">
            Neustart
          </ui-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Teams from './components/Teams';
import Questions from './components/Questions';
import Topics from './components/Topics';

const store = useStore();
const addTeamModal = ref(null);
const questionModal = ref(null);
const resetModal = ref(null);
const backdrop = ref(null);
const teamName = ref('');
const currentQuestion = ref(null);
const sureToRestart = ref(false);

const openModal = () => {
  addTeamModal.value.classList.toggle('open');
  backdrop.value.classList.toggle('open');
};

const openQuestion = (payload) => {
  currentQuestion.value = payload;
  questionModal.value.classList.toggle('open');
  backdrop.value.classList.toggle('open');
};

const openResetModal = () => {
  resetModal.value.classList.toggle('open');
  backdrop.value.classList.toggle('open');
}

const closeModals = () => {
  addTeamModal.value.classList.remove('open');
  questionModal.value.classList.remove('open');
  resetModal.value.classList.remove('open');
  backdrop.value.classList.remove('open');
}

const addTeam = () => {
  store.commit('addTeam', teamName.value);
  teamName.value = '';
  openModal();
};

const addPoints = (teamName, fullPoints = true) => {
  const points = fullPoints ? currentQuestion.value.question.score : currentQuestion.value.question.score / 2;
  store.commit('addPoints', { name: teamName, points });
  store.commit('questionAnswered', currentQuestion.value);
  closeModals();
};
</script>

<style lang="scss">
main {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 5rem;
  padding-left: 2rem;
  padding-right: 2rem;
}

header {
  background-color: var(--color-green);
  color: white;
  height: 4rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.backdrop {
  pointer-events: none;
  opacity: 0;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 50;

  &.open {
    pointer-events: all;
    opacity: 1;
  }
}

.modal {
  z-index: 100;
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 1rem;
  background-color: white;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.4);
  top: -100%;
  opacity: 0;
  pointer-events: none;

  &.small {
    width: 400px;
    height: 300px;
  }

  &.open {
    top: 50%;
    opacity: 1;
    pointer-events: all;
  }
}

.teams {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 2rem;
  margin-bottom: 4rem;
}

.team-buttons {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
  margin-bottom: 1rem;

  div {
    min-width: 250px;
    align-self: flex-end;
  }
}

.btn-red:not(:disabled) {
  color: var(--color-red) !important;
}
</style>
