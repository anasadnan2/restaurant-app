// src/navigation/AppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Platform, View, Text } from "react-native"; // View و Text كبديل للأيقونة
import Icon from "react-native-vector-icons/Ionicons"; // تأكد من تثبيت وربط المكتبة

import HomeScreen from "../screens/HomeScreen";
import CategoryItemsScreen from "../screens/CategoryItemsScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import CartScreen from "../screens/CartScreen";

const Stack = createStackNavigator();

// دالة لإنشاء زر السلة بشكل مشترك
const CartButton = (navigation) => (
  <TouchableOpacity
    onPress={() => navigation.navigate("Cart")}
    style={{ marginRight: Platform.OS === "ios" ? 10 : 15, padding: 5 }}
  >
    {/* إذا لم تكن مكتبة الأيقونات مثبتة، استخدم نصًا */}
    {Icon ? (
      <Icon name="cart-outline" size={28} color="#007bff" />
    ) : (
      <Text style={{ color: "#007bff", fontSize: 16 }}>السلة</Text>
    )}
  </TouchableOpacity>
);

// دالة لإنشاء زر تسجيل الخروج بشكل مشترك
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
  // نستقبل onLogout من App.js
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        // screenOptions عامة لجميع الشاشات
        headerTitleAlign: "center",
        headerLeft: () => LogoutButton(onLogout), // زر تسجيل الخروج على اليسار لجميع الشاشات هنا
      })}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "الرئيسية",
          headerRight: () => CartButton(navigation), // زر السلة على اليمين
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
          // لا حاجة لـ headerRight هنا لأنه لا معنى لزر "السلة" داخل شاشة السلة نفسها
          // headerLeft سيبقى زر تسجيل الخروج من screenOptions العامة
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
