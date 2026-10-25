import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "./constants";
import WordsNavigation from "./components/WordsNavigation";
import LearningNavigation from "./components/LearningNavigation";
import Settings from "./screens/Settings";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={COLORS.appBackground} barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.appBackground },
            headerTintColor: COLORS.primary900,
            headerTitleAlign: "center",
            tabBarActiveTintColor: COLORS.primary900,
            tabBarInactiveTintColor: COLORS.grey300,
            tabBarActiveBackgroundColor: COLORS.appBackground,
            tabBarInactiveBackgroundColor: COLORS.appBackground,
            tabBarStyle: { backgroundColor: COLORS.appBackground },
          }}
        >
          <Tab.Screen
            name="Words"
            component={WordsNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Learning"
            component={LearningNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="book-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
