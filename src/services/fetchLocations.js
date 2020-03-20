const prepareParams = obj =>
  Object.keys(obj)
    .map(k => `${k}=${encodeURIComponent(obj[k])}`)
    .join("&");

const params = {
  access_token: process.env.VUE_APP_MAPBOX_TOKEN,
  language: "no",
  country: "no",
  autocomplete: true
};

export default async function fetchLocation(location) {
  try {
    const resp = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?${prepareParams(
        params
      )}`
    );
    return (await resp.json()).features;
  } catch (err) {
    console.error(err);
    return null;
  }
}
