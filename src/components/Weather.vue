<template>
  <div class="weather">
    <template v-if="errors">
      <p class="error">
        {{ errors }}
      </p>
    </template>
    <template v-else>
      <h1>{{ weatherData.name }}</h1>
      <h2>
        {{ weatherData.weather[0].main }}
      </h2>
      <img
        :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
        alt=""
      />
    </template>
  </div>
</template>

<script>
export default {
  props: ["weatherData", "errors"],
  setup({ weatherData, errors }) {
    console.log(errors);
    return {
      weatherData,
      errors,
    };
  },
};
</script>

<style scoped>
.weather {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.error {
  color: #ff0000;
  font-size: 1.5rem;
}
</style>
