import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../services/authService';
import { Brand } from '@/theme/brandColors';

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const hasCapital = /[A-Z]/.test(form.password);
  const hasNumber = /[0-9]/.test(form.password);
  const hasSymbol = /[^A-Za-z0-9]/.test(form.password);
  const hasLength = form.password.length >= 8;

  const handleSubmit = async () => {
    if (!form.email || !form.password || !form.first_name || !form.last_name) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (form.password !== form.confirm_password) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      await authService.register(form);
      setSuccessVisible(true);
      successTimer.current = setTimeout(() => {
        setSuccessVisible(false);
        router.replace('/login');
      }, 3000);
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successIconWrap}>
              <Ionicons name="checkmark-circle" size={44} color={Brand.primary} />
            </View>
            <Text style={styles.successTitle}>Registration Successful</Text>
            <Text style={styles.successSub}>Welcome to a simpler workflow.</Text>
          </View>
        </View>
      </Modal>

      <KeyboardAvoidingView
        style={[styles.flex, { paddingTop: insets.top }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.floatingBrand, { top: insets.top + 8 }]}>
          <Text style={styles.floatingBrandText}>less.</Text>
        </View>

        <View style={[styles.sheet, { paddingBottom: insets.bottom + 12 }]}>
          <TouchableOpacity
            onPress={() => router.replace('/login')}
            style={[styles.backBtn, { marginLeft: -4 }]}
            hitSlop={12}
          >
            <Ionicons name="arrow-back" size={22} color={Brand.onSurfaceVariant} />
          </TouchableOpacity>

          <ScrollView
            style={styles.scrollFlex}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.headingCenter}>
              <Text style={styles.title}>Create an account</Text>
              <Text style={styles.subtitle}>Join the movement toward focus.</Text>
            </View>

            <View style={styles.oauthRow}>
              <TouchableOpacity style={styles.oauthBtn} activeOpacity={0.85}>
                <Ionicons name="logo-google" size={20} color={Brand.onSurfaceVariant} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.oauthBtn} activeOpacity={0.85}>
                <Ionicons name="logo-apple" size={22} color={Brand.onSurface} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.oauthBtn} activeOpacity={0.85}>
                <Ionicons name="logo-microsoft" size={18} color={Brand.onSurfaceVariant} />
              </TouchableOpacity>
            </View>

            <View style={styles.oauthDividerRow}>
              <View style={styles.oauthLine} />
              <Text style={styles.oauthDividerLabel}>or register with email</Text>
              <View style={styles.oauthLine} />
            </View>

            <View style={styles.form}>
              <View style={styles.row}>
                <View style={styles.rowItem}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Jane"
                    placeholderTextColor={`${Brand.onSurfaceVariant}88`}
                    value={form.first_name}
                    onChangeText={(t) => handleChange('first_name', t)}
                  />
                </View>
                <View style={styles.rowItem}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Doe"
                    placeholderTextColor={`${Brand.onSurfaceVariant}88`}
                    value={form.last_name}
                    onChangeText={(t) => handleChange('last_name', t)}
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="jane@example.com"
                placeholderTextColor={`${Brand.onSurfaceVariant}88`}
                value={form.email}
                onChangeText={(t) => handleChange('email', t)}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Text style={[styles.inputLabel, { marginTop: 4 }]}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={`${Brand.onSurfaceVariant}88`}
                value={form.password}
                onChangeText={(t) => handleChange('password', t)}
                secureTextEntry
              />

              <Text style={[styles.inputLabel, { marginTop: 4 }]}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={`${Brand.onSurfaceVariant}88`}
                value={form.confirm_password}
                onChangeText={(t) => handleChange('confirm_password', t)}
                secureTextEntry
              />

              <View style={styles.strengthWrap}>
                <View style={styles.strengthBars}>
                  <View style={[styles.strengthSeg, hasLength && styles.strengthSeg1]} />
                  <View style={[styles.strengthSeg, hasCapital && styles.strengthSeg2]} />
                  <View style={[styles.strengthSeg, hasNumber && styles.strengthSeg3]} />
                  <View style={[styles.strengthSeg, hasSymbol && styles.strengthSeg4]} />
                </View>
                <View style={styles.strengthGrid}>
                  <StrengthRow ok={hasLength} label="8 Chars" />
                  <StrengthRow ok={hasCapital} label="1 Capital" />
                  <StrengthRow ok={hasNumber} label="1 Number" />
                  <StrengthRow ok={hasSymbol} label="1 Symbol" />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.createBtn, loading && styles.createBtnDisabled]}
                onPress={handleSubmit}
                disabled={loading}
                activeOpacity={0.9}
              >
                {loading ? (
                  <ActivityIndicator color={Brand.onPrimary} />
                ) : (
                  <Text style={styles.createBtnText}>Create Account</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.loginRow}>
              <Text style={styles.loginMuted}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace('/login')} hitSlop={8}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.footerLinks}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>terms</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

function StrengthRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <View style={styles.strengthRow}>
      <Ionicons
        name={ok ? 'checkmark-circle' : 'ellipse-outline'}
        size={14}
        color={ok ? Brand.primary : Brand.outlineVariant}
      />
      <Text style={[styles.strengthLabel, !ok && styles.strengthLabelMuted]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Brand.surfaceContainer,
  },
  floatingBrand: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  floatingBrandText: {
    fontSize: 22,
    fontWeight: '800',
    color: Brand.onSurface,
    letterSpacing: -0.5,
  },
  sheet: {
    flex: 1,
    backgroundColor: Brand.surface,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  scrollFlex: {
    flex: 1,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  headingCenter: {
    alignItems: 'center',
    marginBottom: 28,
    gap: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: Brand.onSurface,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Brand.onSurfaceVariant,
    textAlign: 'center',
  },
  oauthRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  oauthBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Brand.outlineVariant,
    backgroundColor: Brand.surface,
  },
  oauthDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  oauthLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Brand.outlineVariant,
  },
  oauthDividerLabel: {
    marginHorizontal: 10,
    fontSize: 10,
    fontWeight: '900',
    color: Brand.onSurfaceVariant,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  form: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  rowItem: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Brand.onSurfaceVariant,
    marginBottom: 8,
    marginLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: Brand.outlineVariant,
    backgroundColor: Brand.surfaceContainerLow,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 14,
    color: Brand.onSurface,
  },
  strengthWrap: {
    marginTop: 8,
    marginBottom: 8,
    gap: 16,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 6,
    height: 6,
  },
  strengthSeg: {
    flex: 1,
    borderRadius: 999,
    backgroundColor: Brand.outlineVariant,
  },
  strengthSeg1: {
    backgroundColor: `${Brand.primary}66`,
  },
  strengthSeg2: {
    backgroundColor: `${Brand.primary}99`,
  },
  strengthSeg3: {
    backgroundColor: `${Brand.primary}CC`,
  },
  strengthSeg4: {
    backgroundColor: Brand.primary,
  },
  strengthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '47%',
  },
  strengthLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Brand.onSurface,
  },
  strengthLabelMuted: {
    color: `${Brand.onSurfaceVariant}88`,
  },
  createBtn: {
    marginTop: 20,
    backgroundColor: Brand.primary,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: Brand.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  createBtnDisabled: {
    opacity: 0.75,
  },
  createBtnText: {
    color: Brand.onPrimary,
    fontSize: 17,
    fontWeight: '800',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginMuted: {
    fontSize: 14,
    fontWeight: '600',
    color: Brand.onSurfaceVariant,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '800',
    color: Brand.primary,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 28,
    paddingTop: 16,
    marginTop: 'auto',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: `${Brand.outlineVariant}55`,
  },
  footerLink: {
    fontSize: 11,
    fontWeight: '800',
    color: Brand.onSurfaceVariant,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: Brand.surfaceContainerLowest,
    borderRadius: 28,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Brand.outlineVariant,
  },
  successIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Brand.primary}14`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Brand.onSurface,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  successSub: {
    fontSize: 15,
    fontWeight: '600',
    color: Brand.onSurfaceVariant,
  },
});
