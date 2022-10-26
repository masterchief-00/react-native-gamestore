import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./navigation/BottomNavigation";
import GameDetails from "./screens/GameDetails";
import Greetings from "./screens/Greetings";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Greet"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Greet" component={Greetings} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="BottomTabs" component={BottomNavigation} />
        <Stack.Screen name="Details" component={GameDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
