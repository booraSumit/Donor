import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { StyleSheet, View } from "react-native";

function Map(props) {
  Geocoder.init("AIzaSyCN7Um7h5bWeBRJvR0_a1DLbBBdILbvKgk");

  const [region, setRegion] = useState({
    latitude: 1,
    longitude: 1,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const requestPermission = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) alert("you need to enable location");
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    setRegion({
      ...region,
      latitude: latitude,
      longitude: longitude,
    });
  };
  Geocoder.from(region.latitude, region.longitude)
    .then((json) => {
      var addressComponent = json.results[0].address_components[0];
      console.log(addressComponent);
    })
    .catch((error) => console.warn(error));

  useEffect(() => {
    requestPermission();
  }, []);
  console.log("region", region);

  const onPress = (e) => {
    setRegion({
      ...region,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  };

  const onDragEnd = (e) => {
    setRegion({
      ...region,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={region}
        region={region}
        zoomEnabled={true}
        zoomControlEnabled={true}
        provider="google"
        onPress={onPress}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          draggable={true}
          onDragEnd={onDragEnd}
          title="you're here"
        />
      </MapView>
    </>
  );
}
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
