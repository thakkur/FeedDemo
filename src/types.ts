// src/types.ts
import {StackNavigationProp} from '@react-navigation/stack';

export type MediaItemType = {
  type: 'image' | 'video';
  uri: string;
};

export type RootStackParamList = {
  MediaFeed: undefined;
  DetailedViewer: {mediaList: MediaItemType[]; selectedMediaIndex: number};
};

export type MediaFeedScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MediaFeed'
>;
