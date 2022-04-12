<template>
  <a :href="event.url" target="_blank" rel="noopener noreferrer">
    <button>Buy Ticket</button>
  </a>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@use "./../assets/styles/var.scss";

button {
  padding: 0.5rem;
  font-size: 14px;
  border-radius: 8px;
  outline: none;
  border: 2px solid var.$purple;
  color: var.$purple;
  background: var.$white;
}
@media screen and (min-width: 458px) {
  button {
    margin-top: 0;
  }
}

@media screen and (min-width: 600px) {
  button {
    font-size: 16px;
  }
}
</style>
