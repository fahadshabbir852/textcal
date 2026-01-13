import { Tabs } from 'expo-router';
import React, { useState } from 'react';

import AnimatedSplash from '@/components/AnimatedSplash';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Show splash screen before tabs
    return <AnimatedSplash />;
  }

  // Render your original Tabs after splash
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
