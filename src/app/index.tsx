import React from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import Header from '@/components/Header';
import Button from '@/components/Button';
import { Colors } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>Prototype-stage playtesting</Text>
          <Text style={styles.heroTitle}>
            Visibility and feedback, before it is too late to fix anything.
          </Text>
          <Text style={styles.lede}>
            Thousands of indie games ship every year. Most never break through
            the noise. IndieGate connects developers with players who will
            actually play early builds and leave structured feedback—not a
            star rating months after release.
          </Text>
          <View style={styles.heroActions}>
            <Button
              title="Submit a prototype"
              onPress={() => router.push('/submit')}
              style={styles.actionBtn}
            />
            <Button
              title="Browse builds"
              variant="secondary"
              onPress={() => router.push('/browse')}
              style={styles.actionBtn}
            />
          </View>
        </View>

        {/* Hero Panel */}
        <View style={styles.panel}>
          <Text style={styles.panelLabel}>Why this matters</Text>
          <View style={styles.statList}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3,349</Text>
              <Text style={styles.statDesc}>
                indie titles cleared roughly $500+ revenue in a recent release
                year—amid tens of thousands of releases.
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>~85%</Text>
              <Text style={styles.statDesc}>
                of indie revenue concentrated in the top tenth of earners. The
                gap is discovery and early validation—not a shortage of games.
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3.6B</Text>
              <Text style={styles.statDesc}>
                players worldwide; spending is growing. Adventure, RPG, and
                action continue to lead—genres indies gravitate toward.
              </Text>
            </View>
          </View>
        </View>

        {/* Platform Features */}
        <View style={[styles.section, styles.borderTop]}>
          <Text style={styles.sectionTitle}>The platform</Text>
          <Text style={styles.sectionIntro}>
            No bloat. A narrow toolset focused on prototypes: showcase, discover,
            follow, and respond with feedback that developers can use in the next
            sprint.
          </Text>

          <View style={styles.featureGrid}>
            <View style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>Submit & showcase</Text>
              <Text style={styles.featureCardDesc}>
                Upload a build, screenshots, and a short description. Keep the
                page honest—what stage you are in, what you need tested.
              </Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>Browse & filter</Text>
              <Text style={styles.featureCardDesc}>
                Genre, platform, and development stage so players can find
                something worth an hour—not another endless grid of clones.
              </Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>Structured feedback</Text>
              <Text style={styles.featureCardDesc}>
                Gameplay, originality, feel—short-form prompts that produce
                comparable signal, not drive-by scores.
              </Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>Follow projects</Text>
              <Text style={styles.featureCardDesc}>
                Testers follow games they care about; you grow a wishlist-ready
                audience before marketing spends a dollar.
              </Text>
            </View>
          </View>
        </View>

        {/* Developers / Players Split */}
        <View style={styles.splitGrid}>
          <View style={styles.splitCard}>
            <Text style={styles.splitTitle}>For developers</Text>
            <Text style={styles.splitDesc}>
              Ship a vertical slice or rough prototype. Get signal while
              mechanics and pacing are still movable. Treat feedback as a
              production input—not a postmortem.
            </Text>
            <View style={styles.splitList}>
              <Text style={styles.splitListItem}>• Early validation without storefront algorithms</Text>
              <Text style={styles.splitListItem}>• Comparable feedback across sessions</Text>
              <Text style={styles.splitListItem}>• Audience that opted in to unfinished work</Text>
            </View>
            <Button
              title="Open submission form"
              onPress={() => router.push('/submit')}
              style={styles.splitCta}
            />
          </View>

          <View style={[styles.splitCard, styles.splitCardBorder]}>
            <Text style={styles.splitTitle}>For players</Text>
            <Text style={styles.splitDesc}>
              Play things before they have been sanded down by committees. Your
              notes go to people who can still change the game—not into a void
              after launch.
            </Text>
            <View style={styles.splitList}>
              <Text style={styles.splitListItem}>• Filter to genres and platforms you actually use</Text>
              <Text style={styles.splitListItem}>• Structured forms—quick to fill, useful to read</Text>
              <Text style={styles.splitListItem}>• Follow titles from first playtest to release</Text>
            </View>
            <Button
              title="Browse builds"
              variant="secondary"
              onPress={() => router.push('/browse')}
              style={styles.splitCta}
            />
          </View>
        </View>

        {/* Early Access Form */}
        <View style={styles.ctaBand}>
          <Text style={styles.ctaTitle}>Early access</Text>
          <Text style={styles.ctaCopy}>
            We are building IndieGate for a closed first cohort—developers with
            playable builds and players who take notes seriously. Leave your
            email; we will reach out when the next batch opens.
          </Text>
          <View style={styles.waitlist}>
            <TextInput
              placeholder="you@domain.com"
              placeholderTextColor={Colors.dark.muted}
              style={styles.waitlistInput}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Button title="Request invitation" style={styles.waitlistBtn} />
          </View>
          <Text style={styles.ctaFootnote}>
            No spam. One list. Prototype-focused only.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerWordmark}>IndieGate</Text>
          <Text style={styles.footerTagline}>
            Early playtests. Structured feedback. Indie-first.
          </Text>
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
  section: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark.accent,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.dark.textStrong,
    marginBottom: 16,
    lineHeight: 38,
  },
  lede: {
    fontSize: 16,
    color: Colors.dark.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionBtn: {
    flexGrow: 1,
  },
  panel: {
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 24,
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  panelLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.dark.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 16,
  },
  statList: {
    gap: 20,
  },
  statItem: {
    gap: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.dark.textStrong,
  },
  statDesc: {
    fontSize: 14,
    color: Colors.dark.text,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.textStrong,
    marginBottom: 12,
  },
  sectionIntro: {
    fontSize: 16,
    color: Colors.dark.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  featureGrid: {
    gap: 16,
  },
  featureCard: {
    padding: 20,
    backgroundColor: Colors.dark.bgSubtle,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  featureCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.textStrong,
    marginBottom: 8,
  },
  featureCardDesc: {
    fontSize: 15,
    color: Colors.dark.text,
    lineHeight: 22,
  },
  splitGrid: {
    marginHorizontal: 20,
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    overflow: 'hidden',
    marginBottom: 32,
  },
  splitCard: {
    padding: 24,
  },
  splitCardBorder: {
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  splitTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.textStrong,
    marginBottom: 12,
  },
  splitDesc: {
    fontSize: 15,
    color: Colors.dark.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  splitList: {
    gap: 6,
    marginBottom: 20,
  },
  splitListItem: {
    fontSize: 14,
    color: Colors.dark.text,
    lineHeight: 20,
  },
  splitCta: {
    alignSelf: 'flex-start',
  },
  ctaBand: {
    paddingHorizontal: 20,
    paddingVertical: 48,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.dark.textStrong,
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaCopy: {
    fontSize: 15,
    color: Colors.dark.text,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  waitlist: {
    width: '100%',
    gap: 12,
    marginBottom: 16,
  },
  waitlistInput: {
    backgroundColor: Colors.dark.bgSubtle,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.dark.textStrong,
  },
  waitlistBtn: {
    width: '100%',
  },
  ctaFootnote: {
    fontSize: 13,
    color: Colors.dark.muted,
  },
  footer: {
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    alignItems: 'center',
    gap: 6,
  },
  footerWordmark: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.muted,
  },
  footerTagline: {
    fontSize: 13,
    color: Colors.dark.muted,
  },
});
