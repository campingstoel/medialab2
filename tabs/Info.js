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
import { signInUser, updateLocationInFirestore } from "../data/authStore";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "react-native";
import MapView, { Heatmap, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { AuthStore } from "../data/authStore";
import { SwipeButton } from "@arelstone/react-native-swipe-button";
import { Image } from "react-native";

const { height } = Dimensions.get("window");

export default function Info() {
    const { displayName } = AuthStore.useState();
    const [sideBarLeftActive, setSideBarLeftActive] = useState(false);
    const [sideBarRightActive, setSideBarRightActive] = useState(false);
    const navigation = useNavigation();

  return (
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
          <TouchableOpacity onPress={
            () => setSideBarLeftActive(!sideBarLeftActive)
          }>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={[index.bold, { color: "white", fontSize: 20 }]}>
            Welkom {displayName}
          </Text>
            </TouchableOpacity> 
          <TouchableOpacity
            onPress={() => setSideBarRightActive(!sideBarRightActive)}
          >
            <Ionicons name="settings-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
        {sideBarLeftActive && (
          <View
            style={[
              index.absolute,
              index.padHor10,
              index.padVer20,
              index.gap5,
              
         
              { height: '100%', backgroundColor: "white", width:'80%', top:100, zIndex:100, left:0 },
            ]}
          >
            <Text style={[index.bold, { color: "black", fontSize: 15 }]}>
              Tickets
            </Text>
            <Text style={[index.bold, { color: "black", fontSize: 15 }]}>
              Info
            </Text>
            <Text style={[index.bold, { color: "black", fontSize: 15 }]}>
              Account
            </Text>
            <Text style={[index.bold, { color: "black", fontSize: 15 }]}>
              FAQ
              </Text>
            </View>
        )

          }
        {sideBarRightActive && (
          <View
            style={[
              index.absolute,
              index.padHor10,
              index.padVer20,
              index.gap10,
              { height: '100%', backgroundColor: "white", width:'80%', top:100, zIndex:100, right:0 },
            ]}
          >
            <Text style={[index.bold, { color: "black", fontSize: 13 }]}>
              Dark mode
            </Text>
            <Text style={[index.bold, { color: "black", fontSize: 13 }]}>
              Leesbaarheid
            </Text>
            <Text style={[index.bold, { color: "black", fontSize: 13 }]}>
              Kleurenthema's
            </Text>
            <Text style={[index.bold, { color: "black", fontSize: 13 }]}>
              Meldingen
            </Text>
            <Text style={[index.bold, { color: "black", fontSize: 13 }]}>
              Privacy
            </Text>
          </View>
        )}

    <Image source={require('../assets/image.png')} style={{resizeMode:'contain', height:'78%', width:'100%', objectFit:'fill'}} />


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
    
  );
}
