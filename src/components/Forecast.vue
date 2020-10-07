<template>
  <div class="forecast-card">
    <h2>
      {{ foreCastItem.weather[0].main }}
    </h2>
    <h3>{{ Math.round(foreCastItem.main.temp - 273.15) }}॰C</h3>
    <p>{{ foreCastItem.dt_txt }}</p>
    <img
      :src="`https://openweathermap.org/img/wn/${foreCastItem.weather[0].icon}@2x.png`"
      alt=""
    />
    <p>{{foreCastItem.weather[0].description}}</p>
  </div>
</template>

<script>
export default {
  props: ["foreCastItem"],
  setup({ foreCastItem }) {
    return {
      foreCastItem,
    };
  },
};
</script>

<style scoped>
.forecast-card {
  border: 1px solid #000000;
  border-radius: 4px;
  box-shadow: 2px 3px;
  width: 250px;
  margin: 0px 10px 10px 0;
  background-color: lightskyblue;
}
</style>
