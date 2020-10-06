import { createStore } from "vuex";
import axios from "axios";

import { baseURL, API } from "../src/baseUrl";

export const store = createStore({
  state: {
    currentWeather: null,
    currentLocationWeather: null,
    loading: false,
    errors: null,
  },
  getters: {
    getCurrentWeather: (state) => state.currentWeather,
    getCurrentLocationWeather: (state) => state.currentLocationWeather,
    getLoading: (state) => state.loading,
    getErrors: (state) => state.errors,
  },
  mutations: {
    setCurrentWeather: (state, data) => {
      console.log(data);
      state.currentWeather = data;
      console.log(state.currentWeather);
    },
    setCurrentLocationWeather: (state, data) => {
      console.log(data);
      state.currentLocationWeather = data;
    },
    setLoading: (state, loading) => {
      state.loading = loading;
    },
    setErrors: (state, errors) => {
      console.log(errors);
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
        console.log(error.response);
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
        console.log(error.response);
      }
    },
  },
});
