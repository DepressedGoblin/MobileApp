import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.inner}>
        <Text style={styles.wordmark}>IndieGate</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.bg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  inner: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordmark: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.textStrong,
    letterSpacing: -0.5,
  },
});
