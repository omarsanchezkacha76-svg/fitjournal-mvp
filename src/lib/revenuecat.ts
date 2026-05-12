// RevenueCat integration — ready for iOS + Android
// Install: npm install react-native-purchases

import { Platform } from 'react-native';

const RC_API_KEYS = {
  apple: process.env.EXPO_PUBLIC_REVENUECAT_APPLE_KEY || '',
  google: process.env.EXPO_PUBLIC_REVENUECAT_GOOGLE_KEY || '',
};

export const REVENUECAT_CONFIG = {
  apiKey: Platform.select({
    ios: RC_API_KEYS.apple,
    android: RC_API_KEYS.google,
  }) || '',
  offerings: {
    monthly: 'fitjournal_monthly',
    annual: 'fitjournal_annual',
    lifetime: 'fitjournal_lifetime',
  },
  entitlementId: 'pro',
};

export const PRICING = {
  monthly: '$7.99',
  annual: '$47.99',
  lifetime: '$199.99',
};

// Usage in component:
// import Purchases from 'react-native-purchases';
// Purchases.configure({ apiKey: REVENUECAT_CONFIG.apiKey });
