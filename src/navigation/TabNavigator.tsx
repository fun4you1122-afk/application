import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '../theme';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ServicesScreen } from '../screens/ServicesScreen';
import { PortfolioScreen } from '../screens/PortfolioScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { TeamScreen } from '../screens/TeamScreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const TAB_ITEMS = [
  { name: 'Dashboard', icon: '◈', label: 'Home' },
  { name: 'Services', icon: '◉', label: 'Services' },
  { name: 'Portfolio', icon: '◇', label: 'Work' },
  { name: 'Chat', icon: '◎', label: 'AI Chat' },
  { name: 'Team', icon: '◈', label: 'Team' },
  { name: 'Notifications', icon: '◉', label: 'Alerts' },
  { name: 'Settings', icon: '◎', label: 'Settings' },
];

const TAB_ICONS: Record<string, string> = {
  Dashboard: '⌂',
  Services: '◈',
  Portfolio: '◇',
  Chat: '◎',
  Team: '◉',
  Notifications: '◔',
  Settings: '⚙',
};

const TAB_COLORS: Record<string, string> = {
  Dashboard: Colors.electricBlue,
  Services: Colors.teal,
  Portfolio: Colors.neonPurple,
  Chat: Colors.neonPurple,
  Team: Colors.success,
  Notifications: Colors.warning,
  Settings: Colors.whiteAlpha50,
};

function CustomTabBar({ state, descriptors, navigation }: any) {
  const mainTabs = ['Dashboard', 'Services', 'Portfolio', 'Chat', 'Settings'];
  const mainState = state.routes.filter((r: any) => mainTabs.includes(r.name));

  return (
    <View style={styles.tabBarOuter}>
      <LinearGradient
        colors={['rgba(3,3,8,0.98)', 'rgba(5,10,26,0.99)']}
        style={styles.tabBar}
      >
        <View style={styles.tabBarBorder} />
        {state.routes
          .filter((route: any) => mainTabs.includes(route.name))
          .map((route: any) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === state.routes.indexOf(route);
            const color = TAB_COLORS[route.name];

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TabItem
                key={route.name}
                name={route.name}
                icon={TAB_ICONS[route.name]}
                label={route.name === 'Dashboard' ? 'Home' : route.name}
                isFocused={isFocused}
                color={color}
                onPress={onPress}
              />
            );
          })}
      </LinearGradient>
    </View>
  );
}

const TabItem: React.FC<{
  name: string;
  icon: string;
  label: string;
  isFocused: boolean;
  color: string;
  onPress: () => void;
}> = ({ icon, label, isFocused, color, onPress }) => {
  const scaleAnim = React.useRef(new Animated.Value(isFocused ? 1 : 0.9)).current;
  const glowAnim = React.useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isFocused ? 1 : 0.9,
        tension: 120,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isFocused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.tabItem}
    >
      <Animated.View style={[styles.tabItemInner, { transform: [{ scale: scaleAnim }] }]}>
        {isFocused && (
          <Animated.View
            style={[
              styles.tabGlow,
              {
                backgroundColor: color,
                opacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.15] }),
              },
            ]}
          />
        )}
        <Animated.View
          style={[
            styles.iconWrap,
            isFocused && { backgroundColor: `${color}18`, borderColor: `${color}35` },
          ]}
        >
          <Text style={[styles.tabIcon, { color: isFocused ? color : Colors.whiteAlpha30 }]}>
            {icon}
          </Text>
        </Animated.View>
        <Text
          style={[
            styles.tabLabel,
            { color: isFocused ? color : Colors.whiteAlpha30 },
            isFocused && styles.tabLabelActive,
          ]}
        >
          {label}
        </Text>
        {isFocused && (
          <Animated.View style={[styles.activeIndicator, { backgroundColor: color, opacity: glowAnim }]} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export const TabNavigator: React.FC = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Services" component={ServicesScreen} />
    <Tab.Screen name="Portfolio" component={PortfolioScreen} />
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen name="Team" component={TeamScreen} />
    <Tab.Screen name="Notifications" component={NotificationsScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBarOuter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 0,
  },
  tabBar: {
    flexDirection: 'row',
    paddingBottom: 24,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tabBarBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.glassBorder,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabItemInner: {
    alignItems: 'center',
    paddingTop: 4,
    position: 'relative',
  },
  tabGlow: {
    position: 'absolute',
    top: -8,
    left: -20,
    right: -20,
    bottom: -8,
    borderRadius: 20,
  },
  iconWrap: {
    width: 40,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 2,
  },
  tabIcon: {
    fontSize: 18,
    fontWeight: '500',
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  tabLabelActive: {
    fontWeight: '700',
  },
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});
