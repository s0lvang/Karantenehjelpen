/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export async function fetchLocation(location) {
  return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`, {
    params: {
      access_token: 'pk.eyJ1IjoiYWRyaWFuaHQiLCJhIjoiY2s3c3dpeWtrMHR6cTNobXZxZDNjc2l4biJ9.zNJjCC7o0UmLMKv9mx93FQ',
      language: 'no',
      country: 'no',
      autocomplete: true,
    },
  })
    .then((response) => response.data.features)
    .catch((error) => console.log(error));
}
