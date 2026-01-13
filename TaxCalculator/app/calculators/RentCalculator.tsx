// import { Picker } from "@react-native-picker/picker"; // ✅ Correct import
// import React, { useState } from "react";
// import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// export default function RentCalculator() {
//   const [entity, setEntity] = useState("company");
//   const [filer, setFiler] = useState("filer");
//   const [monthlyRent, setMonthlyRent] = useState("");
//   const [result, setResult] = useState<any>(null);

//   const calculateTax = () => {
//     const rent = parseFloat(monthlyRent);
//     if (!rent || rent <= 0) { setResult("Please enter valid rent."); return; }
//     const annualRent = rent * 12;
//     let annualTax = 0;

//     if (entity === "company") {
//       annualTax = filer === "filer" ? annualRent * 0.15 : annualRent * 0.30;
//     } else {
//       if (filer === "filer") {
//         if (annualRent <= 300000) annualTax = 0;
//         else if (annualRent <= 600000) annualTax = (annualRent - 300000) * 0.05;
//         else if (annualRent <= 2000000) annualTax = 15000 + (annualRent - 600000) * 0.10;
//         else annualTax = 155000 + (annualRent - 2000000) * 0.25;
//       } else {
//         if (annualRent <= 300000) annualTax = 0;
//         else if (annualRent <= 600000) annualTax = (annualRent - 300000) * 0.10;
//         else if (annualRent <= 2000000) annualTax = (15000 + (annualRent - 600000) * 0.10) * 2;
//         else annualTax = (155000 + (annualRent - 2000000) * 0.25) * 2;
//       }
//     }

//     setResult({
//       monthlyTax: annualTax / 12,
//       netMonthly: rent - annualTax / 12,
//       annualRent,
//       annualTax,
//       netAnnual: annualRent - annualTax,
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>Rent Tax Calculator</Text>

//       <Text style={styles.label}>Entity Type</Text>
//       <Picker selectedValue={entity} onValueChange={setEntity} style={styles.input}>
//         <Picker.Item label="Company" value="company" />
//         <Picker.Item label="Individual / AOP" value="individual" />
//       </Picker>

//       <Text style={styles.label}>Filer Type</Text>
//       <Picker selectedValue={filer} onValueChange={setFiler} style={styles.input}>
//         <Picker.Item label="Filer" value="filer" />
//         <Picker.Item label="Non-Filer" value="non-filer" />
//       </Picker>

//       <Text style={styles.label}>Monthly Rent</Text>
//       <TextInput
//         style={styles.textInput}
//         keyboardType="numeric"
//         placeholder="Enter monthly rent"
//         value={monthlyRent}
//         onChangeText={setMonthlyRent}
//       />

//       <TouchableOpacity style={styles.button} onPress={calculateTax}>
//         <Text style={styles.buttonText}>Calculate</Text>
//       </TouchableOpacity>

//       {result && typeof result !== "string" && (
//         <View style={styles.outputBox}>
//           <Text>Monthly Tax: Rs {result.monthlyTax.toFixed(0)}</Text>
//           <Text>Monthly Rent After Tax: Rs {result.netMonthly.toFixed(0)}</Text>
//           <Text>Yearly Tax: Rs {result.annualTax.toFixed(0)}</Text>
//           <Text>Yearly Rent After Tax: Rs {result.netAnnual.toFixed(0)}</Text>
//         </View>
//       )}

//       {typeof result === "string" && <Text style={styles.error}>{result}</Text>}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   heading: { fontSize: 26, fontWeight: "800", color: "#0C0F6E", marginBottom: 20 },
//   label: { marginTop: 10, fontWeight: "600" },
//   input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginTop: 5 },
//   textInput: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginTop: 5 },
//   button: { backgroundColor: "#0C0F6E", padding: 15, marginTop: 20, borderRadius: 10 },
//   buttonText: { color: "white", textAlign: "center", fontWeight: "700" },
//   outputBox: { padding: 15, backgroundColor: "#F4F7FF", borderRadius: 10, marginTop: 20 },
//   error: { color: "red", marginTop: 10 },
// });


import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, MobileAds } from 'react-native-google-mobile-ads';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

export default function RentCalculator() {
  const [entity, setEntity] = useState("company");
  const [filer, setFiler] = useState("filer");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    MobileAds().initialize();

    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    interstitial.load();

    return unsubscribe;
  }, []);

  const calculateTax = () => {
    const rent = parseFloat(monthlyRent);
    if (!rent || rent <= 0) {
      setResult("Please enter valid rent.");
      return;
    }

    const annualRent = rent * 12;
    let annualTax = 0;

    if (entity === "company") {
      annualTax = filer === "filer" ? annualRent * 0.15 : annualRent * 0.30;
    } else {
      if (filer === "filer") {
        if (annualRent <= 300000) annualTax = 0;
        else if (annualRent <= 600000) annualTax = (annualRent - 300000) * 0.05;
        else if (annualRent <= 2000000) annualTax = 15000 + (annualRent - 600000) * 0.10;
        else annualTax = 155000 + (annualRent - 2000000) * 0.25;
      } else {
        if (annualRent <= 300000) annualTax = 0;
        else if (annualRent <= 600000) annualTax = (annualRent - 300000) * 0.10;
        else if (annualRent <= 2000000) annualTax = (15000 + (annualRent - 600000) * 0.10) * 2;
        else annualTax = (155000 + (annualRent - 2000000) * 0.25) * 2;
      }
    }

    setResult({
      monthlyTax: annualTax / 12,
      netMonthly: rent - annualTax / 12,
      annualRent,
      annualTax,
      netAnnual: annualRent - annualTax,
    });

    if (loaded) {
      interstitial.show();
      interstitial.load();
      setLoaded(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Rent Tax Calculator</Text>

      <Text style={styles.label}>Entity Type</Text>
      <Picker selectedValue={entity} onValueChange={setEntity} style={styles.input}>
        <Picker.Item label="Company" value="company" />
        <Picker.Item label="Individual / AOP" value="individual" />
      </Picker>

      <Text style={styles.label}>Filer Type</Text>
      <Picker selectedValue={filer} onValueChange={setFiler} style={styles.input}>
        <Picker.Item label="Filer" value="filer" />
        <Picker.Item label="Non-Filer" value="non-filer" />
      </Picker>

      <Text style={styles.label}>Monthly Rent</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        placeholder="Enter monthly rent"
        value={monthlyRent}
        onChangeText={setMonthlyRent}
      />

      <TouchableOpacity style={styles.button} onPress={calculateTax}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {result && typeof result !== "string" && (
        <View style={styles.outputBox}>
          <Text>Monthly Tax: Rs {result.monthlyTax.toFixed(0)}</Text>
          <Text>Monthly Rent After Tax: Rs {result.netMonthly.toFixed(0)}</Text>
          <Text>Yearly Tax: Rs {result.annualTax.toFixed(0)}</Text>
          <Text>Yearly Rent After Tax: Rs {result.netAnnual.toFixed(0)}</Text>
        </View>
      )}

      {typeof result === "string" && <Text style={styles.error}>{result}</Text>}

      <View style={{ marginTop: 20, alignItems: 'center' }}>
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
  container: { padding: 20 },
  heading: { fontSize: 26, fontWeight: "800", color: "#0C0F6E", marginBottom: 20 },
  label: { marginTop: 10, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginTop: 5 },
  textInput: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginTop: 5 },
  button: { backgroundColor: "#0C0F6E", padding: 15, marginTop: 20, borderRadius: 10 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "700" },
  outputBox: { padding: 15, backgroundColor: "#F4F7FF", borderRadius: 10, marginTop: 20 },
  error: { color: "red", marginTop: 10 },
});
