// src/screens/CartScreen.js
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CartContext } from "../context/CartContext";
import CustomButton from "../components/Button";

const CartScreen = ({ navigation }) => {
  const {
    items,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    getCartTotal,
  } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState(null);

  console.log("Items received in CartScreen:", items); // <<--- مهم للتحقق

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItemFromCart(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPriceIndividual}>{item.price}₪ للقطعة</Text>
        <Text style={styles.itemTotal}>
          الإجمالي: {(item.price * item.quantity).toFixed(2)}₪
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => removeItemFromCart(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>إزالة</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert("السلة فارغة", "الرجاء إضافة أصناف إلى السلة أولاً.");
      return;
    }
    if (!paymentMethod) {
      Alert.alert("خطأ", "الرجاء اختيار طريقة الدفع أولاً.");
      return;
    }
    console.log(
      "Checkout :: Items:",
      items,
      "Total:",
      getCartTotal(),
      "Payment:",
      paymentMethod
    );
    Alert.alert("تم الطلب", "طلبك قيد المعالجة!", [
      {
        text: "موافق",
        onPress: () => {
          clearCart();
          navigation.navigate("Home"); // العودة للرئيسية بعد إتمام الطلب
        },
      },
    ]);
  };

  const totalAmount = getCartTotal();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>سلة المشتريات</Text>
      {items && items.length === 0 ? ( // تحقق من items قبل الوصول لـ length
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>السلة فارغة!</Text>
          <CustomButton
            title="اذهب للتسوق"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()} // تأكد من أن id موجود ويُحول لنص
          style={styles.itemList}
        />
      )}
      {items &&
        items.length > 0 && ( // تحقق من items قبل الوصول لـ length
          <>
            <Text style={styles.totalText}>
              المجموع الكلي: {totalAmount.toFixed(2)}₪
            </Text>
            <View style={styles.paymentContainer}>
              <Text style={styles.paymentHeader}>اختر طريقة الدفع:</Text>
              <View style={styles.paymentOptions}>
                <TouchableOpacity
                  style={[
                    styles.paymentButton,
                    paymentMethod === "cash" && styles.selectedPayment,
                  ]}
                  onPress={() => setPaymentMethod("cash")}
                >
                  <Text style={styles.paymentButtonTextInternal}>كاش 💵</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.paymentButton,
                    paymentMethod === "visa" && styles.selectedPayment,
                  ]}
                  onPress={() => setPaymentMethod("visa")}
                >
                  <Text style={styles.paymentButtonTextInternal}>فيزا 💳</Text>
                </TouchableOpacity>
              </View>
            </View>
            <CustomButton
              title="إتمام الطلب"
              onPress={handleCheckout}
              disabled={items.length === 0}
            />
          </>
        )}
    </View>
  );
};

// الأنماط (styles) تبقى كما هي من ردك السابق
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f8f8f8" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  itemList: { marginBottom: 10 },
  cartItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  itemInfo: { flex: 2.5 },
  itemName: { fontSize: 16, fontWeight: "bold", color: "#444" },
  itemPriceIndividual: { fontSize: 12, color: "#777", marginVertical: 2 },
  itemTotal: { fontSize: 14, color: "green", fontWeight: "500" },
  quantityContainer: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 12,
    color: "#007bff",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#333",
  },
  removeButton: { padding: 8, marginLeft: 5 },
  removeButtonText: { color: "red", fontSize: 12 },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 20,
    color: "#333",
  },
  paymentContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 1,
  },
  paymentHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  paymentOptions: { flexDirection: "row", justifyContent: "space-around" },
  paymentButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedPayment: { backgroundColor: "#e6f2ff", borderColor: "#007bff" },
  paymentButtonTextInternal: { fontSize: 16, fontWeight: "500", color: "#333" },
});

export default CartScreen;
