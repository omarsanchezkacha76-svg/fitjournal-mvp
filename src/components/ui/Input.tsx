import React from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export function Input({ style, ...rest }: TextInputProps) {
  const theme = useThemeColor();

  return (
    <TextInput
      placeholderTextColor={theme.textTertiary}
      style={[
        styles.input,
        {
          backgroundColor: theme.background,
          color: theme.text,
          borderColor: theme.border,
        },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
