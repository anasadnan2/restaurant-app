import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";

const CategoryCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
    {item.image && (
      <Image
        source={
          typeof item.image === "string" ? { uri: item.image } : item.image
        }
        style={styles.categoryImage}
        onError={(error) =>
          console.log(
            "Failed to load category image:",
            item.image,
            error.nativeEvent.error
          )
        }
      />
    )}
    <Text style={styles.categoryTitle}>{item.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryItem: {
    flex: 1,
    margin: 8,
    height: 150, 
    borderRadius: 10,
    backgroundColor: "#ECECEC",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 40, 
    resizeMode: "cover", 
    backgroundColor: "#e0e0e0", 
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#333", 
  },
});

export default CategoryCard;
