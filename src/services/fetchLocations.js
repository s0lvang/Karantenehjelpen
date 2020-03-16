/* eslint-disable import/prefer-default-export */
import axios from "axios";

export default async function fetchLocation(location) {
  return axios
    .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`, {
      params: {
        access_token: process.env.VUE_APP_MAPBOX_TOKEN,
        language: "no",
        country: "no",
        autocomplete: true
      }
    })
    .then(response => response.data.features)
    .catch(error => console.log(error));
}
