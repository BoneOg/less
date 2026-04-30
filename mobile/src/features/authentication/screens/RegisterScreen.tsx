import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState({ 
    first_name: '', 
    last_name: '', 
    email: '', 
    password: '',
    confirm_password: '' 
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (form.password !== form.confirm_password) {
      alert('Passwords do not match!');
      return;
    }
    alert('Registration successful! You can now log in.');
    router.replace('/(auth)/login');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.topSide}>
          <Text style={styles.brandText}>LESS</Text>
        </View>
        <View style={styles.bottomSide}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Enter your details to get started.</Text>
            </View>

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
              <View style={styles.rowContainer}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="eg. John"
                    placeholderTextColor="#9CA3AF"
                    value={form.first_name}
                    onChangeText={(text) => handleChange('first_name', text)}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="eg. Santos"
                    placeholderTextColor="#9CA3AF"
                    value={form.last_name}
                    onChangeText={(text) => handleChange('last_name', text)}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="eg. owner@restaurant.com"
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

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Re-enter your password"
                  placeholderTextColor="#9CA3AF"
                  value={form.confirm_password}
                  onChangeText={(text) => handleChange('confirm_password', text)}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={[styles.signInButton, { marginTop: 8 }]} onPress={handleSubmit}>
                <Text style={styles.signInButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
                <Text style={styles.registerLink}>Sign In</Text>
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
    flex: 0.3, // Slightly reduced to give form more scroll space compared to login
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
    flex: 0.7,
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
    marginBottom: 24,
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
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    marginBottom: 16,
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
  signInButton: {
    backgroundColor: '#264027',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
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
});
