<template>
  <div id="app">
    <the-header />
    <the-content style="flex-grow: 1;">
      <number-pattern-solver />
    </the-content>
    <the-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import TheHeader from '@/components/TheHeader.vue';
import TheContent from '@/components/TheContent.vue';
import TheFooter from '@/components/TheFooter.vue';

import NumberPatternSolver from './views/NumberPatternSolver.vue';

export default Vue.extend({
  name: 'App',
  components: {
    TheHeader,
    TheContent,
    TheFooter,
    NumberPatternSolver,
  },
});
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;

  min-height: 100vh;
}
</style>
