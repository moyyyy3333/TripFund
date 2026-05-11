import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { theme } from '../../theme';
import { useAuth } from '../../contexts/AuthContext';
import { useUserPools } from '../../hooks/useDatabase';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useAuth();
  const { pools, loading, error, refetch } = useUserPools();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const totalSaved = pools.reduce((sum, pool) => sum + pool.current_amount, 0);
  
  // Get gradient based on pool type
  const getPoolGradient = (type: string) => {
    switch (type) {
      case 'travel':
        return [theme.colors.primary, theme.colors.accent];
      case 'wedding':
        return [theme.colors.accent, theme.colors.gradientEnd];
      default:
        return [theme.colors.textSecondary, theme.colors.textTertiary];
    }
  };
  
  if (loading && pools.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.greeting, { marginTop: 16 }]}>Loading your pools...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.userName}>{profile?.full_name || 'User'}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Total saved card */}
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.totalCard}
        >
          <Text style={styles.totalLabel}>Total Saved</Text>
          <Text style={styles.totalAmount}>
            ${totalSaved.toLocaleString()}
          </Text>
          <View style={styles.totalStats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{pools.length}</Text>
              <Text style={styles.statLabel}>Active Pools</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>
                {Math.round((pools.reduce((sum, p) => sum + p.current_amount, 0) / pools.reduce((sum, p) => sum + p.goal_amount, 0)) * 100) || 0}%
              </Text>
              <Text style={styles.statLabel}>Overall Progress</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/pools/create')}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionEmoji}>➕</Text>
            </View>
            <Text style={styles.actionText}>Create Pool</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionEmoji}>💸</Text>
            </View>
            <Text style={styles.actionText}>Send Money</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionEmoji}>📊</Text>
            </View>
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionEmoji}>🌍</Text>
            </View>
            <Text style={styles.actionText}>Explore</Text>
          </TouchableOpacity>
        </View>

        {/* Active pools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Pools</Text>

          {pools.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>✈️</Text>
              <Text style={styles.emptyTitle}>No pools yet</Text>
              <Text style={styles.emptyText}>
                Create your first savings pool to get started!
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => router.push('/pools/create')}
              >
                <Text style={styles.emptyButtonText}>Create Pool</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {pools.map((pool) => {
            const gradient = getPoolGradient(pool.pool_type);
            const progress = (pool.current_amount / pool.goal_amount) * 100;
            
            return (
              <TouchableOpacity
                key={pool.id}
                style={styles.poolCard}
                activeOpacity={0.8}
              >
                {pool.cover_image_url ? (
                  <View style={styles.poolImageContainer}>
                    <Image
                      source={{ uri: pool.cover_image_url }}
                      style={styles.poolImage}
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                      style={styles.poolImageOverlay}
                    />
                  </View>
                ) : (
                  <LinearGradient
                    colors={gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.poolImageContainer}
                  />
                )}

                <View style={styles.poolContent}>
                  <Text style={styles.poolTitle}>{pool.title}</Text>
                  <Text style={styles.poolMembers}>
                    {pool.pool_type === 'travel' ? '✈️' : '💰'} {pool.pool_type.charAt(0).toUpperCase() + pool.pool_type.slice(1)}
                  </Text>

                  {/* Progress bar */}
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <LinearGradient
                        colors={gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                          styles.progressFill,
                          { width: `${Math.min(progress, 100)}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      ${pool.current_amount.toLocaleString()} / $
                      {pool.goal_amount.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Recent activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text>💰</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>
                  Sarah contributed $250
                </Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
              <Text style={styles.activityAmount}>+$250</Text>
            </View>

            <View style={styles.activityDivider} />

            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text>🎯</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>
                  Beach House goal reached!
                </Text>
                <Text style={styles.activityTime}>Yesterday</Text>
              </View>
              <Text style={styles.activityAmount}>✓</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: 60,
  },
  greeting: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  userName: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    fontSize: 20,
  },
  totalCard: {
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  totalLabel: {
    ...theme.typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: theme.spacing.xs,
  },
  totalAmount: {
    ...theme.typography.h1,
    fontSize: 40,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  totalStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flex: 1,
  },
  statValue: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  statLabel: {
    ...theme.typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: theme.spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  poolCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  poolImageContainer: {
    height: 120,
    width: '100%',
  },
  poolImage: {
    width: '100%',
    height: '100%',
  },
  poolImageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  poolContent: {
    padding: theme.spacing.md,
  },
  poolTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  poolMembers: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  progressContainer: {
    gap: theme.spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  activityCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  activityTime: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  activityAmount: {
    ...theme.typography.bodyBold,
    color: theme.colors.success,
  },
  activityDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  emptyTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  emptyButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  emptyButtonText: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
});
