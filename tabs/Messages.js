import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { inAppMessaging } from "./firebaseConfig";

export default function App() {
  useEffect(() => {
    inAppMessaging.onMessage((message) => {
      console.log("In-App Message:", message);
    });
  }, []);

  return (
    <View>
      <Text>Messages</Text>
    </View>
  );
}
