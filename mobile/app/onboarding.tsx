import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

const onboardingScreens = [
  {
    title: 'Save Together,\nTravel Together',
    subtitle: 'Create group savings pools with friends and family. Watch your dream trip come to life.',
    emoji: '✈️',
    gradient: [theme.colors.gradientStart, theme.colors.gradientMid],
  },
  {
    title: 'Everyone Contributes',
    subtitle: 'Track contributions in real-time. Celebrate milestones together. Stay motivated.',
    emoji: '💰',
    gradient: [theme.colors.gradientMid, theme.colors.gradientEnd],
  },
  {
    title: 'Safe & Locked',
    subtitle: 'Funds stay secure. Withdrawals require unanimous group approval. Trust built-in.',
    emoji: '🔒',
    gradient: [theme.colors.primary, theme.colors.accent],
  },
  {
    title: 'Ready When You Are',
    subtitle: 'Get instant debit cards. Plan your trip. Make memories. It\'s that simple.',
    emoji: '🎉',
    gradient: [theme.colors.accent, theme.colors.gradientEnd],
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const isLastScreen = currentIndex === onboardingScreens.length - 1;
  const screen = onboardingScreens[currentIndex];

  const handleNext = () => {
    if (isLastScreen) {
      router.push('/auth');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    router.push('/auth');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={screen.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Skip button */}
          {!isLastScreen && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          {/* Main content */}
          <View style={styles.mainContent}>
            <Text style={styles.emoji}>{screen.emoji}</Text>
            <Text style={styles.title}>{screen.title}</Text>
            <Text style={styles.subtitle}>{screen.subtitle}</Text>
          </View>

          {/* Progress dots */}
          <View style={styles.dotsContainer}>
            {onboardingScreens.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>

          {/* Next/Get Started button */}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {isLastScreen ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'space-between',
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: theme.spacing.sm,
  },
  skipText: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h1,
    fontSize: 36,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
    lineHeight: 28,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: theme.colors.text,
    width: 24,
  },
  button: {
    backgroundColor: theme.colors.text,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  buttonText: {
    ...theme.typography.bodyBold,
    color: theme.colors.textInverse,
    fontSize: 18,
  },
});
