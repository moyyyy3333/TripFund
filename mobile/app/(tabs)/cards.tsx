import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme';

export default function CardsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cards</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Virtual card */}
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardType}>Virtual Card</Text>
            <Text style={styles.cardIcon}>💳</Text>
          </View>

          <Text style={styles.cardNumber}>•••• •••• •••• 4242</Text>

          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardLabel}>Cardholder</Text>
              <Text style={styles.cardValue}>Mark Opdenhoff</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expires</Text>
              <Text style={styles.cardValue}>12/28</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Card actions */}
        <View style={styles.actions}>
          <View style={styles.actionCard}>
            <Text style={styles.actionIcon}>🔒</Text>
            <Text style={styles.actionTitle}>Freeze Card</Text>
            <Text style={styles.actionDescription}>
              Temporarily disable transactions
            </Text>
          </View>

          <View style={styles.actionCard}>
            <Text style={styles.actionIcon}>⚙️</Text>
            <Text style={styles.actionTitle}>Card Settings</Text>
            <Text style={styles.actionDescription}>
              Limits, controls & more
            </Text>
          </View>
        </View>

        {/* Coming soon section */}
        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonIcon}>🎉</Text>
          <Text style={styles.comingSoonTitle}>Physical Cards</Text>
          <Text style={styles.comingSoonText}>
            Request a physical debit card for any pool. Coming soon!
          </Text>
        </View>
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 60,
    paddingBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
  },
  card: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    height: 200,
    justifyContent: 'space-between',
    ...theme.shadows.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    ...theme.typography.caption,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  cardIcon: {
    fontSize: 24,
  },
  cardNumber: {
    ...theme.typography.h2,
    color: theme.colors.text,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    ...theme.typography.caption,
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 2,
  },
  cardValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  actionCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },
  actionTitle: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  comingSoon: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  comingSoonIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.sm,
  },
  comingSoonTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  comingSoonText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
