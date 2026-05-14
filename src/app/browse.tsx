import React, { useState, useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '@/components/Header';
import Button from '@/components/Button';
import { Colors } from '@/constants/theme';
import { GENRES, PLATFORMS, STAGES, initialGenreMap, initialPlatformMap, initialStageMap } from '@/constants/filters';

const list: any[] = [];

function selectedKeys(map: Record<string, boolean>) {
  return Object.entries(map).filter(([, on]) => on).map(([key]) => key);
}

export default function BrowseScreen() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [genres, setGenres] = useState(initialGenreMap());
  const [platforms, setPlatforms] = useState(initialPlatformMap());
  const [stages, setStages] = useState(initialStageMap());

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (search.trim()) n += 1;
    n += selectedKeys(genres).length;
    n += selectedKeys(platforms).length;
    n += selectedKeys(stages).length;
    return n;
  }, [search, genres, platforms, stages]);

  function clearFilters() {
    setSearch('');
    setGenres(initialGenreMap());
    setPlatforms(initialPlatformMap());
    setStages(initialStageMap());
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Players</Text>
          <Text style={styles.title}>Browse builds</Text>
          <Text style={styles.lede}>
            Filter by genre, platform, and stage. The grid is empty because I
            have not hooked this page up to any data yet—the filters still work
            on the UI side.
          </Text>
        </View>

        <View style={styles.toolbar}>
          <TextInput
            placeholder="Search by title or description…"
            placeholderTextColor={Colors.dark.muted}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          <Button 
            title={`Filters ${activeFilterCount > 0 ? `(${activeFilterCount})` : ''}`} 
            variant="secondary"
            onPress={() => setShowFilters(!showFilters)} 
          />
        </View>

        {showFilters && (
          <View style={styles.filtersPanel}>
            <View style={styles.filtersHead}>
              <Text style={styles.filtersTitle}>Filters</Text>
              {activeFilterCount > 0 && (
                <Pressable onPress={clearFilters}>
                  <Text style={styles.clearFilters}>Clear all</Text>
                </Pressable>
              )}
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Genre</Text>
              <View style={styles.checkboxGrid}>
                {GENRES.map((g) => (
                  <Pressable 
                    key={g} 
                    style={styles.checkboxItem}
                    onPress={() => setGenres(prev => ({ ...prev, [g]: !prev[g] }))}
                  >
                    <View style={[styles.checkbox, genres[g] && styles.checkboxActive]} />
                    <Text style={styles.checkboxLabel}>{g}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Platform</Text>
              <View style={styles.checkboxGrid}>
                {PLATFORMS.map((p) => (
                  <Pressable 
                    key={p.id} 
                    style={styles.checkboxItem}
                    onPress={() => setPlatforms(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
                  >
                    <View style={[styles.checkbox, platforms[p.id] && styles.checkboxActive]} />
                    <Text style={styles.checkboxLabel}>{p.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Development stage</Text>
              <View style={styles.checkboxGridList}>
                {STAGES.map((s) => (
                  <Pressable 
                    key={s} 
                    style={styles.checkboxItem}
                    onPress={() => setStages(prev => ({ ...prev, [s]: !prev[s] }))}
                  >
                    <View style={[styles.checkbox, stages[s] && styles.checkboxActive]} />
                    <Text style={styles.checkboxLabel}>{s}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        )}

        <View style={styles.resultsArea}>
          <Text style={styles.resultsCount}>
            <Text style={{fontWeight: '700', color: Colors.dark.textStrong}}>0</Text>{' '}
            prototypes {activeFilterCount > 0 ? 'match your filters' : 'shown'} (list is still empty).
          </Text>

          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptyCopy}>
              Once there is a real list of games, they would show in this area
              and the filters would narrow them down.
            </Text>
          </View>
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
  },
  toolbar: {
    padding: 20,
    flexDirection: 'row',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.dark.bgSubtle,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.dark.textStrong,
  },
  filtersPanel: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: Colors.dark.bgElevated,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  filtersHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.textStrong,
  },
  clearFilters: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.accent,
    textDecorationLine: 'underline',
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  checkboxGridList: {
    gap: 12,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.dark.muted,
    backgroundColor: 'transparent',
  },
  checkboxActive: {
    backgroundColor: Colors.dark.accent,
    borderColor: Colors.dark.accent,
  },
  checkboxLabel: {
    fontSize: 15,
    color: Colors.dark.text,
  },
  resultsArea: {
    paddingHorizontal: 20,
  },
  resultsCount: {
    fontSize: 15,
    color: Colors.dark.text,
    marginBottom: 16,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: Colors.dark.bgSubtle,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.textStrong,
    marginBottom: 8,
  },
  emptyCopy: {
    fontSize: 15,
    color: Colors.dark.text,
    textAlign: 'center',
    lineHeight: 22,
  },
});
