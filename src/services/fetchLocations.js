/* eslint-disable import/prefer-default-export */
import axios from "axios";

export default async function fetchLocation(location) {
  return axios
    .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`, {
      params: {
        access_token:
          "pk.eyJ1IjoiYWRyaWFuaHQiLCJhIjoiY2s3dWw4M3Y0MTA4NjNmcGdrM3M5c2prOSJ9.zVaLZPgkz7K-J_zPiXS08w",
        language: "no",
        country: "no",
        autocomplete: true
      }
    })
    .then(response => response.data.features)
    .catch(error => console.log(error));
}
