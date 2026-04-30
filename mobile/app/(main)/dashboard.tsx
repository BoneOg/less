import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal, Animated, Dimensions, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { authService } from '../../src/services/authService';

const { width, height } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const [user, setUser] = useState({ first_name: 'Owner', role: 'owner' });
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchUserData();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fetchUserData = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        const profile = await authService.getUserProfile(token);
        setUser(profile);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setLogoutVisible(false);
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* ── LOGOUT MODAL ── */}
      <Modal
        visible={logoutVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLogoutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconBg}>
              <Ionicons name="log-out" size={32} color="#EF4444" />
            </View>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalSub}>Are you sure you want to log out? You'll need to sign in again to access your dashboard.</Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelBtn} 
                onPress={() => setLogoutVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.logoutBtn} 
                onPress={handleLogout}
              >
                <Text style={styles.logoutBtnText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ── TOP NAV ── */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <View style={styles.brandIconBg}>
            <Ionicons name="restaurant" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.brandText}>LESS</Text>
        </View>
        <TouchableOpacity onPress={() => setLogoutVisible(true)} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={22} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          
          {/* ── WELCOME SECTION ── */}
          <View style={styles.welcomeSection}>
            <Text style={styles.greetingText}>Good evening,</Text>
            <Text style={styles.welcomeTitle}>{user.first_name}</Text>
            <View style={styles.roleBadge}>
              <View style={styles.onlineDot} />
              <Text style={styles.roleText}>{user.role.toUpperCase()}</Text>
            </View>
          </View>

          {/* ── METRIC CARDS ── */}
          <View style={styles.metricsGrid}>
            <StatCard icon="cube" label="Ingredients" value="142" trend="+5" color="#10B981" />
            <StatCard icon="restaurant" label="Menu Items" value="24" trend="85%" color="#3B82F6" />
            <StatCard icon="trending-up" label="Avg. Margin" value="32.4%" trend="-1.2%" color="#F59E0B" />
            <StatCard icon="alert-circle" label="Cost Alerts" value="4" trend="Now" color="#EF4444" />
          </View>

          {/* ── PRICE TRENDS ── */}
          <View style={styles.whiteCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>Price Trends</Text>
                <Text style={styles.cardSub}>30 DAY MARKET FLUCTUATION</Text>
              </View>
              <View style={styles.miniToggle}>
                <Text style={styles.miniToggleText}>WEEKLY</Text>
              </View>
            </View>
            <View style={styles.chartArea}>
              {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85].map((h, i) => (
                <View key={i} style={styles.barWrapper}>
                  <View style={[styles.bar, { height: `${h}%`, backgroundColor: i % 3 === 0 ? '#10B981' : i % 3 === 1 ? '#6EE7B7' : '#E2E8F0' }]} />
                </View>
              ))}
            </View>
          </View>

          {/* ── OCR HISTORY ── */}
          <View style={styles.slateCard}>
            <View style={styles.cardHeader}>
              <View style={styles.row}>
                <View style={styles.emeraldIconCircle}>
                  <Ionicons name="camera" size={16} color="#FFFFFF" />
                </View>
                <Text style={[styles.cardTitle, { color: '#FFFFFF', marginLeft: 10 }]}>OCR History</Text>
              </View>
              <View style={styles.liveBadge}>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>
            <View style={styles.activityList}>
              <ActivityItem supplier="Supplier #402" category="Meat" time="2h ago" value="₱12,450" alert="+2 Hikes" type="danger" />
              <ActivityItem supplier="Daily Veggies" category="Produce" time="5h ago" value="₱3,200" alert="Stable" type="safe" />
              <ActivityItem supplier="Ocean Harvest" category="Seafood" time="1d ago" value="₱8,100" alert="Fixed" type="neutral" />
            </View>
          </View>

          {/* ── MENU OPTIMIZATION ── */}
          <View style={styles.whiteCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>Menu Optimization</Text>
                <Text style={styles.cardSub}>SMART RECOMMENDATIONS</Text>
              </View>
              <Ionicons name="sparkles" size={20} color="#10B981" />
            </View>
            <View style={styles.recList}>
              <RecommendationRow item="Classic Beef Burger" reason="Beef ↑ 12%" action="Increase" amount="+₱15" type="danger" />
              <RecommendationRow item="Chicken Alfredo" reason="Poultry ↓ 4%" action="Keep" amount="₱0" type="safe" />
            </View>
          </View>

          {/* ── QUICK SYSTEM ACTIONS ── */}
          <View style={styles.actionsGrid}>
            <QuickActionCard icon="archive" label="Inventory" />
            <QuickActionCard icon="people" label="Staff" />
            <QuickActionCard icon="settings" label="Settings" />
            <QuickActionCard icon="chatbubbles" label="Support" />
          </View>

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── COMPONENTS ──

function StatCard({ icon, label, value, trend, color }: any) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconBox, { backgroundColor: color + '10', borderColor: color + '20' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.rowBetween}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={[styles.statTrend, { color, backgroundColor: color + '10', borderColor: color + '20' }]}>{trend}</Text>
      </View>
    </View>
  );
}

function ActivityItem({ supplier, category, time, value, alert, type }: any) {
  const alertColor = type === 'danger' ? '#F87171' : type === 'safe' ? '#34D399' : '#94A3B8';
  return (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <Ionicons name="receipt" size={18} color="#94A3B8" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.activityName}>{supplier}</Text>
        <Text style={styles.activityMeta}>{category} • {time}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.activityValue}>{value}</Text>
        <Text style={[styles.activityAlert, { color: alertColor }]}>{alert}</Text>
      </View>
    </View>
  );
}

function RecommendationRow({ item, reason, action, amount, type }: any) {
  const dotColor = type === 'danger' ? '#EF4444' : type === 'safe' ? '#10B981' : '#F59E0B';
  return (
    <View style={styles.recRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.recItem}>{item}</Text>
        <Text style={styles.recReason}>{reason}</Text>
      </View>
      <View style={styles.row}>
        <View style={{ alignItems: 'flex-end', marginRight: 12 }}>
          <Text style={styles.recAction}>{action}</Text>
          <Text style={[styles.recAmount, { color: dotColor }]}>{amount}</Text>
        </View>
        <View style={[styles.statusDot, { backgroundColor: dotColor }]} />
      </View>
    </View>
  );
}

function QuickActionCard({ icon, label }: any) {
  return (
    <TouchableOpacity style={styles.actionCard}>
      <View style={styles.actionIconBox}>
        <Ionicons name={icon} size={28} color="#94A3B8" />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFD' },
  header: {
    height: 80,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  brandContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  brandIconBg: { backgroundColor: '#10B981', padding: 8, borderRadius: 12 },
  brandText: { fontSize: 20, fontWeight: '900', color: '#1E293B', letterSpacing: -1 },
  logoutButton: { padding: 10, backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  scrollContent: { padding: 24 },
  welcomeSection: { marginBottom: 32 },
  greetingText: { fontSize: 13, color: '#94A3B8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  welcomeTitle: { fontSize: 36, fontWeight: '900', color: '#1E293B', letterSpacing: -1.5, marginBottom: 12 },
  roleBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
  roleText: { fontSize: 11, fontWeight: '900', color: '#10B981', letterSpacing: 1 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 32 },
  statCard: { width: (width - 48 - 12) / 2, backgroundColor: '#FFFFFF', padding: 20, borderRadius: 28, borderWidth: 1, borderColor: '#F1F5F9' },
  statIconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1 },
  statLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '900', color: '#1E293B' },
  statTrend: { fontSize: 9, fontWeight: '900', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, borderWidth: 1, overflow: 'hidden' },
  whiteCard: { backgroundColor: '#FFFFFF', borderRadius: 32, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: '#F1F5F9' },
  slateCard: { backgroundColor: '#1E293B', borderRadius: 32, padding: 24, marginBottom: 24 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  cardTitle: { fontSize: 18, fontWeight: '900', color: '#1E293B' },
  cardSub: { fontSize: 9, fontWeight: '900', color: '#94A3B8', letterSpacing: 1, marginTop: 2 },
  miniToggle: { backgroundColor: '#F8FAFC', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  miniToggleText: { fontSize: 9, fontWeight: '900', color: '#10B981' },
  chartArea: { height: 160, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 6 },
  barWrapper: { flex: 1, height: '100%', backgroundColor: '#F8FAFC', borderRadius: 6, justifyContent: 'flex-end', overflow: 'hidden' },
  bar: { width: '100%', borderRadius: 6 },
  emeraldIconCircle: { backgroundColor: '#10B981', padding: 8, borderRadius: 12 },
  liveBadge: { backgroundColor: 'rgba(16, 185, 129, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)' },
  liveText: { fontSize: 9, fontWeight: '900', color: '#10B981' },
  activityList: { gap: 20 },
  activityItem: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  activityIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  activityName: { fontSize: 14, fontWeight: '800', color: '#FFFFFF' },
  activityMeta: { fontSize: 10, color: '#64748B', fontWeight: '700', textTransform: 'uppercase' },
  activityValue: { fontSize: 14, fontWeight: '900', color: '#FFFFFF' },
  activityAlert: { fontSize: 10, fontWeight: '900', textTransform: 'uppercase' },
  recList: { gap: 12 },
  recRow: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#F8FAFC', borderRadius: 20 },
  recItem: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  recReason: { fontSize: 10, color: '#94A3B8', fontWeight: '800', textTransform: 'uppercase', marginTop: 2 },
  recAction: { fontSize: 12, fontWeight: '900', color: '#1E293B', textTransform: 'uppercase' },
  recAmount: { fontSize: 10, fontWeight: '900' },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 40 },
  actionCard: { width: (width - 48 - 16) / 2, backgroundColor: '#FFFFFF', padding: 24, borderRadius: 32, alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  actionIconBox: { width: 64, height: 64, borderRadius: 22, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  actionLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(30, 41, 59, 0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalContent: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 32, padding: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 },
  modalIconBg: { width: 72, height: 72, borderRadius: 24, backgroundColor: '#FEF2F2', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 24, fontWeight: '900', color: '#1E293B', marginBottom: 12 },
  modalSub: { fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 22, marginBottom: 32, fontWeight: '500' },
  modalActions: { flexDirection: 'row', gap: 12, width: '100%' },
  cancelBtn: { flex: 1, paddingVertical: 16, borderRadius: 16, backgroundColor: '#F8FAFC', alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  cancelBtnText: { fontSize: 14, fontWeight: '800', color: '#64748B' },
  logoutBtn: { flex: 1, paddingVertical: 16, borderRadius: 16, backgroundColor: '#EF4444', alignItems: 'center' },
  logoutBtnText: { fontSize: 14, fontWeight: '800', color: '#FFFFFF' },
});
