import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import Dashboard from '../screens/Home';
import RealTimeCharts from '../screens/RealTimeCharts';

type RootStackParamList = {
  Dashboard: undefined;
  RealTimeCharts: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="RealTimeCharts" component={RealTimeCharts} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
