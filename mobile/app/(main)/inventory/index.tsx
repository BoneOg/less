import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function PlaceholderScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.subtitle}>This feature is currently under development.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFD' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  title: { fontSize: 24, fontWeight: '900', color: '#1E293B', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#94A3B8', textAlign: 'center', fontWeight: '600' }
});
