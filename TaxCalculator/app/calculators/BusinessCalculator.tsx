// // app/calculators/BusinessCalculator.tsx
// import React, { useState } from "react";
// import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// export default function BusinessCalculator() {
//   const [yearlyIncome, setYearlyIncome] = useState("");
//   const [result, setResult] = useState<{ yearlyTax: number; yearlyIncomeAfterTax: number } | null>(null);
//   const [error, setError] = useState("");

//   const calculateBusinessTax = () => {
//     const income = parseFloat(yearlyIncome);

//     if (isNaN(income) || income <= 0) {
//       setError("Please enter a valid income.");
//       setResult(null);
//       return;
//     }

//     let yearlyTax = 0;

//     if (income <= 600000) yearlyTax = 0;
//     else if (income <= 1200000) yearlyTax = (income - 600000) * 0.15;
//     else if (income <= 1600000) yearlyTax = 90000 + (income - 1200000) * 0.20;
//     else if (income <= 3200000) yearlyTax = 170000 + (income - 1600000) * 0.30;
//     else if (income <= 5600000) yearlyTax = 650000 + (income - 3200000) * 0.40;
//     else yearlyTax = 1610000 + (income - 5600000) * 0.45;

//     const yearlyIncomeAfterTax = income - yearlyTax;

//     setResult({ yearlyTax, yearlyIncomeAfterTax });
//     setError("");
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>Business Tax Calculator for Individuals & AOPs (2025-2026)</Text>

//       <Text style={styles.label}>Enter your yearly income:</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         placeholder="Enter income in Rs."
//         value={yearlyIncome}
//         onChangeText={setYearlyIncome}
//       />

//       <TouchableOpacity style={styles.button} onPress={calculateBusinessTax}>
//         <Text style={styles.buttonText}>Calculate Tax</Text>
//       </TouchableOpacity>

//       {error ? <Text style={styles.error}>{error}</Text> : null}

//       {result && (
//         <View style={styles.resultBox}>
//           <Text style={styles.resultText}>Yearly Tax: Rs. {result.yearlyTax.toFixed(2)}</Text>
//           <Text style={styles.resultText}>Yearly Income After Tax: Rs. {result.yearlyIncomeAfterTax.toFixed(2)}</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     maxWidth: 700,
//     alignSelf: "center",
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 20,
//     color: "#0C0F6E",
//   },
//   label: {
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: "#0C0F6D",
//     padding: 12,
//     borderRadius: 4,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//   },
//   resultBox: {
//     marginTop: 20,
//     padding: 15,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     backgroundColor: "#F4F7FF",
//   },
//   resultText: {
//     fontWeight: "600",
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   error: {
//     color: "red",
//     marginTop: 10,
//   },
// });


import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BannerAd, BannerAdSize, TestIds, MobileAds } from 'react-native-google-mobile-ads';

export default function BusinessCalculator() {
  const [yearlyIncome, setYearlyIncome] = useState("");
  const [result, setResult] = useState<{ yearlyTax: number; yearlyIncomeAfterTax: number } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    MobileAds().initialize();
  }, []);

  const calculateBusinessTax = () => {
    const income = parseFloat(yearlyIncome);

    if (isNaN(income) || income <= 0) {
      setError("Please enter a valid income.");
      setResult(null);
      return;
    }

    let yearlyTax = 0;

    if (income <= 600000) yearlyTax = 0;
    else if (income <= 1200000) yearlyTax = (income - 600000) * 0.15;
    else if (income <= 1600000) yearlyTax = 90000 + (income - 1200000) * 0.20;
    else if (income <= 3200000) yearlyTax = 170000 + (income - 1600000) * 0.30;
    else if (income <= 5600000) yearlyTax = 650000 + (income - 3200000) * 0.40;
    else yearlyTax = 1610000 + (income - 5600000) * 0.45;

    const yearlyIncomeAfterTax = income - yearlyTax;

    setResult({ yearlyTax, yearlyIncomeAfterTax });
    setError("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Business Tax Calculator for Individuals & AOPs (2025-2026)</Text>

      <Text style={styles.label}>Enter your yearly income:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter income in Rs."
        value={yearlyIncome}
        onChangeText={setYearlyIncome}
      />

      <TouchableOpacity style={styles.button} onPress={calculateBusinessTax}>
        <Text style={styles.buttonText}>Calculate Tax</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Yearly Tax: Rs. {result.yearlyTax.toFixed(2)}</Text>
          <Text style={styles.resultText}>Yearly Income After Tax: Rs. {result.yearlyIncomeAfterTax.toFixed(2)}</Text>
        </View>
      )}

      <View style={styles.adContainer}>
        <BannerAd
          unitId={TestIds.ADAPTIVE_BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    maxWidth: 700,
    alignSelf: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#0C0F6E",
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#0C0F6D",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#F4F7FF",
  },
  resultText: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 5,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  adContainer: {
    marginTop: 30,
    alignItems: "center",
  },
});
