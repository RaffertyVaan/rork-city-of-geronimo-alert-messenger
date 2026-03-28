import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { PawPrint, MapPin, Phone, User, FileText, Camera, Send } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { AnimalControlReport } from '@/types/alert';

type ReportType = 'stray' | 'aggressive' | 'injured' | 'noise' | 'other';

const reportTypes: { key: ReportType; label: string; description: string }[] = [
  { key: 'stray', label: 'Stray Animal', description: 'Lost or wandering animal' },
  { key: 'aggressive', label: 'Aggressive Animal', description: 'Animal showing aggressive behavior' },
  { key: 'injured', label: 'Injured Animal', description: 'Animal that appears hurt or sick' },
  { key: 'noise', label: 'Noise Complaint', description: 'Excessive barking or animal noise' },
  { key: 'other', label: 'Other', description: 'Other animal-related issue' },
];

export default function AnimalControlScreen() {
  const [selectedType, setSelectedType] = useState<ReportType>('stray');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!description.trim() || !location.trim() || !contactName.trim() || !contactPhone.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const report: Omit<AnimalControlReport, 'id' | 'timestamp' | 'status'> = {
        type: selectedType,
        description: description.trim(),
        location: location.trim(),
        contactName: contactName.trim(),
        contactPhone: contactPhone.trim(),
      };

      console.log('Submitting animal control report:', report);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Report Submitted',
        'Your animal control report has been submitted successfully. Officer Mike Thompson will investigate and contact you if needed.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setSelectedType('stray');
              setDescription('');
              setLocation('');
              setContactName('');
              setContactPhone('');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error submitting report:', error);
      Alert.alert('Error', 'Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <PawPrint size={32} color={theme.colors.animalControl} />
          </View>
          <Text style={styles.headerTitle}>Report Animal Control Issue</Text>
          <Text style={styles.headerSubtitle}>
            Report stray animals, aggressive behavior, or other animal-related concerns to the City of Geronimo Animal Control Officer.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type of Issue</Text>
          <View style={styles.typeGrid}>
            {reportTypes.map((type) => (
              <TouchableOpacity
                key={type.key}
                style={[
                  styles.typeCard,
                  selectedType === type.key && styles.typeCardSelected,
                ]}
                onPress={() => setSelectedType(type.key)}
                testID={`report-type-${type.key}`}
              >
                <Text style={[
                  styles.typeLabel,
                  selectedType === type.key && styles.typeLabelSelected,
                ]}>
                  {type.label}
                </Text>
                <Text style={[
                  styles.typeDescription,
                  selectedType === type.key && styles.typeDescriptionSelected,
                ]}>
                  {type.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description *</Text>
          <View style={styles.inputContainer}>
            <FileText size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.textArea}
              placeholder="Describe the animal and situation in detail..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              placeholderTextColor={theme.colors.textSecondary}
              testID="description-input"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location *</Text>
          <View style={styles.inputContainer}>
            <MapPin size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Street address or nearest intersection"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor={theme.colors.textSecondary}
              testID="location-input"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.inputContainer}>
            <User size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Your full name *"
              value={contactName}
              onChangeText={setContactName}
              placeholderTextColor={theme.colors.textSecondary}
              testID="name-input"
            />
          </View>
          <View style={styles.inputContainer}>
            <Phone size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Your phone number *"
              value={contactPhone}
              onChangeText={setContactPhone}
              keyboardType="phone-pad"
              placeholderTextColor={theme.colors.textSecondary}
              testID="phone-input"
            />
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.photoButton} disabled>
            <Camera size={20} color={theme.colors.textSecondary} />
            <Text style={styles.photoButtonText}>Add Photo (Optional)</Text>
            <Text style={styles.photoButtonSubtext}>Coming soon</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            testID="submit-button"
          >
            <Send size={20} color={theme.colors.card} />
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Emergency? Call 911 immediately for dangerous animals or urgent situations.
          </Text>
          <Text style={styles.footerText}>
            For non-emergency issues, reports are typically responded to within 24-48 hours.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${theme.colors.animalControl}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700' as const,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  typeGrid: {
    gap: theme.spacing.sm,
  },
  typeCard: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  typeCardSelected: {
    borderColor: theme.colors.animalControl,
    backgroundColor: `${theme.colors.animalControl}10`,
  },
  typeLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  typeLabelSelected: {
    color: theme.colors.animalControl,
  },
  typeDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  typeDescriptionSelected: {
    color: theme.colors.animalControl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  inputIcon: {
    marginTop: 2,
    marginRight: theme.spacing.sm,
  },
  textInput: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    minHeight: 44,
  },
  textArea: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    opacity: 0.6,
  },
  photoButtonText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  photoButtonSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.animalControl,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.card,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    marginTop: theme.spacing.lg,
  },
  footerText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    lineHeight: 18,
  },
});