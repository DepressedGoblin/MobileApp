import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import Header from '@/components/Header';
import Button from '@/components/Button';
import { Colors } from '@/constants/theme';
import { GENRES, PLATFORMS, STAGES, initialPlatformMap } from '@/constants/filters';

export default function SubmitScreen() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [platformError, setPlatformError] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [pitch, setPitch] = useState('');
  const [genre, setGenre] = useState('');
  const [stage, setStage] = useState('');
  const [platforms, setPlatforms] = useState(initialPlatformMap());
  const [buildUrl, setBuildUrl] = useState('');
  const [focus, setFocus] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  function togglePlatform(id: string) {
    setPlatformError(false);
    setPlatforms((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleSubmit() {
    if (!title || !pitch || !genre || !stage || !focus || !email || !consent) {
      alert('Please fill out all required fields.');
      return;
    }
    
    if (!Object.values(platforms).some(Boolean)) {
      setPlatformError(true);
      return;
    }
    setPlatformError(false);
    setSubmitted(true);
  }

  function resetForm() {
    setTitle('');
    setPitch('');
    setGenre('');
    setStage('');
    setPlatforms(initialPlatformMap());
    setBuildUrl('');
    setFocus('');
    setEmail('');
    setConsent(false);
    setSubmitted(false);
    setPlatformError(false);
  }

  if (submitted) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
        <Header />
        <View style={styles.successContainer}>
          <Text style={styles.eyebrow}>Received</Text>
          <Text style={styles.title}>Thank you—we have your submission.</Text>
          <Text style={styles.lede}>
            Thanks — your answers were not sent anywhere (static site for
            now). Later this would hit a real endpoint.
          </Text>
          <View style={styles.actionRow}>
            <Button title="Back to home" onPress={() => router.push('/')} />
            <Button title="Submit another" variant="secondary" onPress={resetForm} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Developers</Text>
          <Text style={styles.title}>Submit a prototype</Text>
          <Text style={styles.lede}>
            Tell players what you are building, where it runs, and what feedback
            would actually help. Keep it honest—rough builds welcome.
          </Text>
          <Text style={styles.hint}>* = required. Files are not uploaded anywhere yet.</Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Project</Text>
          
          <View style={styles.field}>
            <Text style={styles.label}>Working title <Text style={styles.req}>*</Text></Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. Lanternbound" 
              placeholderTextColor={Colors.dark.muted}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Short description <Text style={styles.req}>*</Text></Text>
            <TextInput 
              style={[styles.input, styles.textarea]} 
              placeholder="One or two paragraphs: genre hook, what the build contains..." 
              placeholderTextColor={Colors.dark.muted}
              multiline
              numberOfLines={4}
              maxLength={600}
              value={pitch}
              onChangeText={setPitch}
            />
            <Text style={styles.fieldFoot}>Max 600 characters</Text>
          </View>

          {/* Note: In a real app we'd use a Picker, but for UI fidelity we can use simple custom select views or TextInputs for now */}
          <View style={styles.fieldRow}>
            <View style={[styles.field, {flex: 1}]}>
              <Text style={styles.label}>Genre <Text style={styles.req}>*</Text></Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. Action" 
                placeholderTextColor={Colors.dark.muted}
                value={genre}
                onChangeText={setGenre}
              />
            </View>
            <View style={[styles.field, {flex: 1}]}>
              <Text style={styles.label}>Stage <Text style={styles.req}>*</Text></Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. Alpha" 
                placeholderTextColor={Colors.dark.muted}
                value={stage}
                onChangeText={setStage}
              />
            </View>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Platforms</Text>
          <Text style={styles.label}>Where does this build run? <Text style={styles.req}>*</Text></Text>
          
          <View style={styles.checkboxGrid}>
            {PLATFORMS.map((p) => (
              <Pressable 
                key={p.id} 
                style={styles.checkboxItem}
                onPress={() => togglePlatform(p.id)}
              >
                <View style={[styles.checkbox, platforms[p.id] && styles.checkboxActive]} />
                <Text style={styles.checkboxLabel}>{p.label}</Text>
              </Pressable>
            ))}
          </View>
          {platformError ? (
            <Text style={styles.errorText}>Select at least one platform.</Text>
          ) : (
            <Text style={styles.fieldFoot}>Pick at least one.</Text>
          )}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Build & media</Text>
          <View style={styles.field}>
            <Text style={styles.label}>Build URL (optional)</Text>
            <TextInput 
              style={styles.input} 
              placeholder="https://itch.io/… or your file host" 
              placeholderTextColor={Colors.dark.muted}
              value={buildUrl}
              onChangeText={setBuildUrl}
              keyboardType="url"
              autoCapitalize="none"
            />
            <Text style={styles.fieldFoot}>Link to Itch, Dropbox, Google Drive, or a web player.</Text>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Feedback</Text>
          <View style={styles.field}>
            <Text style={styles.label}>What should testers focus on? <Text style={styles.req}>*</Text></Text>
            <TextInput 
              style={[styles.input, styles.textarea]} 
              placeholder="e.g. Combat feel in the first dungeon..." 
              placeholderTextColor={Colors.dark.muted}
              multiline
              numberOfLines={4}
              maxLength={1200}
              value={focus}
              onChangeText={setFocus}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.field}>
            <Text style={styles.label}>Email <Text style={styles.req}>*</Text></Text>
            <TextInput 
              style={styles.input} 
              placeholder="you@studio.com" 
              placeholderTextColor={Colors.dark.muted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Pressable style={styles.checkboxItem} onPress={() => setConsent(!consent)}>
            <View style={[styles.checkbox, consent && styles.checkboxActive]} />
            <Text style={[styles.checkboxLabel, {flex: 1, lineHeight: 20}]}>
              I confirm I have the right to share this build and media for
              playtesting. <Text style={styles.req}>*</Text>
            </Text>
          </Pressable>
        </View>

        <View style={styles.formActions}>
          <Button title="Submit prototype" onPress={handleSubmit} style={styles.actionBtn} />
          <Button title="Cancel" variant="secondary" onPress={() => router.push('/')} style={styles.actionBtn} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.bg,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark.accent,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.dark.textStrong,
    marginBottom: 12,
  },
  lede: {
    fontSize: 16,
    color: Colors.dark.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  hint: {
    fontSize: 14,
    color: Colors.dark.muted,
  },
  formSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.textStrong,
    marginBottom: 16,
  },
  field: {
    marginBottom: 20,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.textStrong,
    marginBottom: 8,
  },
  req: {
    color: Colors.dark.accent,
  },
  input: {
    backgroundColor: Colors.dark.bgSubtle,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.dark.textStrong,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  fieldFoot: {
    fontSize: 13,
    color: Colors.dark.muted,
    marginTop: 6,
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    width: '45%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.dark.muted,
    backgroundColor: 'transparent',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: Colors.dark.accent,
    borderColor: Colors.dark.accent,
  },
  checkboxLabel: {
    fontSize: 15,
    color: Colors.dark.text,
  },
  errorText: {
    fontSize: 14,
    color: '#f0a8a8',
    marginTop: 8,
  },
  formActions: {
    padding: 20,
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
  },
  successContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
});
