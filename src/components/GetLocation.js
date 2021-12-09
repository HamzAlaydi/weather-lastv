import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { cityState } from "../recoil/atom/cityAtom";
import React from "react";

const GetLocation = () => {
  const [city, setCity] = useRecoilState(cityState);

  const POSITIONSTACK_API_URL = "http://api.positionstack.com";
  const POSITIONSTACK_VERSION = "v1";
  const POSITIONSTACK_KEY = "61d20e9d297b7c98bad348ac29cdff2d";
  const POSITIONSTACK_ENDPOINT = `${POSITIONSTACK_API_URL}/${POSITIONSTACK_VERSION}/reverse?access_key=${POSITIONSTACK_KEY}`;

  function main() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function getPositionCallOnSuccess(pos) {
      const crd = pos.coords;

      // console.log("Your current position is:");
      // console.log(`Latitude : ${crd.latitude}`);
      // console.log(`Longitude: ${crd.longitude}`);

      // console.log(`Now using positionstack api to get city`);

      fetch(
        `${POSITIONSTACK_ENDPOINT}&query=${crd.latitude},${crd.longitude}&output=json`
      )
        .then((response) => {
          response.json().then(({ data }) => {
            // if (!data || data.length === 0)
            // //   console.warn("ERROR no data found for given coordinates");
            // console.log(read_cookie("City"));

            let name = data[0].region.split(" ");
            let n = name[0];
            let cityfromLocation = n;
            setCity(cityfromLocation);
          });
        })
        .catch((error) => {
          console.warn("ERROR ", error.message);
        });
    }

    function getPositionCallOnError(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(
      getPositionCallOnSuccess,
      getPositionCallOnError,
      options
    );
  }
  useEffect(() => {
    main();
  }, []);
  return <div></div>;
};

export default GetLocation;
