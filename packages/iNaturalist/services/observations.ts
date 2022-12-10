import Constants from "../utils/constants";

interface FetchObservationsParams {
  taxon_id: number;
  lng: number;
  lat: number;
  radius: number;
  locale?: keyof typeof Constants.locale;
}

export const fetchObservations = ({
  taxon_id,
  lng,
  lat,
  radius,
  locale = Constants.locale.es,
}: FetchObservationsParams) => {
  const paramsObj = Object.entries({
    taxon_id,
    lng,
    lat,
    radius,
    locale,
  })
    .map(([key, value]) => ({
      [key]: String(value),
    }))
    .reduce((obj, item) => Object.assign(obj, item), {});

  const searchParams = new URLSearchParams(paramsObj);
  return fetch(
    Constants.API_URL +
      Constants.OBSERVATIONS_URL +
      "?" +
      searchParams.toString(),
  );
};
