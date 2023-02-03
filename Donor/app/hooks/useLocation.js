import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [location, setLocation] = useState();
  const [isPemited, setIsPermited] = useState(true);

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return setIsPermited(false);
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      setIsPermited(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, isPemited };
};

export default useLocation;
