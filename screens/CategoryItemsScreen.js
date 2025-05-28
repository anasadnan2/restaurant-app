// src/screens/CategoryItemsScreen.js
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { DUMMY_ITEMS } from "../data/dummyData";
import ItemCard from "../components/ItemCard";

const CategoryItemsScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const items = DUMMY_ITEMS.filter((item) => item.categoryId === categoryId);

  const renderItem = ({ item }) => {
    return (
      <ItemCard
        item={item}
        onPress={() =>
          navigation.navigate("ItemDetail", {
            itemId: item.id,
            itemName: item.name,
          })
        }
      />
    );
  };

  if (items.length === 0) {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.emptyText}>لا توجد أصناف في هذا القسم حالياً.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // الأفضل إضافة .toString() للمفتاح
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
  },
  list: {
    padding: 10,
  },
});

export default CategoryItemsScreen;
