import { createStore } from "vuex";
import axios from "axios";

import { baseURL, API } from "../baseUrl";

export const store = createStore({
  state: {
    currentWeather: null,
    currentLocationWeather: null,
    loading: false,
    forecastLoading: false,
    errors: null,
    forecast: null,
  },
  getters: {
    getCurrentWeather: (state) => state.currentWeather,
    getCurrentLocationWeather: (state) => state.currentLocationWeather,
    getForecast: (state) => state.forecast,
    getForecastLoading: (state) => state.forecastLoading,
    getLoading: (state) => state.loading,
    getErrors: (state) => state.errors,
  },
  mutations: {
    setCurrentWeather: (state, data) => {
      state.currentWeather = data;
    },
    setCurrentLocationWeather: (state, data) => {
      state.currentLocationWeather = data;
    },
    setForecast: (state, data) => {
      state.forecast = data;
    },
    setLoading: (state, loading) => {
      state.loading = loading;
    },
    setForecastLoading: (state, loading) => {
      state.forecastLoading = loading;
    },
    setErrors: (state, errors) => {
      state.errors = errors;
    },
  },
  actions: {
    getCurrentWeather: async ({ commit }, { location }) => {
      commit("setLoading", true);
      commit("setErrors", null);
      try {
        const res = await axios.get(`${baseURL}?q=${location}&appid=${API}`);
        commit("setLoading", false);
        commit("setCurrentWeather", res.data);
      } catch (error) {
        commit("setLoading", false);
        commit("setErrors", error.response.data.message);
      }
    },
    getCurrentLocationWeather: async ({ commit }, { lat, lon }) => {
      commit("setErrors", null);
      try {
        const res = await axios.get(
          `${baseURL}?lat=${lat}&lon=${lon}&appid=${API}`
        );
        commit("setCurrentLocationWeather", res.data);
      } catch (error) {
        commit("setErrors", error.response.data.message);
      }
    },
    getForecast: async ({ commit }, location) => {
      commit("setErrors", null);
      commit("setForecastLoading", true);
      const forecast = "https://api.openweathermap.org/data/2.5/forecast";
      try {
        const res = await axios.get(
          `${forecast}?q=${location}&cnt=16&appid=${API}`
        );
        commit("setForecastLoading", false);
        commit("setForecast", res.data);
      } catch (error) {
        commit("setForecastLoading", false);
        commit("setErrors", error.response.data.message);
      }
    },
  },
});
