import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Platform, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import CategoryItemsScreen from "../screens/CategoryItemsScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import CartScreen from "../screens/CartScreen";

const Stack = createStackNavigator();

const CartButton = (navigation) => (
  <TouchableOpacity
    onPress={() => navigation.navigate("Cart")}
    style={{ marginRight: Platform.OS === "ios" ? 10 : 15, padding: 5 }}
  >
    {Icon ? (
      <Icon name="cart-outline" size={28} color="#007bff" />
    ) : (
      <Text style={{ color: "#007bff", fontSize: 16 }}>السلة</Text>
    )}
  </TouchableOpacity>
);

const LogoutButton = (onLogoutCallback) => (
  <TouchableOpacity
    onPress={onLogoutCallback}
    style={{ marginLeft: Platform.OS === "ios" ? 10 : 15, padding: 5 }}
  >
    {Icon ? (
      <Icon name="log-out-outline" size={28} color="#007bff" />
    ) : (
      <Text style={{ color: "#007bff", fontSize: 16 }}>خروج</Text>
    )}
  </TouchableOpacity>
);

const AppNavigator = ({ onLogout }) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerLeft: () => LogoutButton(onLogout),
      })}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "الرئيسية",
          headerRight: () => CartButton(navigation),
        })}
      />
      <Stack.Screen
        name="CategoryItems"
        component={CategoryItemsScreen}
        options={({ route, navigation }) => ({
          title: route.params.categoryName || "الأصناف",
          headerRight: () => CartButton(navigation),
        })}
      />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetailScreen}
        options={({ route, navigation }) => ({
          title: route.params.itemName || "تفاصيل الصنف",
          headerRight: () => CartButton(navigation),
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "سلة المشتريات",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
