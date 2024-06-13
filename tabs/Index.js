import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Login from "./Login";
import Info from "./Info";
import Register from "./Register";
import Home from "./Home";
import Notifications from "./Notifications"; 

import Ticket from "./Ticket";


const Stack = createStackNavigator();

export default function Index() {
  return (

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
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
          <Stack.Screen
            name="Info"
            component={Info}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Ticket"
            component={Ticket}
            options={{ headerShown: false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
