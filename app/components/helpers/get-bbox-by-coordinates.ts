import { LngLatBounds } from "@yandex/ymaps3-types";

export const getBboxByCoordinates = (
  coordinates: number[][]
): LngLatBounds | undefined => {
  if (coordinates.length === 0) return;

  let minLongitude = coordinates[0]?.[0];
  let minLatitude = coordinates[0]?.[1];
  let maxLongitude = coordinates[0]?.[0];
  let maxLatitude = coordinates[0]?.[1];

  for (const [longitude, latitude] of coordinates) {
    if (longitude < minLongitude) minLongitude = longitude;
    if (latitude < minLatitude) minLatitude = latitude;

    if (longitude > maxLongitude) maxLongitude = longitude;
    if (latitude > maxLatitude) maxLatitude = latitude;
  }

  return [
    [minLongitude, minLatitude],
    [maxLongitude, maxLatitude],
  ];
};
