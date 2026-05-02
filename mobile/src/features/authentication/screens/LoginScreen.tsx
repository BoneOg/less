import { useState } from 'react';
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
import * as SecureStore from 'expo-secure-store';
import { Brand } from '@/theme/brandColors';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.login(form);
      if (data.access) {
        await SecureStore.setItemAsync('userToken', data.access);
      }
      router.replace('/(main)/dashboard');
    } catch (error: any) {
      const msg = error.message || '';
      if (msg.includes('Account not found')) {
        setErrorModalVisible(true);
      } else if (msg.includes('Wrong password')) {
        Alert.alert('Login Failed', 'The password you entered is incorrect. Please try again.');
      } else {
        Alert.alert('Invalid credentials', msg || 'Check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Modal
        visible={errorModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconBg}>
              <Ionicons name="person-add" size={32} color={Brand.onPrimaryContainer} />
            </View>
            <Text style={styles.modalTitle}>Account Not Found</Text>
            <Text style={styles.modalSub}>
              {`We couldn't find an account with that email address. Would you like to create a new one instead?`}
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setErrorModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Try Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerBtn}
                onPress={() => {
                  setErrorModalVisible(false);
                  router.push('/register');
                }}
              >
                <Text style={styles.registerBtnText}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <KeyboardAvoidingView
        style={[styles.flex, { paddingTop: insets.top }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.brandStrip}>
          <Text style={styles.brandHuge}>
            less<Text style={styles.brandDot}>.</Text>
          </Text>
        </View>

        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity
            onPress={() => router.replace('/')}
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
            <View style={styles.headingBlock}>
              <Text style={styles.title}>Welcome back.</Text>
              <Text style={styles.subtitle}>Simplify your workspace and find your focus.</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={`${Brand.onSurfaceVariant}88`}
                value={form.email}
                onChangeText={(t) => handleChange('email', t)}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Text style={[styles.inputLabel, { marginTop: 20 }]}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={`${Brand.onSurfaceVariant}88`}
                value={form.password}
                onChangeText={(t) => handleChange('password', t)}
                secureTextEntry
              />
              <TouchableOpacity style={styles.forgotWrap} activeOpacity={0.7}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
                onPress={handleSubmit}
                disabled={loading}
                activeOpacity={0.9}
              >
                {loading ? (
                  <ActivityIndicator color={Brand.onPrimary} />
                ) : (
                  <Text style={styles.loginBtnText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.oauthDividerRow}>
              <View style={styles.oauthLine} />
              <Text style={styles.oauthDividerLabel}>Sign in with</Text>
              <View style={styles.oauthLine} />
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

            <View style={styles.signUpRow}>
              <Text style={styles.signUpMuted}>New to less? </Text>
              <TouchableOpacity onPress={() => router.push('/register')} hitSlop={8}>
                <Text style={styles.signUpLink}>Sign up</Text>
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

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Brand.background,
  },
  brandStrip: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Brand.outlineVariant,
    overflow: 'hidden',
  },
  brandHuge: {
    fontSize: 56,
    fontWeight: '900',
    color: Brand.primary,
    letterSpacing: -4,
    opacity: 0.85,
  },
  brandDot: {
    color: Brand.primaryContainer,
  },
  sheet: {
    flex: 1,
    backgroundColor: Brand.surface,
    paddingHorizontal: 24,
    paddingTop: 8,
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
    marginBottom: 8,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  headingBlock: {
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: Brand.onSurface,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Brand.onSurfaceVariant,
  },
  form: {
    marginBottom: 8,
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 14,
    color: Brand.onSurface,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 8,
  },
  forgotText: {
    fontSize: 11,
    fontWeight: '900',
    color: Brand.onSurfaceVariant,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  loginBtn: {
    marginTop: 20,
    backgroundColor: Brand.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Brand.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  loginBtnDisabled: {
    opacity: 0.75,
  },
  loginBtnText: {
    color: Brand.onPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  oauthDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 20,
  },
  oauthLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Brand.outlineVariant,
  },
  oauthDividerLabel: {
    marginHorizontal: 12,
    fontSize: 10,
    fontWeight: '900',
    color: Brand.onSurfaceVariant,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  oauthRow: {
    flexDirection: 'row',
    gap: 12,
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
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
  },
  signUpMuted: {
    fontSize: 14,
    fontWeight: '600',
    color: Brand.onSurfaceVariant,
  },
  signUpLink: {
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
    fontSize: 10,
    fontWeight: '900',
    color: Brand.onSurfaceVariant,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: Brand.surface,
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Brand.outlineVariant,
  },
  modalIconBg: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Brand.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Brand.onSurface,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  modalSub: {
    fontSize: 14,
    fontWeight: '600',
    color: Brand.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: Brand.surfaceContainerLow,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 11,
    fontWeight: '900',
    color: Brand.onSurfaceVariant,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  registerBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: Brand.primary,
    alignItems: 'center',
  },
  registerBtnText: {
    fontSize: 11,
    fontWeight: '900',
    color: Brand.onPrimary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
