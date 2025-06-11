import React, { useState, useContext, useEffect } from "react";
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

  const [item, setItem] = useState(null);
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
      setUserRating(0);
      setQuantity(1);
    } else {
      console.error("ItemDetailScreen: Item not found for ID:", itemId);
      setItem(null);
      Alert.alert("خطأ", "لم يتم العثور على الصنف المطلوب.", [
        { text: "موافق", onPress: () => navigation.goBack() },
      ]);
    }
  }, [itemId]);

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
    Alert.alert("شكراً!", "تم إضافة تعليقك.");
  };

  const handleRateItem = (rating) => {
    setUserRating(rating);
    Alert.alert("شكراً!", `لقد قيمت هذا الصنف بـ ${rating} نجوم.`);
    if (item) {
      const currentTotalRatingPoints =
        (item.averageRating || 0) * (item.totalRatings || 0);
      const newTotalRatings = (item.totalRatings || 0) + 1;
      const newAverageRating =
        (currentTotalRatingPoints + rating) / newTotalRatings;
      setItem((prevItem) => ({
        ...prevItem,
        averageRating: parseFloat(newAverageRating.toFixed(1)),
        totalRatings: newTotalRatings,
      }));
    }
    console.log(
      `ItemDetailScreen: Item ${item?.id} rated ${rating} stars by current user.`
    );
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

  if (!item) {
    return (
      <View style={styles.centered}>
        <Text>جاري تحميل بيانات الصنف...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
              item.image,
              e.nativeEvent.error
            )
          }
        />
      ) : (
        <View style={[styles.image, styles.placeholderImageDetail]}>
          <Text>لا توجد صورة متاحة</Text>
        </View>
      )}

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
            scrollEnabled={false}
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
    height: 280,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
  },
  placeholderImageDetail: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    padding: 20,
  },
  itemName: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textAlign: "right",
  },
  categoryName: {
    fontSize: 17,
    color: "#666",
    marginBottom: 12,
    textAlign: "right",
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 20,
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 8,
    color: "#444",
    textAlign: "right",
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: "#555",
    textAlign: "right",
    marginBottom: 10,
  },
  addToCartContainer: {
    marginVertical: 25,
    alignItems: "center",
  },
  quantityLabel: {
    fontSize: 17,
    marginBottom: 10,
    color: "#333",
    fontWeight: "500",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9ecef",
    borderRadius: 22,
    marginHorizontal: 12,
  },
  quantityButtonText: {
    fontSize: 24,
    color: "#007bff",
    fontWeight: "bold",
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: "bold",
    minWidth: 35,
    textAlign: "center",
    color: "#333",
  },
  commentContainer: {
    backgroundColor: "#f8f9fa",
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
    fontSize: 15,
    lineHeight: 22,
    color: "#495057",
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
