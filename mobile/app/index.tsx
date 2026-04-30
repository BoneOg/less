import { Redirect } from 'expo-router';

export default function Index() {
  // In a real app, check for authentication here
  return <Redirect href="/login" />;
}
