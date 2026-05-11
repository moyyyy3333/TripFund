import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

function TabBarIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    index: '🏠',
    pools: '✈️',
    cards: '💳',
    profile: '👤',
  };

  return (
    <View style={[styles.iconContainer, focused && styles.iconFocused]}>
      <Text style={styles.icon}>{icons[name] || '📱'}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon name="index" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="pools"
        options={{
          title: 'Pools',
          tabBarIcon: ({ focused }) => <TabBarIcon name="pools" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'Cards',
          tabBarIcon: ({ focused }) => <TabBarIcon name="cards" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon name="profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.surface,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
  },
  tabBarLabel: {
    ...theme.typography.caption,
    fontSize: 11,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  iconFocused: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  icon: {
    fontSize: 22,
  },
});
