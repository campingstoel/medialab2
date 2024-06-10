import React, { useState } from "react";
import { View, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import index from "../styles";
import { registerUser } from "../data/authStore";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
    const navigation = useNavigation();

  const handleRegister = () => {
    if(email === "" || password === "" || fullName === ""){
      return Alert.alert("Please fill in all fields");
    }

    if(registerUser(email, password, fullName)){
      navigation.navigate("Login");
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
          value={fullName}
          onChangeText={(fullName) => setFullName(fullName)}
          placeholder={"Full Name"}
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
        <TouchableOpacity style={[index.fullWidth, index.row, index.br15, index.centered, {height:50, backgroundColor:'#146bab'}]} onPress={handleRegister}>
            <Text style={[{ fontSize: 20, color:'white' }]}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[index.fullWidth, index.row, index.br15, index.centered, {height:50}]} onPress={() => navigation.navigate("Login")}>
            <Text style={[{ fontSize: 14, color:'black' }]}>Already have an account?</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}
