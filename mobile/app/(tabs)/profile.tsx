import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { theme } from '../../theme';
import { useAuth } from '../../contexts/AuthContext';
import { useUserPools } from '../../hooks/useDatabase';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, signOut } = useAuth();
  const { pools } = useUserPools();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/auth');
          },
        },
      ]
    );
  };

  const totalSaved = pools.reduce((sum, pool) => sum + pool.current_amount, 0);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile header */}
        <View style={styles.header}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>
              {profile?.full_name?.[0]?.toUpperCase() || 'U'}
            </Text>
          </LinearGradient>
          <Text style={styles.name}>{profile?.full_name || 'User'}</Text>
          <Text style={styles.username}>@{profile?.username || 'user'}</Text>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Active Pools</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>$12.4K</Text>
            <Text style={styles.statLabel}>Total Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
        </View>

        {/* Menu sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>👤</Text>
            <Text style={styles.menuText}>Personal Information</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔐</Text>
            <Text style={styles.menuText}>Security & Privacy</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>💳</Text>
            <Text style={styles.menuText}>Payment Methods</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={styles.menuText}>Notifications</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🎨</Text>
            <Text style={styles.menuText}>Appearance</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🌐</Text>
            <Text style={styles.menuText}>Language & Region</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={styles.menuText}>Help Center</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📧</Text>
            <Text style={styles.menuText}>Contact Us</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>⭐</Text>
            <Text style={styles.menuText}>Rate TripFund</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Premium upgrade */}
        <LinearGradient
          colors={[theme.colors.premium, theme.colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.premiumCard}
        >
          <Text style={styles.premiumIcon}>👑</Text>
          <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
          <Text style={styles.premiumText}>
            Get physical cards, advanced analytics, and exclusive features
          </Text>
          <TouchableOpacity style={styles.premiumButton}>
            <Text style={styles.premiumButtonText}>Learn More</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    paddingTop: 80,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarText: {
    ...theme.typography.h1,
    fontSize: 40,
    color: theme.colors.text,
  },
  name: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: 4,
  },
  username: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 2,
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: theme.colors.border,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    marginHorizontal: theme.spacing.lg,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    marginBottom: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: theme.spacing.md,
  },
  menuText: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  menuArrow: {
    ...theme.typography.h2,
    color: theme.colors.textTertiary,
    fontWeight: '300',
  },
  premiumCard: {
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  premiumIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.sm,
  },
  premiumTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  premiumText: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  premiumButton: {
    backgroundColor: theme.colors.text,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  premiumButtonText: {
    ...theme.typography.bodyBold,
    color: theme.colors.textInverse,
  },
  signOutButton: {
    marginHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  signOutText: {
    ...theme.typography.bodyBold,
    color: theme.colors.error,
  },
});
