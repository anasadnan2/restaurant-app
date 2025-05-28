// src/screens/ItemDetailScreen.js
import React, { useState, useContext, useEffect } from "react"; // أضف useEffect إذا لم يكن موجودًا
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { DUMMY_ITEMS, DUMMY_CATEGORIES } from "../data/dummyData";
import CommentInput from "../components/CommentInput";
import Rating from "../components/Rating";
import CustomButton from "../components/Button";
import { CartContext } from "../context/CartContext";

const ItemDetailScreen = ({ route, navigation }) => {
  const { itemId } = route.params;

  // استخدم useEffect للتأكد من أن item يُحدّث عند تغير itemId (مهم إذا كان يمكن الانتقال من تفاصيل صنف لتفاصيل صنف آخر مباشرة)
  const [item, setItem] = useState(null); // ابدأ بـ null أو undefined
  const [comments, setComments] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const cartCtx = useContext(CartContext);

  useEffect(() => {
    const foundItem = DUMMY_ITEMS.find((i) => i.id === itemId);
    console.log("ItemDetailScreen - Item ID from route:", itemId);
    console.log("ItemDetailScreen - Found item:", foundItem);
    if (foundItem) {
      setItem(foundItem);
      setComments(foundItem.comments || []);
      // إعادة تعيين أي حالة خاصة بالصنف السابق إذا لزم الأمر
      setUserRating(0);
      setQuantity(1);
    } else {
      // التعامل مع حالة عدم العثور على الصنف
      console.error("ItemDetailScreen: Item not found for ID:", itemId);
      setItem(null); // أو يمكنك عرض رسالة خطأ أو الانتقال للخلف
      Alert.alert("خطأ", "لم يتم العثور على الصنف المطلوب.", [
        { text: "موافق", onPress: () => navigation.goBack() },
      ]);
    }
  }, [itemId]); // أعد تشغيل هذا الـ effect إذا تغير itemId

  const getCategoryName = (categoryId) => {
    if (!categoryId) return "غير معروف";
    const category = DUMMY_CATEGORIES.find((cat) => cat.id === categoryId);
    return category ? category.name : "غير معروف";
  };

  const handleAddComment = (commentText) => {
    const newComment = {
      id: Math.random().toString(),
      text: commentText,
      user: "المستخدم الحالي",
    };
    setComments((prevComments) => [newComment, ...prevComments]);
    // TODO: Send comment to backend (تحديث DUMMY_ITEMS إذا أردت استمرارية وهمية)
    Alert.alert("شكراً!", "تم إضافة تعليقك.");
  };

  const handleRateItem = (rating) => {
    setUserRating(rating);
    Alert.alert("شكراً!", `لقد قيمت هذا الصنف بـ ${rating} نجوم.`);
    if (item) {
      // تحديث التقييم المحلي للعرض
      const currentTotalRatingPoints =
        (item.averageRating || 0) * (item.totalRatings || 0);
      const newTotalRatings = (item.totalRatings || 0) + 1;
      const newAverageRating =
        (currentTotalRatingPoints + rating) / newTotalRatings;
      setItem((prevItem) => ({
        // تحديث حالة الصنف
        ...prevItem,
        averageRating: parseFloat(newAverageRating.toFixed(1)),
        totalRatings: newTotalRatings,
      }));
    }
    console.log(
      `ItemDetailScreen: Item ${item?.id} rated ${rating} stars by current user.`
    );
    // TODO: Send rating to backend
  };

  const handleAddToCart = () => {
    if (item) {
      console.log("ItemDetailScreen: Adding to cart:", {
        ...item,
        quantity: quantity,
      });
      cartCtx.addItemToCart({ ...item, quantity: quantity });
      Alert.alert(
        "تمت الإضافة",
        `${item.name} أضيف إلى السلة بالكمية ${quantity}!`,
        [
          { text: "متابعة التسوق" },
          { text: "الذهاب للسلة", onPress: () => navigation.navigate("Cart") },
        ]
      );
    }
  };

  // عرض شاشة تحميل أو رسالة إذا كان الصنف لم يُحمّل بعد أو غير موجود
  if (!item) {
    return (
      <View style={styles.centered}>
        <Text>جاري تحميل بيانات الصنف...</Text>
        {/* يمكنك إضافة ActivityIndicator هنا إذا أردت */}
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* --- تعديل كود عرض الصورة هنا --- */}
      {item.image ? (
        <Image
          source={
            typeof item.image === "string" ? { uri: item.image } : item.image
          }
          style={styles.image}
          onError={(e) =>
            console.log(
              "Failed to load item image in ItemDetailScreen:",
              item.name,
              item.image, // قيمة item.image التي فشلت
              e.nativeEvent.error
            )
          }
        />
      ) : (
        <View style={[styles.image, styles.placeholderImageDetail]}>
          <Text>لا توجد صورة متاحة</Text>
        </View>
      )}
      {/* --- نهاية تعديل كود عرض الصورة --- */}

      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.categoryName}>
          القسم: {getCategoryName(item.categoryId)}
        </Text>
        <Text style={styles.price}>{item.price}₪</Text>

        <Text style={styles.sectionTitle}>الوصف</Text>
        <Text style={styles.description}>{item.description}</Text>

        <Text style={styles.sectionTitle}>المكونات الغذائية</Text>
        <Text style={styles.description}>{item.ingredients}</Text>

        <Text style={styles.sectionTitle}>تقييم الصنف (العام)</Text>
        <Rating
          currentRating={item.averageRating || 0}
          totalRatings={item.totalRatings || 0}
          editable={false}
        />

        <Text style={styles.sectionTitle}>قيّم هذا الصنف بنفسك</Text>
        <Rating
          currentRating={userRating}
          onRate={handleRateItem}
          editable={true}
        />

        <View style={styles.addToCartContainer}>
          <Text style={styles.quantityLabel}>الكمية:</Text>
          <View style={styles.quantityControls}>
            <CustomButton
              title="-"
              onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
              style={styles.quantityButton}
              textStyle={styles.quantityButtonText}
            />
            <Text style={styles.quantityValue}>{quantity}</Text>
            <CustomButton
              title="+"
              onPress={() => setQuantity((prev) => prev + 1)}
              style={styles.quantityButton}
              textStyle={styles.quantityButtonText}
            />
          </View>
        </View>
        <CustomButton
          title={`أضف (${quantity}) إلى السلة (${(
            item.price * quantity
          ).toFixed(2)}₪)`}
          onPress={handleAddToCart}
        />

        <Text style={styles.sectionTitle}>التعليقات ({comments.length})</Text>
        {comments.length > 0 ? (
          <FlatList
            data={comments}
            keyExtractor={(comment) => comment.id.toString()}
            renderItem={({ item: comment }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.commentUser}>{comment.user}:</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            )}
            scrollEnabled={false} // مهم إذا كانت FlatList داخل ScrollView
            // يمكن إضافة ListEmptyComponent لعرض رسالة إذا كانت التعليقات فارغة بعد التصفية
          />
        ) : (
          <Text style={styles.noCommentsText}>
            لا توجد تعليقات حتى الآن. كن أول من يعلق!
          </Text>
        )}
        <CommentInput onSubmit={handleAddComment} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 280, // يمكن زيادة ارتفاع الصورة قليلاً
    resizeMode: "cover",
    backgroundColor: "#f0f0f0", // لون احتياطي خفيف إذا لم يتم تحميل الصورة بسرعة
  },
  placeholderImageDetail: {
    // backgroundColor: "#e0e0e0", // تم تضمينه في style.image
    justifyContent: "center",
    alignItems: "center",
    // height: 280, // تم تضمينه في style.image
  },
  detailsContainer: {
    padding: 20,
  },
  itemName: {
    fontSize: 26, // حجم أكبر قليلاً لاسم الصنف
    fontWeight: "bold",
    marginBottom: 8, // زيادة المسافة
    color: "#333",
    textAlign: "right",
  },
  categoryName: {
    fontSize: 17, // حجم أكبر قليلاً
    color: "#666", // لون أغمق قليلاً
    marginBottom: 12, // زيادة المسافة
    textAlign: "right",
  },
  price: {
    fontSize: 22, // حجم أكبر قليلاً
    fontWeight: "bold",
    color: "#28a745", // أخضر أكثر وضوحًا
    marginBottom: 20, // زيادة المسافة
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 20, // حجم أكبر قليلاً
    fontWeight: "600", // خط أعرض قليلاً
    marginTop: 25, // زيادة المسافة
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0", // لون حد أفتح
    paddingBottom: 8, // زيادة padding
    color: "#444",
    textAlign: "right",
  },
  description: {
    fontSize: 16,
    lineHeight: 26, // زيادة تباعد الأسطر
    color: "#555",
    textAlign: "right",
    marginBottom: 10, // مسافة بعد الوصف والمكونات
  },
  addToCartContainer: {
    marginVertical: 25, // زيادة المسافة
    alignItems: "center",
  },
  quantityLabel: {
    fontSize: 17,
    marginBottom: 10, // زيادة المسافة
    color: "#333",
    fontWeight: "500",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20, // زيادة المسافة
  },
  quantityButton: {
    width: 44, // زيادة حجم الزر قليلاً
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9ecef", // لون خلفية أفتح
    borderRadius: 22, // لجعلها دائرية
    marginHorizontal: 12, // زيادة المسافة
  },
  quantityButtonText: {
    fontSize: 24, // حجم أكبر للأيقونات +/-
    color: "#007bff", // لون أزرق
    fontWeight: "bold",
  },
  quantityValue: {
    fontSize: 20, // حجم أكبر للرقم
    fontWeight: "bold",
    minWidth: 35,
    textAlign: "center",
    color: "#333",
  },
  commentContainer: {
    backgroundColor: "#f8f9fa", // لون خلفية أفتح للتعليقات
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  commentUser: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#0056b3",
    textAlign: "right",
  },
  commentText: {
    fontSize: 15, // حجم أكبر قليلاً لنص التعليق
    lineHeight: 22,
    color: "#495057", // لون أغمق قليلاً لنص التعليق
    textAlign: "right",
  },
  noCommentsText: {
    textAlign: "center",
    color: "#6c757d",
    marginVertical: 20,
    fontSize: 16,
  },
});

export default ItemDetailScreen;
