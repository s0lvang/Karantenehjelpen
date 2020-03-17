/**
 * This routine calculates the distance between two points.
 *
 * @author GeoDataSource.com (C) All Rights Reserved 2018
 * @param {number} lat1 Latitude position 1
 * @param {number} lon1 Longitude position 1
 * @param {number} lat2 Latitude position 2
 * @param {number} lon2 Longitude position 2
 * @param {'K' | 'M' | 'N'} unit Measurement unit. 'M' is statute miles. 'K' is kilometers. 'N' is nautical miles.
 */
export default function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }

  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === "K") {
    dist *= 1.609344;
  }
  if (unit === "N") {
    dist *= 0.8684;
  }
  return dist;
}
