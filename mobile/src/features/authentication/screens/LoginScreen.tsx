import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, Modal } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../services/authService';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const router = useRouter();
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
      if (error.message && error.message.includes('Account not found')) {
        setErrorModalVisible(true);
      } else if (error.message && error.message.includes('Wrong password')) {
        Alert.alert('Login Failed', 'The password you entered is incorrect. Please try again.');
      } else {
        Alert.alert('Login Failed', error.message || 'Check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      {}
      <Modal
        visible={errorModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconBg}>
              <Ionicons name="person-add-outline" size={32} color="#264027" />
            </View>
            <Text style={styles.modalTitle}>Account Not Found</Text>
            <Text style={styles.modalSub}>
              We couldn't find an account with that email. Would you like to create a new one instead?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setErrorModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Try Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerBtn}
                onPress={() => {
                  setErrorModalVisible(false);
                  router.replace('/(auth)/register');
                }}
              >
                <Text style={styles.registerBtnText}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        {}
        <View style={styles.topSide}>
          <Text style={styles.brandText}>LESS</Text>
        </View>

        {}
        <View style={styles.bottomSide}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.title}>Sign in Account</Text>
              <Text style={styles.subtitle}>Enter your credentials to access your account.</Text>
            </View>

            {}
            <View style={styles.oauthContainer}>
              <TouchableOpacity style={styles.oauthButton}>
                <Ionicons name="logo-google" size={18} color="#EA4335" style={styles.oauthIcon} />
                <Text style={styles.oauthText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.oauthButton}>
                <Ionicons name="logo-microsoft" size={18} color="#00A4EF" style={styles.oauthIcon} />
                <Text style={styles.oauthText}>Microsoft</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or</Text>
              <View style={styles.separatorLine} />
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="eg. user@restaurant.com"
                  placeholderTextColor="#9CA3AF"
                  value={form.email}
                  onChangeText={(text) => handleChange('email', text)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  value={form.password}
                  onChangeText={(text) => handleChange('password', text)}
                  secureTextEntry
                />
                <Text style={styles.hintText}>Must be at least 8 characters.</Text>
              </View>

              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.signInButton, loading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.signInButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.replace('/(auth)/register')}>
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#264027',
  },
  topSide: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 4,
  },
  bottomSide: {
    flex: 0.65,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a2e35',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  oauthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  oauthButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oauthIcon: {
    marginRight: 8,
  },
  oauthText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  separatorText: {
    marginHorizontal: 12,
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#111827',
  },
  hintText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 6,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPassword: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  signInButton: {
    backgroundColor: '#264027',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#264027',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconBg: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#F0F7F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a2e35',
    marginBottom: 12,
  },
  modalSub: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  registerBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#264027',
    alignItems: 'center',
  },
  registerBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
