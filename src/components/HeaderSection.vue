<template>
  <div class="d-flex align-center justify-between">
    <span class="fs-1_5 text-bold">Events</span>
    <div class="d-flex align-center">
      <img src="@/assets/img/avatar.svg" class="mr-1" alt="Avatar" />
      <span class="mr-1">Bernice</span>
      <img class="arrow" src="@/assets/img/arrow.svg" alt="Avatar" />
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.arrow {
  background: #eaedf7;
  padding: 0.5rem;
  border-radius: 8px;
  transform: rotate(0deg);
  transition: transform 1s;

  &:hover {
    transform: rotate(180deg);
  }
}
</style>
