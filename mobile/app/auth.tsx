import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { theme } from '../theme';
import { useAuth } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthScreen() {
  const [mode, setMode] = useState<'age-gate' | 'signup' | 'login'>('age-gate');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp, signIn } = useAuth();

  const handleAgeSubmit = async () => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 14) {
      Alert.alert('Age Requirement', 'You must be at least 14 years old to use TripFund.');
      return;
    }
    
    // Calculate date of birth (rough estimation)
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - ageNum;
    const dob = `${birthYear}-01-01`;
    setDateOfBirth(dob);
    
    // Mark that user has seen onboarding
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    
    setMode('signup');
  };

  const handleSignup = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    const { error } = await signUp(email, password, name, dateOfBirth);
    setLoading(false);
    
    if (error) {
      Alert.alert('Signup Error', error.message);
    } else {
      Alert.alert(
        'Success!',
        'Account created successfully. Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
      );
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    
    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      router.replace('/(tabs)');
    }
  };

  if (mode === 'age-gate') {
    return (
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientMid]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            <Text style={styles.emoji}>🎂</Text>
            <Text style={styles.title}>How old are you?</Text>
            <Text style={styles.subtitle}>
              You must be at least 14 years old to use TripFund
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Enter your age"
                placeholderTextColor={theme.colors.textTertiary}
                keyboardType="number-pad"
                maxLength={3}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleAgeSubmit}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }

  const isSignup = mode === 'signup';

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.authContent}>
          <View style={styles.header}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.logoGradient}
            >
              <Text style={styles.logo}>✈️</Text>
            </LinearGradient>
            <Text style={styles.appName}>TripFund</Text>
            <Text style={styles.tagline}>
              {isSignup ? 'Create your account' : 'Welcome back'}
            </Text>
          </View>

          <View style={styles.form}>
            {isSignup && (
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.authInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="John Doe"
                  placeholderTextColor={theme.colors.textTertiary}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.authInput}
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                placeholderTextColor={theme.colors.textTertiary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.authInput}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={theme.colors.textTertiary}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={isSignup ? handleSignup : handleLogin}
              disabled={loading}
            >
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                {loading ? (
                  <ActivityIndicator color={theme.colors.text} />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    {isSignup ? 'Create Account' : 'Log In'}
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchMode}
              onPress={() => setMode(isSignup ? 'login' : 'signup')}
            >
              <Text style={styles.switchText}>
                {isSignup
                  ? 'Already have an account? '
                  : "Don't have an account? "}
                <Text style={styles.switchLink}>
                  {isSignup ? 'Log In' : 'Sign Up'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  },
  inputContainer: {
    width: '100%',
    marginBottom: theme.spacing.xxl,
  },
  input: {
    ...theme.typography.body,
    fontSize: 24,
    color: theme.colors.text,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: theme.colors.text,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  buttonText: {
    ...theme.typography.bodyBold,
    color: theme.colors.textInverse,
    fontSize: 18,
  },
  authContent: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  logo: {
    fontSize: 40,
  },
  appName: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  authInput: {
    ...theme.typography.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  primaryButton: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
    fontSize: 18,
  },
  switchMode: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
  switchText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  switchLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
