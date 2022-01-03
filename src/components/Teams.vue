<template>
  <ui-card v-ripple outlined class="p-4 relative">
    <h2 class="m-0 mb-4" v-text="team.name" />
    Punktzahl:
    <strong v-text="team.score" />
    <ui-button class="del" @click="$store.commit('removeTeam', team.name)">
      X
    </ui-button>
  </ui-card>
</template>

<script>
export default {
  props: {
    team: { type: Object, default: () => ({ name: '', score: '' })},
    number: { type: Number, default: null },
  },
};
</script>

<style lang="scss" scoped>
.del {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
