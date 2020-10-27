export default function reverseGeocode({
  lon,
  lat,
}: {
  lon: number;
  lat: number;
}) {
  const googleSDK: any = (window as any).google;
  const OK = googleSDK.maps.GeocoderStatus.OK;

  const geocoder = new googleSDK.maps.Geocoder();

  // console.log({ lon, lat });
  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { location: { lat, lng: lon } },
      (results: any[], status: any) => {
        if (status === OK) {
          const result = results[0];
          const addressComponents: any[] = result.address_components;
          const cityComponent = addressComponents.find(
            (c) => c.types[0] === "administrative_area_level_1"
          );
          const city = cityComponent.long_name;
          const countryComponent = addressComponents.find(
            (c) => c.types[0] === "country"
          );
          const country = countryComponent.long_name;
          resolve({ city, country });
        } else {
          reject("An Error Occurred");
        }
      }
    );
  });
}
