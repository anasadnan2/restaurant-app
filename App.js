// src/App.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import { CartProvider } from "./context/CartContext";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userLoggedInStatus = await AsyncStorage.getItem("userLoggedIn");
        if (userLoggedInStatus === "true") {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("App.js: Failed to fetch user login status", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLoginSuccess = async () => {
    try {
      await AsyncStorage.setItem("userLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (e) {
      console.error("App.js: Failed to save user login status", e);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userLoggedIn");
      setIsLoggedIn(false);
      // يمكنك إضافة منطق إضافي هنا، مثل مسح سلة المشتريات إذا أردت
      // import { useContext } from 'react';
      // import { CartContext } from './context/CartContext';
      // const cartCtx = useContext(CartContext);
      // cartCtx.clearCart();
      console.log("App.js: User logged out and status cleared.");
    } catch (e) {
      console.error("App.js: Failed to remove user login status", e);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <CartProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <AppNavigator onLogout={handleLogout} />
        ) : (
          <AuthNavigator onLoginSuccess={handleLoginSuccess} />
        )}
      </NavigationContainer>
    </CartProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // لون خلفية شاشة التحميل
  },
});

export default App;
