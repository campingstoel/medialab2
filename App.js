import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import Index from "./tabs/Index";




export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/kaas-bold.ttf'),
    'Poppins-Regular': require('./assets/kaas-regular.ttf'),
    'Poppins-SemiBold': require('./assets/Poppins-Medium.ttf')
});

return  fontsLoaded ? 
   <Index />
  :

null  ; 

}
