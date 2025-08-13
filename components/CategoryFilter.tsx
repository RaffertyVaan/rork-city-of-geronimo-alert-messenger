import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { AlertCircle, Calendar, Megaphone, Wrench, Info, Grid3x3, PawPrint } from 'lucide-react-native';
import { AlertCategory } from '@/types/alert';
import { theme } from '@/constants/theme';

interface CategoryFilterProps {
  selectedCategory: AlertCategory | 'all';
  onSelectCategory: (category: AlertCategory | 'all') => void;
}

const categories = [
  { id: 'all' as const, label: 'All', icon: Grid3x3, color: theme.colors.primary },
  { id: 'emergency' as const, label: 'Emergency', icon: AlertCircle, color: theme.colors.emergency },
  { id: 'news' as const, label: 'News', icon: Megaphone, color: theme.colors.primary },
  { id: 'events' as const, label: 'Events', icon: Calendar, color: theme.colors.secondary },
  { id: 'maintenance' as const, label: 'Maintenance', icon: Wrench, color: theme.colors.warning },
  { id: 'animal-control' as const, label: 'Animal Control', icon: PawPrint, color: theme.colors.animalControl },
  { id: 'general' as const, label: 'General', icon: Info, color: theme.colors.textSecondary },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
                isSelected && { backgroundColor: category.color }
              ]}
              onPress={() => onSelectCategory(category.id)}
              activeOpacity={0.7}
              testID={`category-${category.id}`}
            >
              <Icon 
                size={16} 
                color={isSelected ? theme.colors.card : category.color} 
              />
              <Text style={[
                styles.chipText,
                isSelected && styles.chipTextSelected
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.xs,
  },
  chipSelected: {
    borderColor: 'transparent',
  },
  chipText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: '500' as const,
  },
  chipTextSelected: {
    color: theme.colors.card,
    fontWeight: '600' as const,
  },
});