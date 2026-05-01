import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ first_name: 'User', role: 'user' });

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => router.replace('/login') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <Ionicons name="stats-chart" size={24} color="#264027" />
          <Text style={styles.brandText}>LESS</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#6B7280" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome, {user.first_name}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>ROLE: <Text style={styles.roleValue}>{user.role.toUpperCase()}</Text></Text>
          </View>
        </View>

        {}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Restaurant User Workspace</Text>
          <Text style={styles.cardDescription}>
            Manage menus, staff permissions, and overarching financial costings here.
          </Text>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Active Menus</Text>
              <Text style={styles.statValue}>12</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Staff Count</Text>
              <Text style={styles.statValue}>8</Text>
            </View>
          </View>
        </View>

        {}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="restaurant-outline" size={24} color="#264027" />
            <Text style={styles.actionText}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people-outline" size={24} color="#264027" />
            <Text style={styles.actionText}>Staff</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="cash-outline" size={24} color="#264027" />
            <Text style={styles.actionText}>Finances</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings-outline" size={24} color="#264027" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#264027',
    letterSpacing: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  scrollContent: {
    padding: 20,
  },
  welcomeSection: {
    marginBottom: 25,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a2e35',
    marginBottom: 5,
  },
  roleBadge: {
    flexDirection: 'row',
  },
  roleText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  roleValue: {
    color: '#264027',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 25,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a2e35',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#264027',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a2e35',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a2e35',
  },
});
