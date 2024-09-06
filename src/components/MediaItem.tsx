// src/components/MediaItem.tsx
import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {MediaItemType} from '../types';

interface MediaItemProps {
  media: MediaItemType;
}

const MediaItem: React.FC<MediaItemProps> = ({media}) => {
  return (
    <View style={styles.container}>
      {media.type === 'image' ? (
        <Image source={{uri: media.uri}} style={styles.mediaImage} />
      ) : (
        <Video
          source={{uri: media.uri}}
          style={styles.mediaVideo}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  mediaImage: {
    width: '100%',
    height: 200,
  },
  mediaVideo: {
    width: '100%',
    height: 200,
  },
});

export default MediaItem;
