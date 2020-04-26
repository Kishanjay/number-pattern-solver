<template>
  <nav
    class="navbar is-primary"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a
        class="navbar-item"
        href="/"
      >
        <h1
          class="title is-4"
          style="color: white;"
        >
          Number pattern solver
          <span class="subtitle is-6">v{{ $root.version }}</span>
        </h1>
      </a>
    </div>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

});
</script>
