import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert
} from 'react-native';
import { 
  Bell, 
  Shield, 
  Info, 
  Phone, 
  Mail,
  Globe,
  ChevronRight,
  LogOut
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleClearData = () => {
    Alert.alert(
      'Clear App Data',
      'This will clear all cached alerts and messages. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert('Success', 'App data has been cleared');
          }
        }
      ]
    );
  };

  const SettingRow = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement 
  }: any) => (
    <TouchableOpacity 
      style={styles.settingRow}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.iconContainer}>
        <Icon size={20} color={theme.colors.primary} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || (onPress && <ChevronRight size={20} color={theme.colors.textSecondary} />)}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.sectionContent}>
          <SettingRow
            icon={Bell}
            title="Push Notifications"
            subtitle="Receive alerts on your device"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ 
                  false: theme.colors.border, 
                  true: theme.colors.secondary 
                }}
                thumbColor={theme.colors.card}
              />
            }
          />
          <View style={styles.separator} />
          <SettingRow
            icon={Shield}
            title="Emergency Alerts Only"
            subtitle="Only receive high-priority alerts"
            rightElement={
              <Switch
                value={emergencyOnly}
                onValueChange={setEmergencyOnly}
                trackColor={{ 
                  false: theme.colors.border, 
                  true: theme.colors.secondary 
                }}
                thumbColor={theme.colors.card}
                disabled={!notifications}
              />
            }
          />
          <View style={styles.separator} />
          <SettingRow
            icon={Bell}
            title="Sound"
            subtitle="Play sound for notifications"
            rightElement={
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ 
                  false: theme.colors.border, 
                  true: theme.colors.secondary 
                }}
                thumbColor={theme.colors.card}
                disabled={!notifications}
              />
            }
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.sectionContent}>
          <SettingRow
            icon={Phone}
            title="Emergency Hotline"
            subtitle="911"
            onPress={() => Alert.alert('Emergency', 'Call 911 for emergencies')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon={Phone}
            title="City Hall"
            subtitle="(555) 123-4567"
            onPress={() => Alert.alert('City Hall', '(555) 123-4567')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon={Mail}
            title="Email"
            subtitle="info@cityalerts.gov"
            onPress={() => Alert.alert('Email', 'info@cityalerts.gov')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon={Globe}
            title="Website"
            subtitle="www.cityalerts.gov"
            onPress={() => Alert.alert('Website', 'Visit www.cityalerts.gov')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.sectionContent}>
          <SettingRow
            icon={Info}
            title="App Version"
            subtitle="1.0.0"
          />
          <View style={styles.separator} />
          <SettingRow
            icon={Info}
            title="Terms of Service"
            onPress={() => Alert.alert('Terms', 'Terms of Service')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon={Shield}
            title="Privacy Policy"
            onPress={() => Alert.alert('Privacy', 'Privacy Policy')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.dangerButton}
          onPress={handleClearData}
        >
          <LogOut size={20} color={theme.colors.emergency} />
          <Text style={styles.dangerButtonText}>Clear App Data</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          City Alerts App v1.0.0{'\n'}
          © 2025 City Government
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600' as const,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase' as const,
    marginLeft: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  sectionContent: {
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    minHeight: 60,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginLeft: 60,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.emergency,
    gap: theme.spacing.sm,
  },
  dangerButtonText: {
    color: theme.colors.emergency,
    fontSize: theme.fontSize.md,
    fontWeight: '600' as const,
  },
  footer: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  footerText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
    lineHeight: 20,
  },
});