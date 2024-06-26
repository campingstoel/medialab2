import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import index from "../styles";
import { signInUser } from "../data/authStore";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthStore } from "../data/authStore";

const { height } = Dimensions.get("window");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { initialized, isLoggedIn, user } = AuthStore.useState();

    const navigation = useNavigation();

    useEffect(() => {
    if (initialized && isLoggedIn) {
      navigation.navigate("Home");
    }
    }, [initialized]);


  const handleLogin = () => {
    if(signInUser(email, password)){
        navigation.navigate("Home");
      }
  };

  return (
    <View
      style={[
        index.fullWidth,
        index.wrapper,
        index.alignCenter,
        { height: height },
      ]}
    >
      <View
        style={[
          index.centered,
          index.fullWidth,
          index.padHor20,
          index.fullFlex,
          index.gap10,
        ]}
      >
        <Text
          style={[
            index.fullWidth,
            index.alignCenter,
            index.padHor20,
            { fontSize: 30 },
          ]}
        >
          SpotLight
        </Text>

        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder={"Email"}
          style={[
            index.fullWidth,
            index.br15,
            index.padHor20,
            { borderWidth: 2, borderColor: "black", height: 50 },
          ]}
        />
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder={"Password"}
          secureTextEntry={true}
          style={[
            index.fullWidth,
            index.br15,
            index.padHor20,
            { borderWidth: 2, borderColor: "black", height: 50 },
          ]}
        />
        <TouchableOpacity style={[index.fullWidth, index.row, index.br15, index.centered, {height:50, backgroundColor:'#146bab'}]} onPress={handleLogin}>
            <Text style={[{ fontSize: 20, color:'white' }]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[index.fullWidth, index.row, index.br15, index.centered, {height:50}]} onPress={() => navigation.navigate("Register")}>
            <Text style={[{ fontSize: 14, color:'black' }]}>No account yet?</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}
