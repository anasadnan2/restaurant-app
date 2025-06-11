import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ItemCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.itemCard} onPress={onPress}>
    {item.image ? (
      <Image
        source={
          typeof item.image === "string" ? { uri: item.image } : item.image
        }
        style={styles.itemImage}
        onError={(error) =>
          console.log(
            "Failed to load item image in ItemCard:",
            item.name,
            item.image,
            error.nativeEvent.error
          )
        }
      />
    ) : (
      <View style={[styles.itemImage, styles.placeholderImage]}>
        <Text style={styles.placeholderText}>لا توجد صورة</Text>
      </View>
    )}
    <View style={styles.itemInfo}>
      <Text style={styles.itemName} numberOfLines={2} ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text style={styles.itemPrice}>{item.price}₪</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "#f0f0f0", //
  },
  itemImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#e9ecef",
  },
  placeholderImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 10,
    color: "#6c757d",
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#343a40",
    textAlign: "right",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    color: "#28a745",
    textAlign: "right",
    fontWeight: "500",
  },
});

export default ItemCard;
