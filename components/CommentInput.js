// src/components/CommentInput.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

const CommentInput = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = () => {
    if (!commentText.trim()) {
      Alert.alert("خطأ", "الرجاء كتابة تعليق أولاً.");
      return;
    }
    onSubmit(commentText);
    setCommentText(""); // مسح الحقل بعد الإرسال
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="اكتب تعليقك هنا..."
        value={commentText}
        onChangeText={setCommentText}
        multiline
      />
      <Button title="إرسال التعليق" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    minHeight: 60, // ارتفاع مبدئي لعدة أسطر
    marginBottom: 10,
    textAlignVertical: "top", // For Android multiline placeholder
  },
});

export default CommentInput;
