import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { theme } from '../../theme';

const mockPools = [
  {
    id: '1',
    title: 'Tokyo Adventure',
    goal: 15000,
    current: 8450,
    members: ['You', 'Sarah', 'Mike', 'Alex'],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    type: 'travel',
    daysLeft: 45,
  },
  {
    id: '2',
    title: 'Beach House Weekend',
    goal: 3000,
    current: 2750,
    members: ['You', 'Emma', 'James'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    type: 'travel',
    daysLeft: 12,
  },
  {
    id: '3',
    title: 'Emergency Fund',
    goal: 5000,
    current: 1200,
    members: ['You'],
    type: 'personal',
    daysLeft: 180,
  },
  {
    id: '4',
    title: 'Road Trip to Colorado',
    goal: 2500,
    current: 950,
    members: ['You', 'John', 'Lisa'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    type: 'travel',
    daysLeft: 60,
  },
];

export default function PoolsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'travel' | 'personal'>('all');
  const router = useRouter();

  const filteredPools = mockPools.filter((pool) => {
    const matchesSearch = pool.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterTab === 'all' || pool.type === filterTab;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Savings Pools</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/pools/create')}
        >
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.createGradient}
          >
            <Text style={styles.createButtonText}>+ Create Pool</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search pools..."
          placeholderTextColor={theme.colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter tabs */}
      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.tab, filterTab === 'all' && styles.activeTab]}
          onPress={() => setFilterTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              filterTab === 'all' && styles.activeTabText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, filterTab === 'travel' && styles.activeTab]}
          onPress={() => setFilterTab('travel')}
        >
          <Text
            style={[
              styles.tabText,
              filterTab === 'travel' && styles.activeTabText,
            ]}
          >
            ✈️ Travel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, filterTab === 'personal' && styles.activeTab]}
          onPress={() => setFilterTab('personal')}
        >
          <Text
            style={[
              styles.tabText,
              filterTab === 'personal' && styles.activeTabText,
            ]}
          >
            💰 Personal
          </Text>
        </TouchableOpacity>
      </View>

      {/* Pools list */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredPools.map((pool) => {
          const progress = (pool.current / pool.goal) * 100;
          return (
            <TouchableOpacity
              key={pool.id}
              style={styles.poolCard}
              activeOpacity={0.8}
            >
              {pool.image ? (
                <View style={styles.poolImageWrapper}>
                  <Image
                    source={{ uri: pool.image }}
                    style={styles.poolImage}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
                    style={styles.imageGradient}
                  >
                    <View style={styles.poolHeader}>
                      <View>
                        <Text style={styles.poolTitle}>{pool.title}</Text>
                        <Text style={styles.poolMembers}>
                          {pool.members.length} member
                          {pool.members.length !== 1 ? 's' : ''}
                        </Text>
                      </View>
                      <View style={styles.daysLeft}>
                        <Text style={styles.daysLeftText}>
                          {pool.daysLeft}d
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              ) : (
                <LinearGradient
                  colors={[theme.colors.textSecondary, theme.colors.textTertiary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.poolImageWrapper}
                >
                  <View style={styles.poolHeader}>
                    <View>
                      <Text style={styles.poolTitle}>{pool.title}</Text>
                      <Text style={styles.poolMembers}>
                        {pool.members.length} member
                        {pool.members.length !== 1 ? 's' : ''}
                      </Text>
                    </View>
                    <View style={styles.daysLeft}>
                      <Text style={styles.daysLeftText}>
                        {pool.daysLeft}d
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              )}

              <View style={styles.poolDetails}>
                <View style={styles.progressInfo}>
                  <Text style={styles.currentAmount}>
                    ${pool.current.toLocaleString()}
                  </Text>
                  <Text style={styles.goalAmount}>
                    of ${pool.goal.toLocaleString()} goal
                  </Text>
                </View>

                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <LinearGradient
                      colors={[theme.colors.primary, theme.colors.accent]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.progressFill, { width: `${progress}%` }]}
                    />
                  </View>
                  <Text style={styles.progressPercentage}>
                    {progress.toFixed(0)}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 60,
    paddingBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  createButton: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  createGradient: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  createButtonText: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    height: 48,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  tab: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
  },
  activeTab: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  tabText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
  },
  poolCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  poolImageWrapper: {
    height: 140,
    justifyContent: 'flex-end',
  },
  poolImage: {
    ...StyleSheet.absoluteFillObject,
  },
  imageGradient: {
    padding: theme.spacing.md,
  },
  poolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  poolTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  poolMembers: {
    ...theme.typography.caption,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  daysLeft: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  daysLeftText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    fontWeight: '600',
  },
  poolDetails: {
    padding: theme.spacing.md,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  currentAmount: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  goalAmount: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressPercentage: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '600',
    minWidth: 35,
    textAlign: 'right',
  },
});
