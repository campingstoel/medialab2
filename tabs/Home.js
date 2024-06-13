import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import index from "../styles";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "react-native";
import MapView, { Heatmap, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { AuthStore } from "../data/authStore";
import { SwipeButton } from "@arelstone/react-native-swipe-button";

const { height } = Dimensions.get("window");

export default function Home() {
  const [warningAlert, setWarningAlert] = useState(false);
  const [emergencyAlert, setEmergencyAlert] = useState(false);
  const [location, setLocation] = useState(null);
  const { displayName } = AuthStore.useState();
  const [amountOfPeople, setAmountOfPeople] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);

  return (
    location && (
      <View
        style={[
          index.fullWidth,
          index.wrapper,
          index.alignCenter,
          { height: height },
        ]}
      >
        <StatusBar backgroundColor={`#146bab`} />

        <View
          style={[
            index.centered,
            index.fullWidth,
            index.padHor20,
            index.row,
            index.spaceBetween,
            { height: 100, backgroundColor: "#146bab" },
          ]}
        >
          <TouchableOpacity>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
          <Text style={[index.bold, { color: "white", fontSize: 20 }]}>
            Welkom {displayName}
          </Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={[
            index.fullWidth,
            index.row,
            index.spaceBetween,
            { height: "78%", backgroundColor: "red" },
          ]}
        >
          {warningAlert && (
            <View
              style={[
                index.fullWidth,
                index.centered,
                index.absolute,
                index.row,
                index.spaceBetween,
                {
                  backgroundColor: "rgba(255,255,255,1)",
                  padding: 20,
                  zIndex: 100,
                },
              ]}
            >
              <Ionicons name="alert-circle-outline" size={20} color="black" />
              <Text style={[index.text]}>
                Let op: Je bent bij een erg druk punt!
              </Text>
              <TouchableOpacity onPress={() => setWarningAlert(false)}>
                <Ionicons name="close" size={20} color="black" />
              </TouchableOpacity>
            </View>
          )}
                    {emergencyAlert && (
            <View
              style={[
                index.fullWidth,
                index.centered,
                index.absolute,
                index.column,
                index.spaceBetween,
                {
                  backgroundColor: "rgba(255,255,255,1)",
                  padding: 20,
                  zIndex: 100,
                  height:150,
                },
              ]}
            >
                <View style={[index.row]}>
              <Ionicons name="alert-circle-outline" size={20} color="black" />
              <Text style={[index.text]}>
                Let op: Je staat op het punt een noodoproep te doen.
              </Text>
                </View>
              <SwipeButton
                circleBackgroundColor="#a11212"
                underlayStyle={{ backgroundColor:'white'}}
                containerStyle={{ backgroundColor:'#d9d9d9', borderRadius: 50}}
                title="Noodoproep"
                titleStyle={[{ color: "black" }, index.bold]}
                onComplete={

                    () => {
                        Alert.alert("Noodoproep verzonden");
                        setEmergencyAlert(false);
                    }
                }
                />
            </View>
          )}

          <MapView
            style={[index.fullWidth, { height: "100%" }]}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.00222,
              longitudeDelta: 0.00221,
            }}
            showsUserLocation={true}
            provider="google"
          >
           {/* add heatmap to user location and around it. Make the heatmap at the user location itsself green and around it red add big red spots aswell */}
           <Heatmap
            points={[
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                weight: 1,
              },
              {
                latitude: location.coords.latitude + 0.0001,
                longitude: location.coords.longitude + 0.0001,
                weight: 1,
              },
              {
                latitude: location.coords.latitude + 0.0001,
                longitude: location.coords.longitude - 0.0001,
                weight: 1,
              },
              {
                latitude: location.coords.latitude - 0.0001,
                longitude: location.coords.longitude + 0.0001,
                weight: 1,
              },
              {
                latitude: location.coords.latitude - 0.0001,
                longitude: location.coords.longitude - 0.0001,
                weight: 1,
              },
              
            
            ]}
            radius={40}
            gradient={{
              colors: amountOfPeople > 0 ? ["green", "red"] : ["red", "green"],
              startPoints: [0.1, 0.8],
              colorMapSize: 256,
            }}
          />
          </MapView>
          <View
            style={[
              index.fullWidth,
              index.absolute,
              index.column,
              index.alignEnd,
              index.gap20,
              {
                backgroundColor: "rgba(151,184,208,0.8)",
                height: 170,
                padding: 20,
                bottom: 0,
                zIndex: 100,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                index.pad10,
                index.br10,
                index.centered,
                { backgroundColor: "white", height: 50, maxWidth: 120 },
              ]}
                onPress={() => setEmergencyAlert(true)}
            >
              <Text
                style={[
                  index.text,
                  index.bold,
                  { color: "#9c1414", fontSize: 14 },
                ]}
              >
                Meld ongeval
              </Text>
            </TouchableOpacity>
            <KeyboardAvoidingView
              style={[
                index.row,
                index.fullWidth,
                index.centered,
                index.br10,
                { backgroundColor: "white", height: 50 },
              ]}
            >
              <Ionicons
                name="search"
                size={20}
                style={{ position: "absolute", left: 10 }}
                color="#083f66"
              />
              <TextInput
                placeholder="Zoek"
                placeholderTextColor={"#083f66"}
                style={[index.fullWidth, { paddingHorizontal: 40 }]}
              />
            </KeyboardAvoidingView>
          </View>
        </View>
        <View
          style={[
            index.fullFlex,
            index.fullWidth,
            index.pad20,
            index.row,
            index.spaceBetween,
            { backgroundColor: "#146bab" },
          ]}
        >
          <TouchableOpacity
            style={[
              index.br10,
              index.centered,
              { backgroundColor: "white", width: "45%" },
            ]}
          >
            <Ionicons name="paper-plane" size={30} color="#083f66" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              index.br10,
              index.centered,
              { backgroundColor: "white", width: "45%" },
            ]}
          >
            <Ionicons
              name="chatbox-ellipses-outline"
              size={30}
              color="#083f66"
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}
