import React from "react";
import MapView, { Heatmap, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function Map() {
  const HeatPoints = [
    { latitude: 51.926517, longitude: 4.472456, weight: 1 },
    { latitude: 51.926517, longitude: 4.462456, weight: 1 },
  ];

  <MapView
    style={styles.map}
    provider={PROVIDER_GOOGLE}
    region={{
      latitude: 51.926517,
      longitude: 4.462456,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    }}
  >
    <Heatmap
      points={HeatPoints}
      gradient={{
        colors: ["#79BC6A", "#BBCF4C", "#EEC20B", "#F29305", "#E50000"],
        startPoints: [0, 0.25, 0.5, 0.75, 1],
        colorMapSize: 500,
      }}
    ></Heatmap>
  </MapView>;
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
