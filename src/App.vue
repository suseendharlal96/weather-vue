<template>
  <div class="main-container">
    <template v-if="currentLocationWeatherData">
      <h1>{{ currentLocationWeatherData.name }}</h1>
      <h2>
        {{ currentLocationWeatherData.weather[0].main }}
      </h2>
      <img
        :src="`https://openweathermap.org/img/wn/${currentLocationWeatherData.weather[0].icon}@2x.png`"
        alt=""
      />
      <!-- <span>{{}}</span> -->
    </template>
    <p v-else>loading...</p>
  </div>
  <form class="search-container" @submit="onSubmit">
    <input
      class="form-control"
      placeholder="Search location.."
      type="text"
      v-model="location"
    />
    <button type="submit" class="search-btn" @click="search">Search</button>
  </form>
  <template v-if="!loading">
    <template v-if="weatherData">
      <Weather :weatherData="weatherData" :errors="errors" />
    </template>
  </template>
  <p v-else>Getting Weather Info..⏳</p>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import Weather from "./components/Weather.vue";
import { baseURL } from "./baseUrl.js";
export default {
  name: "App",
  setup() {
    const store = useStore();
    const location = ref("");

    const weatherData = computed(() => store.getters.getCurrentWeather);
    const currentLocationWeatherData = computed(
      () => store.getters.getCurrentLocationWeather
    );
    const loading = computed(() => store.getters.getLoading);
    const errors = computed(() => store.getters.getErrors);

    const search = () => {
      store.dispatch("getCurrentWeather", { location: location.value });
    };
    const onSubmit = (e) => {
      e.preventDefault();
      store.dispatch("getCurrentWeather", { location: location.value });
    };

    onMounted(() => {
      const showPosition = (position) => {
        store.dispatch("getCurrentLocationWeather", {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      };
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert("Allow location access");
      }
    });
    return {
      location,
      search,
      weatherData,
      currentLocationWeatherData,
      loading,
      errors,
      onSubmit,
    };
  },
  components: {
    Weather,
  },
};
</script>
<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
.form-control {
  width: 300px;
  height: 30px;
  font-size: 1.5rem;
}
input::after {
  content: "*";
  position: absolute;
  color: #ff0000;
}
.form-control:focus {
  background-color: lightblue;
}
.search-btn {
  padding: 5px;
  background-color: #2e6da4;
  border-color: #2e6da4;
  width: 300px;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
}
.search-btn:hover {
  background-color: #286090;
  border-color: #204d74;
  color: #ffffff;
}
</style>
