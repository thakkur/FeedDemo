// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MediaFeedScreen from './src/screens/MediaFeedScreen/MediaFeedScreen';
import DetailedMediaViewer from './src/components/DetailedMediaViewer';
import {MediaItemType} from './src/types';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {CardStyleInterpolators} from '@react-navigation/stack';

export type RootStackParamList = {
  MediaFeed: undefined;
  DetailedViewer: {mediaList: MediaItemType[]; selectedMediaIndex: number};
};

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MediaFeed" component={MediaFeedScreen} />
        <Stack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
          name="DetailedViewer"
          component={DetailedMediaViewer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
