import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { useAuth } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const { session, loading } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      // Wait for auth to load
      if (loading) return;
      
      // Check if user has seen onboarding
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');

      if (!hasSeenOnboarding) {
        router.replace('/onboarding');
      } else if (!session) {
        router.replace('/auth');
      } else {
        router.replace('/(tabs)');
      }
    };

    checkAuth();
  }, [session, loading]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
