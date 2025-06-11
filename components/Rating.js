import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Star = ({ filled, onPress, size = 30, disabled }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled || !onPress}>
    <Text style={{ fontSize: size, color: filled ? "gold" : "lightgray" }}>
      {filled ? "★" : "☆"}
    </Text>
  </TouchableOpacity>
);

const Rating = ({
  currentRating = 0,
  totalRatings,
  onRate,
  editable = false,
  maxStars = 5,
}) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <Star
        key={i}
        filled={i <= currentRating}
        onPress={
          editable && typeof onRate === "function" ? () => onRate(i) : null
        }
        disabled={!editable || typeof onRate !== "function"}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>{stars}</View>
      {totalRatings !== undefined && currentRating !== undefined && (
        <Text style={styles.ratingText}>
          ({currentRating.toFixed(1)} من {maxStars}) - {totalRatings} تقييم
        </Text>
      )}
      {editable &&
        typeof onRate === "function" &&
        totalRatings === undefined &&
        currentRating > 0 && (
          <Text style={styles.ratingText}>
            تقييمك: {currentRating.toFixed(1)} من {maxStars}
          </Text>
        )}
      {!editable && totalRatings === undefined && currentRating > 0 && (
        <Text style={styles.ratingText}>
          التقييم: {currentRating.toFixed(1)} من {maxStars}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  starsContainer: {
    flexDirection: "row",
  },
  ratingText: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
});

export default Rating;
