<template>
  <div class="d-flex align-center">
    <img src="@/assets/img/search.svg" alt="" />
    <input
      type="search"
      placeholder="Search by artist name"
      :value="modelValue"
      @input="enterValue($event)"
    />
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const emits = defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: String,
  },
});

const enterValue = (e) => {
  emits("update:modelValue", e.target.value);
};
</script>

<style lang="scss" scoped>
div {
  margin-top: 1.5rem;
}

input {
  padding: 0.75rem;
  padding-left: 2rem;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  outline: none;
  width: 100%;
}

img {
  position: absolute;
  padding-left: 1rem;
  margin-top: -1px;
}

::placeholder {
  color: #6c757d;
}

@media screen and (min-width: 567px) {
  input {
    width: 50%;
  }
}

@media screen and (min-width: 992px) {
  input {
    width: 35%;
  }
}
</style>
