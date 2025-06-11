import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import PolicyScreen from "../screens/PolicyScreen"; 

const Stack = createStackNavigator();

const AuthNavigator = ({ onLoginSuccess }) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Login" options={{ title: "تسجيل الدخول" }}>
        {(props) => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
      <Stack.Screen name="Signup" options={{ title: "إنشاء حساب" }}>
        {(props) => <SignupScreen {...props} onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
      <Stack.Screen 
        name="Policy"
        component={PolicyScreen}
        options={{ title: "السياسات والشروط" }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
