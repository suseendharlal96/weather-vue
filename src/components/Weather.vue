<template>
  <div class="weather">
    <template v-if="errors">
      <p class="error">
        {{ errors }}
      </p>
    </template>
    <template v-else-if="weatherData">
      <div class="options">
        <span
          @click="changeMode('current')"
          :class="isSelected === 'current' ? 'active' : ''"
          >Current</span
        >
        <span
          @click="changeMode('forecast')"
          :class="isSelected === 'forecast' ? 'active' : ''"
          >Forecast(3 days for every 3 hrs)</span
        >
      </div>
      <div v-if="isSelected === 'current'" class="weather-card">
        <h1>{{ weatherData.name }}</h1>
        <h2>
          {{ weatherData.weather[0].main }}
        </h2>
        <h3>{{ Math.round(weatherData.main.temp - 273.15) }}॰C</h3>
        <img
          :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
          alt=""
        />
        <p>{{ weatherData.weather[0].description }}</p>
      </div>
      <template v-else-if="!foreCastLoading">
        <div class="forecast-container">
          <template
            v-for="(foreCastItem, index) in foreCast && foreCast.list"
            :key="index"
          >
            <Forecast :foreCastItem="foreCastItem" />
          </template>
        </div>
      </template>
      <p v-else>Getting forecast data..⏳</p>
    </template>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import Forecast from "./Forecast.vue";

export default {
  props: ["weatherData"],

  setup({ weatherData }) {
    const store = useStore();
    const isSelected = ref("current");

    const foreCast = computed(() => store.getters.getForecast);
    const foreCastLoading = computed(() => store.getters.getForecastLoading);
    const errors = computed(() => store.getters.getErrors);

    const changeMode = (mode) => {
      isSelected.value = mode;
      if (isSelected.value === "forecast") {
        store.dispatch("getForecast", weatherData.name);
      }
    };

    return {
      weatherData,
      errors,
      changeMode,
      isSelected,
      foreCast,
      foreCastLoading,
    };
  },
  components: {
    Forecast,
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
.weather-card {
  border: 1px solid #000000;
  width: 200px;
  box-shadow: 2px 3px;
  border-radius: 4px;
  background-color: lightskyblue;
}
.options {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 15px;
  flex-wrap: wrap;
}
span {
  display: inline-block;
  cursor: pointer;
  font-size: 1.5rem;
  margin-bottom: 5px;
}
span.active {
  border-bottom: 2px solid #2e6da4;
}
.error {
  color: #ff0000;
  font-size: 1.5rem;
}
.forecast-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
