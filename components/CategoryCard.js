// src/components/CategoryCard.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";

const CategoryCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
    {/* تفعيل عرض صورة القسم */}
    {item.image && ( // تحقق من وجود الصورة
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
    height: 150, // يمكن زيادة الارتفاع قليلاً إذا كانت هناك صورة
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
    // أضف هذا النمط أو عدله حسب الحاجة
    width: 80, // مثال للعرض
    height: 80, // مثال للارتفاع
    marginBottom: 8,
    borderRadius: 40, // لجعلها دائرية إذا أردت
    resizeMode: "cover", // أو 'contain'
    backgroundColor: "#e0e0e0", // لون احتياطي
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#333", // لون أغمق قليلاً للنص
  },
});

export default CategoryCard;
