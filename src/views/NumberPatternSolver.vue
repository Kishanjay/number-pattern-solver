<template>
  <div class="wrapper">
    <div class="field">
      <div class="control">
        <input
          v-model="patternInputString"
          class="input is-large"
          type="text"
          placeholder="Number pattern e.g.: 1, 2, 4, 8"
        >
      </div>
    </div>

    <div class="section">
      <h1 class="title is-3">
        {{ patternInput.join(', ') }} => {{ patternPrediction }}
      </h1>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

import NPService, { Pattern } from '@/services/NumberPatternService';

export default Vue.extend({
  data() {
    return {
      patternInputString: '1,2,3,4',
      patternInput: [] as number[],
      patternPrediction: null,
    };
  },
  watch: {
    patternInputString() {
      if (!this.patternInputString) { return; }
      const patternInput = NPService.stringToPattern(this.patternInputString);

      this.computePattern(patternInput);
    },
  },
  created() {
    const patternInput = NPService.stringToPattern(this.patternInputString);
    this.computePattern(patternInput);
  },
  methods: {
    computePattern(patternInput: number[]) {
      this.patternPrediction = null;

      this.patternInput = patternInput;

      const result: Pattern | undefined = NPService.solve(patternInput);
      console.log({ result });

      if (result) {
        (this.patternPrediction as unknown as number) = NPService.predictNext(result);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 12px;
}
</style>
