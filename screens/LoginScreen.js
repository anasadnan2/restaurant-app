// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView, // <<--- أضف ScrollView إذا أصبحت الشاشة طويلة
} from "react-native";
import CustomButton from "../components/Button";

const FAKE_USER = {
  email: "test@example.com",
  password: "password123",
};

const LoginScreen = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // ... (نفس دالة handleLogin السابقة) ...
    console.log("Attempting login with Email:", email, "Password:", password);
    if (!email.trim() || !password.trim()) {
      Alert.alert("خطأ", "الرجاء إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    if (
      email.toLowerCase() === FAKE_USER.email &&
      password === FAKE_USER.password
    ) {
      Alert.alert("نجاح", "تم تسجيل الدخول بنجاح!");
      console.log("Login successful, calling onLoginSuccess");
      if (typeof onLoginSuccess === "function") {
        onLoginSuccess();
      } else {
        console.error(
          "onLoginSuccess is not a function or not passed to LoginScreen!"
        );
        navigation.replace("Home");
      }
    } else {
      Alert.alert(
        "خطأ في تسجيل الدخول",
        "البريد الإلكتروني أو كلمة المرور غير صحيحة."
      );
      console.log(
        "Login failed. Input vs Fake:",
        email.toLowerCase(),
        FAKE_USER.email,
        password,
        FAKE_USER.password
      );
    }
  };

  return (
    // استخدام ScrollView إذا كانت المحتويات قد تتجاوز ارتفاع الشاشة
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")} // استبدل هذا بمسار صورتك
          style={styles.logo}
        />
        <Text style={styles.title}>تسجيل الدخول</Text>
        <TextInput
          style={styles.input}
          placeholder="البريد الإلكتروني (test@example.com)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          placeholder="كلمة المرور (password123)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
        />
        <CustomButton
          title="دخول"
          onPress={handleLogin}
          style={styles.loginButton}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>ليس لديك حساب؟ سجل الآن</Text>
        </TouchableOpacity>

        {/* رابط السياسات وشروط الاستخدام */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Policy")} // <<--- الانتقال إلى شاشة Policy
          style={styles.policyLinkContainer}
        >
          <Text style={styles.policyLinkText}>
            بالتسجيل، أنت توافق على{" "}
            <Text style={styles.underlineText}>سياسة الخصوصية</Text> و{" "}
            <Text style={styles.underlineText}>شروط الاستخدام</Text> الخاصة بنا.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    // <<--- نمط جديد لـ ScrollView
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    // flex: 1, // أزل هذه إذا كنت تستخدم ScrollView و contentContainerStyle
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    // borderWidth: 2,
    // borderColor: '#007bff',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    width: "100%",
  },
  loginButton: {
    width: "100%",
    marginTop: 10,
  },
  linkContainer: {
    marginTop: 20,
    marginBottom: 15, // إضافة مسافة قبل رابط السياسات
  },
  linkText: {
    color: "#007bff",
    textAlign: "center",
    fontSize: 16,
  },
  policyLinkContainer: {
    // <<--- نمط لحاوية رابط السياسات
    marginTop: 20,
    paddingHorizontal: 10, // لإعطاء بعض الهوامش للنص الطويل
  },
  policyLinkText: {
    // <<--- نمط لنص السياسات
    color: "#555", // لون أغمق قليلاً
    textAlign: "center",
    fontSize: 12, // خط أصغر قليلاً
    lineHeight: 18, // لتباعد الأسطر
  },
  underlineText: {
    // <<--- نمط لجعل النص يبدو كرابط
    textDecorationLine: "underline",
    color: "#007bff", // نفس لون الروابط الأخرى
    fontWeight: "bold",
  },
});

export default LoginScreen;
