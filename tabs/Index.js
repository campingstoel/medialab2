import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView />
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
                    <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>  
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
