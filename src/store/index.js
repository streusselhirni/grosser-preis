import { createStore } from 'vuex';
import questions from '../questions';

export default createStore({
  state: {
    teams: [],
    questions,
  },
  mutations: {
    addTeam(state, payload) {
      state.teams.push({
        name: payload,
        score: 0,
      });
    },
    removeTeam(state, payload) {
      const idx = state.teams.findIndex((t) => t.name === payload);
      if (idx > -1) {
        state.teams.splice(idx, 1);
      }
    },
    addPoints(state, payload) {
      const team = state.teams.find((t) => t.name === payload.name);
      if (team) {
        team.score += payload.points;
      }
      state.teams.sort((a, b) => {
        if (a.score > b.score) return -1;
        return 1;
      });
    },
    questionAnswered(state, payload) {
      const question = state.questions[payload.subject].find((q) => q.question === payload.question.question);
      console.log(question, state.questions[payload.subject]);
      if (question) {
        question.answered = true;
      }
    }
  },
  actions: {
  },
  modules: {
  }
});
