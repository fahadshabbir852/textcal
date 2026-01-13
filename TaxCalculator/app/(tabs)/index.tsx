// import { useRouter } from "expo-router";
// import React from "react";
// import {
//   FlatList,
//   Image,
//   ImageSourcePropType,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// interface Feature {
//   id: string;
//   title: string;
//   icon: ImageSourcePropType;
//   route: string; 
// }

// // List of calculators
// const features: Feature[] = [
//   {
//     id: "1",
//     title: "Rent Calculator",
//     icon: require("../../assets/images/logo1.png"),
//     route: "/calculators/RentCalculator",
//   },
//   {
//     id: "2",
//     title: "Business Calculator",
//     icon: require("../../assets/images/logo1.png"),
//     route: "/calculators/BusinessCalculator",
//   },
//   {
//     id: "3",
//     title: "Salary Calculator",
//     icon: require("../../assets/images/logo1.png"),
//     route: "/calculators/SalaryCalculator",
//   },
// ];

// export default function HomeScreen() {
//   const router = useRouter();

//   // Render each calculator card
//   const renderItem = ({ item }: { item: Feature }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => router.push(item?.route)} // Navigate to the calculator
//     >
//       <Image source={item.icon} style={styles.cardIcon} />
//       <Text style={styles.cardTitle}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/images/logo1.png")}
//         style={styles.logo}
//       />
//       <Text style={styles.heading}>Welcome to Tax Calculator</Text>

//       <FlatList
//         data={features}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 40 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 22,
//     paddingTop: 60,
//   },
//   logo: {
//     width: 120,
//     height: 120,
//     alignSelf: "center",
//     marginBottom: 15,
//   },
//   heading: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: "#0C0F6E",
//     textAlign: "center",
//     marginBottom: 25,
//   },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 22,
//     marginBottom: 14,
//     borderRadius: 16,
//     backgroundColor: "#EAF1FF",
//     borderWidth: 1,
//     borderColor: "#0C0F6E33",
//     shadowColor: "#0C0F6E",
//     shadowOpacity: 0.12,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   cardIcon: {
//     width: 45,
//     height: 45,
//     marginRight: 18,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#0C0F6E",
//   },
// });


import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Feature {
  id: string;
  title: string;
  icon: ImageSourcePropType;
  route: string;
}

// List of calculators
const features: Feature[] = [
  {
    id: "1",
    title: "Rent Calculator",
    icon: require("../../assets/images/logo1.png"),
    route: "/calculators/RentCalculator",
  },
  {
    id: "2",
    title: "Business Calculator",
    icon: require("../../assets/images/logo1.png"),
    route: "/calculators/BusinessCalculator",
  },
  {
    id: "3",
    title: "Salary Calculator",
    icon: require("../../assets/images/logo1.png"),
    route: "/calculators/SalaryCalculator",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  // Mark device as test device for AdMob
  useEffect(() => {
    setTestDeviceIDAsync("EMULATOR"); // Always use test ads in development
  }, []);

  // Render each calculator card
  const renderItem = ({ item }: { item: Feature }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(item?.route)}
    >
      <Image source={item.icon} style={styles.cardIcon} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo1.png")}
        style={styles.logo}
      />
      <Text style={styles.heading}>Welcome to Tax Calculator</Text>

      <FlatList
        data={features}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Banner Ad at bottom */}
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // TEST ID
        servePersonalizedAds={true}
        onDidFailToReceiveAdWithError={(err) => console.log(err)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 22,
    paddingTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 15,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0C0F6E",
    textAlign: "center",
    marginBottom: 25,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 22,
    marginBottom: 14,
    borderRadius: 16,
    backgroundColor: "#EAF1FF",
    borderWidth: 1,
    borderColor: "#0C0F6E33",
    shadowColor: "#0C0F6E",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIcon: {
    width: 45,
    height: 45,
    marginRight: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0C0F6E",
  },
});
