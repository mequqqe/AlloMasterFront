<script lang="ts" setup>
const sliderValues = ref([10, 60]);
</script>

<template>
  <VRangeSlider v-model="sliderValues" color="success" track-color="warning" />
</template>
