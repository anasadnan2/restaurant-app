import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { DUMMY_CATEGORIES } from "../data/dummyData";
import CategoryCard from "../components/CategoryCard";

const HomeScreen = ({ navigation }) => {
  const renderCategoryItem = ({ item }) => {
    return (
      <CategoryCard
        item={item}
        onPress={() =>
          navigation.navigate("CategoryItems", {
            categoryId: item.id,
            categoryName: item.name,
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>أقسام المطعم</Text>
      <FlatList
        data={DUMMY_CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  list: {
    paddingHorizontal: 8,
  },
});

export default HomeScreen;
