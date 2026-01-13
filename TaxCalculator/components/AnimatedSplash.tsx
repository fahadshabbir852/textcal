import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedSplashProps {
  onFinish: () => void;
}

const { width } = Dimensions.get('window');

const AnimatedSplash: React.FC<AnimatedSplashProps> = ({ onFinish }) => {
  const wave = useSharedValue(0);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    wave.value = withRepeat(
      withTiming(20, { duration: 2000, easing: Easing.linear }),
      -1,
      true
    );

    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
      onFinish();
    }, 3000); // show for 3 sec

    return () => clearTimeout(timer);
  }, []);

  const waveStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: wave.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/logo1.png')}
        style={[styles.logo, waveStyle]}
        resizeMode="contain"
      />
      <Text style={styles.appName}>Tax Calculator</Text>
      <Text style={styles.appBrand}>Powered by Muhasib & Co</Text>
    </View>
  );
};

export default AnimatedSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F6E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 20,
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  appBrand: {
    fontSize: 15,
    color: '#fff',
    marginTop: 8,
  },
});
