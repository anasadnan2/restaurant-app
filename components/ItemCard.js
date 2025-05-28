// src/components/ItemCard.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ItemCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.itemCard} onPress={onPress}>
    {/* التحقق من وجود قيمة لـ item.image */}
    {item.image ? (
      <Image
        // هذا السطر يتعامل مع كل من الـ URI (لصور النت) والمخرجات الرقمية لـ require()
        source={
          typeof item.image === "string" ? { uri: item.image } : item.image
        }
        style={styles.itemImage}
        onError={(error) =>
          console.log(
            "Failed to load item image in ItemCard:", // سجل لتمييز الخطأ
            item.name, // اسم الصنف للمساعدة في تحديد أي صورة فشلت
            item.image, // قيمة item.image التي فشلت
            error.nativeEvent.error
          )
        }
      />
    ) : (
      // عرض عنصر نائب إذا لم تكن هناك صورة
      <View style={[styles.itemImage, styles.placeholderImage]}>
        <Text style={styles.placeholderText}>لا توجد صورة</Text>
      </View>
    )}
    <View style={styles.itemInfo}>
      <Text style={styles.itemName} numberOfLines={2} ellipsizeMode="tail">
        {item.name}
      </Text>
      {/* numberOfLines لتجنب تجاوز النص */}
      <Text style={styles.itemPrice}>{item.price}₪</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: "#ffffff", // تغيير لون الخلفية للأبيض
    borderRadius: 10, // زيادة دائرية الحواف قليلاً
    padding: 12, // تعديل الـ padding
    marginBottom: 12,
    flexDirection: "row", // لترتيب الصورة والنصوص أفقيًا
    alignItems: "center", // لمحاذاة الصورة والنصوص عموديًا في المنتصف
    elevation: 3, // زيادة الظل قليلاً للأندرويد
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // تعديل إزاحة الظل
    shadowOpacity: 0.1, // تقليل شفافية الظل قليلاً
    shadowRadius: 2, // تعديل نصف قطر الظل
    borderWidth: 1, // (اختياري) إضافة حد خفيف
    borderColor: "#f0f0f0", // لون الحد
  },
  itemImage: {
    width: 75, // تعديل عرض الصورة
    height: 75, // تعديل ارتفاع الصورة
    borderRadius: 8,
    marginRight: 12, // تعديل المسافة
    backgroundColor: "#e9ecef", // لون خلفية احتياطي أفتح قليلاً
  },
  placeholderImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 10,
    color: "#6c757d", // لون أغمق قليلاً للنص النائب
  },
  itemInfo: {
    flex: 1, // لجعل هذا الجزء يأخذ المساحة المتبقية
    justifyContent: "center", // لتوسيط النصوص عمودياً داخل هذا الـ View
  },
  itemName: {
    fontSize: 17, // تعديل حجم الخط
    fontWeight: "600", // تعديل سماكة الخط (أقل من bold)
    color: "#343a40", // لون أغمق لاسم الصنف
    textAlign: "right",
    marginBottom: 4, // إضافة مسافة صغيرة أسفل الاسم
  },
  itemPrice: {
    fontSize: 15, // تعديل حجم الخط
    color: "#28a745", // لون أخضر للسعر
    textAlign: "right",
    fontWeight: "500",
  },
});

export default ItemCard;
