// src/screens/PolicyScreen.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";

const PolicyScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>سياسة الخصوصية وشروط الاستخدام</Text>

        <Text style={styles.heading}>مقدمة:</Text>
        <Text style={styles.paragraph}>
          أهلاً بك في تطبيق مطعمنا. نحن نقدر ثقتك بنا ونلتزم بحماية خصوصيتك.
          توضح هذه السياسة كيف نجمع معلوماتك الشخصية ونستخدمها ونشاركها ونحميها.
          باستخدامك لتطبيقنا، فإنك توافق على الممارسات الموضحة في هذه السياسة.
        </Text>

        <Text style={styles.heading}>1. المعلومات التي نجمعها:</Text>
        <Text style={styles.paragraph}>
          - **المعلومات التي تقدمها لنا مباشرة:** مثل اسمك، بريدك الإلكتروني،
          كلمة المرور عند إنشاء حساب. معلومات الطلبات التي تقوم بها. -
          **المعلومات التي نجمعها تلقائيًا:** قد نجمع معلومات حول جهازك
          واستخدامك للتطبيق، مثل عنوان IP، نوع الجهاز، نظام التشغيل، معرفات
          الإعلانات، وتفاعلاتك مع التطبيق.
        </Text>

        <Text style={styles.heading}>2. كيف نستخدم معلوماتك:</Text>
        <Text style={styles.paragraph}>
          - لتقديم خدماتنا وتحسينها، بما في ذلك معالجة طلباتك وتخصيص تجربتك. -
          للتواصل معك بخصوص حسابك أو طلباتك أو تحديثات التطبيق. - لأغراض تحليلية
          ولتحسين أداء التطبيق وأمانه.
        </Text>

        <Text style={styles.heading}>3. شروط الاستخدام:</Text>
        <Text style={styles.paragraph}>
          - يجب أن يكون عمرك 18 عامًا أو أكثر لاستخدام هذا التطبيق أو بموافقة
          ولي الأمر. - أنت مسؤول عن الحفاظ على سرية معلومات حسابك وكلمة المرور.
          - يُمنع استخدام التطبيق لأي أغراض غير قانونية أو غير مصرح بها. - نحتفظ
          بالحق في تعديل هذه الشروط في أي وقت.
        </Text>

        <Text style={styles.heading}>4. مشاركة المعلومات:</Text>
        <Text style={styles.paragraph}>
          قد نشارك معلوماتك مع مزودي الخدمة من الأطراف الثالثة الذين يساعدوننا
          في تشغيل تطبيقنا (مثل معالجة الدفعات، تحليل البيانات). لن نبيع
          معلوماتك الشخصية لأطراف ثالثة.
        </Text>

        <Text style={styles.heading}>5. أمان المعلومات:</Text>
        <Text style={styles.paragraph}>
          نتخذ تدابير معقولة لحماية معلوماتك الشخصية من الفقدان أو السرقة أو
          الاستخدام غير المصرح به. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت أو
          تخزين إلكتروني آمنة بنسبة 100%.
        </Text>

        <Text style={styles.heading}>6. التغييرات على هذه السياسة:</Text>
        <Text style={styles.paragraph}>
          قد نقوم بتحديث سياسة الخصوصية وشروط الاستخدام هذه من وقت لآخر. سنقوم
          بإخطارك بأي تغييرات جوهرية عن طريق نشر السياسة الجديدة على هذه الصفحة.
        </Text>

        <Text style={styles.heading}>7. الاتصال بنا:</Text>
        <Text style={styles.paragraph}>
          إذا كان لديك أي أسئلة حول هذه السياسة، يرجى الاتصال بنا على [أدخل بريد
          إلكتروني للتواصل].
        </Text>

        <View style={styles.buttonContainer}>
          <Button title="العودة" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
    color: "#007bff",
    textAlign: "right",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: "#555",
    textAlign: "right",
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
});

export default PolicyScreen;
