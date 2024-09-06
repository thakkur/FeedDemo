import React, {useCallback, useRef, useState} from 'react';
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import dummyMedia from '../../data/dummyMedia';
import {useNavigation} from '@react-navigation/native';
import {MediaFeedScreenNavigationProp} from '../../types';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;

interface MediaItemProps {
  type: string;
  uri: string;
  videoRef?: any;
}

const MediaItem = ({type, uri, videoRef}: MediaItemProps) => {
  const [paused, setPaused] = useState(true); // Controls play/pause state
  const [isLoading, setIsLoading] = useState(false);
  const onReadyForDisplay = () => {
    console.log('onReadyForDisplay');
    setIsLoading(false);
  };
  const onLoadStart = useCallback(() => {
    setIsLoading(true);
  }, []);
  const togglePlayPause = () => {
    setPaused(!paused);
  };
  if (type === 'image') {
    return (
      <Image source={{uri}} style={styles.mediaImage} resizeMode="cover" />
    );
  } else if (type === 'video') {
    return (
      <View>
        <Video
          ref={videoRef}
          source={{uri}}
          style={styles.mediaVideo}
          resizeMode="cover"
          controls={false}
          onReadyForDisplay={onReadyForDisplay}
          paused={paused}
          onLoadStart={onLoadStart}
        />
        {isLoading ? (
          <View style={styles.playPauseButton}>
            <ActivityIndicator />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={togglePlayPause}>
            <Icon
              name={paused ? 'play-circle-outline' : 'pause-circle-outline'}
              size={60}
              color="white"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
  return null;
};

const MediaFeedScreen = () => {
  const handleMediaPress = (media: any, index: number) => {
    navigation.navigate('DetailedViewer', {
      mediaList: media,
      selectedMediaIndex: index,
    });
  };
  const navigation = useNavigation<MediaFeedScreenNavigationProp>();
  const videoRef = useRef(null); // Reference for the video player
  const loadMedia = () => {
    // Simulating pagination

  };
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyMedia}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => handleMediaPress(item, index)}
            style={styles.mediaContainer}>
            <MediaItem videoRef={videoRef} type={item.type} uri={item.uri} />
          </TouchableOpacity>
        )}
        onEndReached={loadMedia}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mediaContainer: {
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
  },
  mediaImage: {
    width: windowWidth,
    height: windowWidth * 0.75, // 4:3 aspect ratio for images
  },
  mediaVideo: {
    width: windowWidth,
    height: windowWidth * 0.75, // Similar aspect ratio for videos
  },
  playPauseButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: [{translateX: -30}, {translateY: -30}], // Adjust to center the button
  },
});

export default MediaFeedScreen;
