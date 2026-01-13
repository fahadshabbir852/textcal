// // app/calculators/IncomeTaxCalculator.tsx
// import { Picker } from "@react-native-picker/picker";
// import React, { useState } from "react";
// import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// export default function IncomeTaxCalculator() {
//   const [incomeType, setIncomeType] = useState("annual");
//   const [income, setIncome] = useState("");
//   const [error, setError] = useState("");
//   const [result, setResult] = useState<{
//     annualIncome: number;
//     annualTax: number;
//     annualAfterTax: number;
//     monthlyIncome: number;
//     monthlyTax: number;
//     monthlyAfterTax: number;
//   } | null>(null);

//   const calculateTax = () => {
//     const incomeValue = parseFloat(income);
//     if (isNaN(incomeValue) || incomeValue < 0) {
//       setError("Please enter a valid (non-negative) income.");
//       setResult(null);
//       return;
//     }

//     const annualIncome = incomeType === "monthly" ? incomeValue * 12 : incomeValue;
//     let tax = 0;

//     if (annualIncome <= 600000) tax = 0;
//     else if (annualIncome <= 1200000) tax = (annualIncome - 600000) * 0.01;
//     else if (annualIncome <= 2200000) tax = 6000 + (annualIncome - 1200000) * 0.11;
//     else if (annualIncome <= 3200000) tax = 116000 + (annualIncome - 2200000) * 0.23;
//     else if (annualIncome <= 4100000) tax = 346000 + (annualIncome - 3200000) * 0.30;
//     else tax = 616000 + (annualIncome - 4100000) * 0.35;

//     const annualAfterTax = annualIncome - tax;
//     const monthlyIncome = annualIncome / 12;
//     const monthlyTax = tax / 12;
//     const monthlyAfterTax = monthlyIncome - monthlyTax;

//     setResult({ annualIncome, annualTax: tax, annualAfterTax, monthlyIncome, monthlyTax, monthlyAfterTax });
//     setError("");
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>Income Tax Calculator 2025–2026</Text>

//       <Text style={styles.label}>Select Income Type:</Text>
//       <Picker selectedValue={incomeType} onValueChange={setIncomeType} style={styles.input}>
//         <Picker.Item label="Annual Income" value="annual" />
//         <Picker.Item label="Monthly Income" value="monthly" />
//       </Picker>

//       <Text style={styles.label}>Enter Your Income (PKR):</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         placeholder="e.g. 1500000"
//         value={income}
//         onChangeText={setIncome}
//       />

//       <TouchableOpacity style={styles.button} onPress={calculateTax}>
//         <Text style={styles.buttonText}>Calculate</Text>
//       </TouchableOpacity>

//       {error ? <Text style={styles.error}>{error}</Text> : null}

//       {result && (
//         <View style={styles.resultBox}>
//           <Text style={styles.resultText}>Total Annual Income: Rs. {result.annualIncome.toLocaleString()}</Text>
//           <Text style={styles.resultText}>Annual Tax: Rs. {result.annualTax.toFixed(0).toLocaleString()}</Text>
//           <Text style={styles.resultText}>Annual Income After Tax: Rs. {result.annualAfterTax.toFixed(0).toLocaleString()}</Text>
//           <Text style={styles.resultText}>Monthly Income: Rs. {result.monthlyIncome.toFixed(0).toLocaleString()}</Text>
//           <Text style={styles.resultText}>Monthly Tax: Rs. {result.monthlyTax.toFixed(0).toLocaleString()}</Text>
//           <Text style={styles.resultText}>Monthly Income After Tax: Rs. {result.monthlyAfterTax.toFixed(0).toLocaleString()}</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     maxWidth: 600,
//     alignSelf: "center",
//     backgroundColor: "#f9f9f9",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#0C0F6E",
//   },
//   label: {
//     fontWeight: "600",
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: "#0c0f6d",
//     padding: 12,
//     borderRadius: 5,
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
//     backgroundColor: "#f4f7ff",
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

// app/calculators/IncomeTaxCalculator.tsx
import { Picker } from "@react-native-picker/picker";
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function IncomeTaxCalculator() {
  const [incomeType, setIncomeType] = useState("annual");
  const [income, setIncome] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    annualIncome: number;
    annualTax: number;
    annualAfterTax: number;
    monthlyIncome: number;
    monthlyTax: number;
    monthlyAfterTax: number;
  } | null>(null);

  useEffect(() => {
    // Set AdMob test device to display test ads
    setTestDeviceIDAsync("EMULATOR");
  }, []);

  const calculateTax = () => {
    const incomeValue = parseFloat(income);
    if (isNaN(incomeValue) || incomeValue < 0) {
      setError("Please enter a valid (non-negative) income.");
      setResult(null);
      return;
    }

    const annualIncome = incomeType === "monthly" ? incomeValue * 12 : incomeValue;
    let tax = 0;

    if (annualIncome <= 600000) tax = 0;
    else if (annualIncome <= 1200000) tax = (annualIncome - 600000) * 0.01;
    else if (annualIncome <= 2200000) tax = 6000 + (annualIncome - 1200000) * 0.11;
    else if (annualIncome <= 3200000) tax = 116000 + (annualIncome - 2200000) * 0.23;
    else if (annualIncome <= 4100000) tax = 346000 + (annualIncome - 3200000) * 0.30;
    else tax = 616000 + (annualIncome - 4100000) * 0.35;

    const annualAfterTax = annualIncome - tax;
    const monthlyIncome = annualIncome / 12;
    const monthlyTax = tax / 12;
    const monthlyAfterTax = monthlyIncome - monthlyTax;

    setResult({ annualIncome, annualTax: tax, annualAfterTax, monthlyIncome, monthlyTax, monthlyAfterTax });
    setError("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Income Tax Calculator 2025–2026</Text>

      <Text style={styles.label}>Select Income Type:</Text>
      <Picker selectedValue={incomeType} onValueChange={setIncomeType} style={styles.input}>
        <Picker.Item label="Annual Income" value="annual" />
        <Picker.Item label="Monthly Income" value="monthly" />
      </Picker>

      <Text style={styles.label}>Enter Your Income (PKR):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="e.g. 1500000"
        value={income}
        onChangeText={setIncome}
      />

      <TouchableOpacity style={styles.button} onPress={calculateTax}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Total Annual Income: Rs. {result.annualIncome.toLocaleString()}</Text>
          <Text style={styles.resultText}>Annual Tax: Rs. {result.annualTax.toFixed(0).toLocaleString()}</Text>
          <Text style={styles.resultText}>Annual Income After Tax: Rs. {result.annualAfterTax.toFixed(0).toLocaleString()}</Text>
          <Text style={styles.resultText}>Monthly Income: Rs. {result.monthlyIncome.toFixed(0).toLocaleString()}</Text>
          <Text style={styles.resultText}>Monthly Tax: Rs. {result.monthlyTax.toFixed(0).toLocaleString()}</Text>
          <Text style={styles.resultText}>Monthly Income After Tax: Rs. {result.monthlyAfterTax.toFixed(0).toLocaleString()}</Text>
        </View>
      )}

      {/* AdMob Banner at the bottom */}
      <View style={styles.adContainer}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test Ad Unit ID
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={(err) => console.log("Ad failed:", err)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    maxWidth: 600,
    alignSelf: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#0C0F6E",
  },
  label: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#0c0f6d",
    padding: 12,
    borderRadius: 5,
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
    backgroundColor: "#f4f7ff",
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
