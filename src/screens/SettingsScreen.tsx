import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Radius } from '../theme';
import { ScreenBackground } from '../components/ScreenBackground';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';

interface SettingRowProps {
  icon: string;
  label: string;
  value?: string;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
  color?: string;
  onPress?: () => void;
  danger?: boolean;
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  label,
  value,
  toggle,
  toggleValue,
  onToggle,
  color = Colors.electricBlue,
  onPress,
  danger = false,
}) => (
  <TouchableOpacity
    style={styles.settingRow}
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={[styles.settingIcon, { backgroundColor: `${color}18`, borderColor: `${color}25` }]}>
      <Text style={styles.settingIconText}>{icon}</Text>
    </View>
    <Text style={[styles.settingLabel, danger && styles.settingLabelDanger]}>{label}</Text>
    {value && <Text style={styles.settingValue}>{value}</Text>}
    {toggle && onToggle && (
      <Switch
        value={toggleValue}
        onValueChange={onToggle}
        trackColor={{ false: Colors.glassMid, true: `${color}60` }}
        thumbColor={toggleValue ? color : Colors.whiteAlpha50}
        ios_backgroundColor={Colors.glassMid}
      />
    )}
    {onPress && !toggle && (
      <Text style={styles.settingArrow}>›</Text>
    )}
  </TouchableOpacity>
);

export const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [aiAssist, setAiAssist] = useState(true);
  const [dataSync, setDataSync] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScreenBackground showParticles={false} showOrbs variant="default">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerSlide }] }]}
        >
          <Text style={styles.title}>Settings</Text>
        </Animated.View>

        {/* Profile card */}
        <GlassCard
          gradient={['rgba(0,212,255,0.12)', 'rgba(0,102,255,0.06)']}
          borderColor="rgba(0,212,255,0.2)"
          style={styles.profileCard}
        >
          <View style={styles.profileRow}>
            <View style={styles.profileAvatar}>
              <LinearGradient colors={['#00D4FF', '#0066FF']} style={styles.profileAvatarGrad}>
                <Text style={styles.profileAvatarText}>W</Text>
              </LinearGradient>
              <View style={styles.profileBadge}>
                <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.profileBadgeGrad}>
                  <Text style={styles.profileBadgeText}>PRO</Text>
                </LinearGradient>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>WeThink Enterprise</Text>
              <Text style={styles.profileEmail}>admin@wethink.ae</Text>
              <View style={styles.profilePlan}>
                <Text style={styles.profilePlanText}>✦ Enterprise Plan • Dubai, UAE</Text>
              </View>
            </View>
          </View>
        </GlassCard>

        {/* Preferences */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Preferences</Text>
        </View>
        <GlassCard style={styles.settingsGroup}>
          <SettingRow icon="🔔" label="Push Notifications" toggle toggleValue={notifications} onToggle={setNotifications} color={Colors.electricBlue} />
          <View style={styles.divider} />
          <SettingRow icon="🌑" label="Dark Mode" toggle toggleValue={darkMode} onToggle={setDarkMode} color={Colors.neonPurple} />
          <View style={styles.divider} />
          <SettingRow icon="🤖" label="AI Assistant" toggle toggleValue={aiAssist} onToggle={setAiAssist} color={Colors.teal} />
          <View style={styles.divider} />
          <SettingRow icon="🔄" label="Auto Sync Data" toggle toggleValue={dataSync} onToggle={setDataSync} color={Colors.success} />
        </GlassCard>

        {/* Security */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Security</Text>
        </View>
        <GlassCard style={styles.settingsGroup}>
          <SettingRow icon="👆" label="Biometric Login" toggle toggleValue={biometric} onToggle={setBiometric} color={Colors.success} />
          <View style={styles.divider} />
          <SettingRow icon="🔑" label="Change Password" onPress={() => {}} color={Colors.warning} />
          <View style={styles.divider} />
          <SettingRow icon="📱" label="Two-Factor Auth" value="Enabled" onPress={() => {}} color={Colors.electricBlue} />
          <View style={styles.divider} />
          <SettingRow icon="🛡️" label="Security Audit" value="Last: Today" onPress={() => {}} color={Colors.teal} />
        </GlassCard>

        {/* Analytics */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Analytics & Privacy</Text>
        </View>
        <GlassCard style={styles.settingsGroup}>
          <SettingRow icon="📊" label="Usage Analytics" toggle toggleValue={analytics} onToggle={setAnalytics} color={Colors.neonPurple} />
          <View style={styles.divider} />
          <SettingRow icon="🗃️" label="Data Export" onPress={() => {}} color={Colors.electricBlue} />
          <View style={styles.divider} />
          <SettingRow icon="🗑️" label="Clear Cache" onPress={() => {}} color={Colors.warning} />
        </GlassCard>

        {/* App info */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>About</Text>
        </View>
        <GlassCard style={styles.settingsGroup}>
          <SettingRow icon="ℹ️" label="App Version" value="2.4.1" color={Colors.whiteAlpha50} />
          <View style={styles.divider} />
          <SettingRow icon="📋" label="Terms of Service" onPress={() => {}} color={Colors.electricBlue} />
          <View style={styles.divider} />
          <SettingRow icon="🔒" label="Privacy Policy" onPress={() => {}} color={Colors.electricBlue} />
          <View style={styles.divider} />
          <SettingRow icon="🌐" label="Website" value="wethink.ae" onPress={() => {}} color={Colors.teal} />
        </GlassCard>

        {/* Logout */}
        <View style={styles.logoutSection}>
          <NeonButton
            title="Sign Out"
            onPress={() => {}}
            variant="ghost"
            size="lg"
            fullWidth
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>WeThink.ae © 2025</Text>
          <Text style={styles.footerText}>Dubai, UAE • All Rights Reserved</Text>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: 60,
    paddingBottom: Spacing.md,
  },
  title: { fontSize: 28, fontWeight: '800', color: Colors.white, letterSpacing: -0.5 },
  profileCard: { marginHorizontal: Spacing.md, marginBottom: Spacing.md },
  profileRow: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  profileAvatar: { position: 'relative' },
  profileAvatarGrad: { width: 64, height: 64, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  profileAvatarText: { fontSize: 32, fontWeight: '800', color: '#fff' },
  profileBadge: { position: 'absolute', bottom: -4, right: -4, borderRadius: 8, overflow: 'hidden' },
  profileBadgeGrad: { paddingHorizontal: 6, paddingVertical: 2 },
  profileBadgeText: { fontSize: 8, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  profileName: { fontSize: 17, fontWeight: '700', color: Colors.white, marginBottom: 2 },
  profileEmail: { fontSize: 13, color: Colors.whiteAlpha60, marginBottom: 6 },
  profilePlan: {
    backgroundColor: 'rgba(0,212,255,0.1)',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.2)',
  },
  profilePlanText: { fontSize: 11, color: Colors.electricBlue, fontWeight: '600' },
  sectionHeader: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginTop: 4,
  },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: Colors.whiteAlpha50, letterSpacing: 0.5, textTransform: 'uppercase' },
  settingsGroup: { marginHorizontal: Spacing.md, marginBottom: 8 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  settingIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  settingIconText: { fontSize: 18 },
  settingLabel: { flex: 1, fontSize: 15, color: Colors.whiteAlpha90, fontWeight: '500' },
  settingLabelDanger: { color: Colors.error },
  settingValue: { fontSize: 13, color: Colors.whiteAlpha50 },
  settingArrow: { fontSize: 20, color: Colors.whiteAlpha30 },
  divider: { height: 1, backgroundColor: Colors.glassBorder, marginVertical: 4, marginLeft: 50 },
  logoutSection: { paddingHorizontal: Spacing.md, marginTop: Spacing.md },
  footer: { paddingVertical: 24, alignItems: 'center', gap: 4 },
  footerText: { fontSize: 11, color: Colors.whiteAlpha30 },
});
