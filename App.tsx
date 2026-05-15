import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { TabNavigator } from './src/navigation/TabNavigator';

type AppState = 'splash' | 'onboarding' | 'main';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        {appState === 'splash' && (
          <SplashScreen onFinish={() => setAppState('onboarding')} />
        )}
        {appState === 'onboarding' && (
          <OnboardingScreen onFinish={() => setAppState('main')} />
        )}
        {appState === 'main' && (
          <NavigationContainer
            theme={{
              dark: true,
              colors: {
                primary: '#00D4FF',
                background: '#030308',
                card: '#070D1F',
                text: '#FFFFFF',
                border: 'rgba(255,255,255,0.08)',
                notification: '#00D4FF',
              },
              fonts: {
                regular: { fontFamily: 'System', fontWeight: '400' },
                medium: { fontFamily: 'System', fontWeight: '500' },
                bold: { fontFamily: 'System', fontWeight: '700' },
                heavy: { fontFamily: 'System', fontWeight: '900' },
              },
            }}
          >
            <TabNavigator />
          </NavigationContainer>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#030308',
  },
});
