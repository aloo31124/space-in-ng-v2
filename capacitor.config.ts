import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '328066296243-5opekodfa93rria1e8utcql4rkrbvktq.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },

  appId: 'com.spacein',
  appName: 'space-in',
  webDir: 'dist/space-in',
  bundledWebRuntime: true
};

export default config;
