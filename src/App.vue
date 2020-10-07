<template>
  <div class="main-container">
    <h2>Current Location:</h2>
    <template v-if="currentLocationWeatherData">
      <div class="current-weather">
        <h1>{{ currentLocationWeatherData.name }}</h1>
        <h2>
          {{ currentLocationWeatherData.weather[0].main }}
        </h2>
        <h3>
          {{ Math.round(currentLocationWeatherData.main.temp - 273.15) }}॰C
        </h3>
        <img
          :src="`https://openweathermap.org/img/wn/${currentLocationWeatherData.weather[0].icon}@2x.png`"
          alt=""
        />
        <p>{{ currentLocationWeatherData.weather[0].description }}</p>
      </div>
      <!-- <span>{{}}</span> -->
    </template>
    <p v-else>Getting your current Location..⏳</p>
  </div>
  <form class="search-container" @submit="onSubmit">
    <input
      class="form-control"
      placeholder="Search location.."
      type="text"
      v-model="location"
    />
    <button type="submit" class="search-btn">Search</button>
  </form>
  <template v-if="!loading">
    <Weather :weatherData="weatherData" />
  </template>
  <p v-else>Getting Weather Info..⏳</p>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import Weather from "./components/Weather.vue";
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
      weatherData,
      currentLocationWeatherData,
      loading,
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
  margin-bottom: 10px;
}
.search-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 15px;
}
.current-weather {
  border: 1px solid #000000;
  box-shadow: 2px 3px;
  width: 200px;
  border-radius: 4px;
  background-color: lightgreen;
}
.form-control {
  width: 300px;
  height: 30px;
  font-size: 1.5rem;
  margin-right: 10px;
  margin-bottom: 10px;
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
  margin-bottom: 10px;
}
.search-btn:hover {
  background-color: #286090;
  border-color: #204d74;
  color: #ffffff;
}
</style>
