// src/components/DetailedMediaViewer.tsx
import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  RootStackParamList,
  MediaItemType,
  MediaFeedScreenNavigationProp,
} from '../types';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import dummyMedia from '../data/dummyMedia';
import Icon from 'react-native-vector-icons/Ionicons';

type DetailedMediaViewerRouteProp = RouteProp<
  RootStackParamList,
  'DetailedViewer'
>;

interface DetailedMediaViewerProps {
  route: DetailedMediaViewerRouteProp;
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetailedMediaViewer: React.FC<DetailedMediaViewerProps> = ({route}) => {
  const {selectedMediaIndex} = route.params;
  const flatListRef = useRef<FlatList<MediaItemType>>(null);
  const navigation = useNavigation<MediaFeedScreenNavigationProp>();

  const downloadMedia = async () => {
    const media = dummyMedia[selectedMediaIndex];
    try {
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${media.uri
        .split('/')
        .pop()}`;
      await RNFS.downloadFile({fromUrl: media.uri, toFile: downloadDest})
        .promise;
      Alert.alert('Download complete!');
    } catch (error) {
      Alert.alert('Download failed!');
    }
  };

  const renderMediaList = ({item}: any) => {
    return (
      <View style={styles.mediaContainer}>
        {item?.type === 'image' ? (
          <Image
            source={{uri: item?.uri}}
            style={styles.media}
            resizeMode="contain"
          />
        ) : (
          <Video
            source={{uri: item?.uri}}
            style={[styles.media]}
            resizeMode="contain"
            controls={true}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => downloadMedia()}>
            <Icon name="download-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <FlatList
          ref={flatListRef}
          data={dummyMedia}
          horizontal
          pagingEnabled
          initialScrollIndex={selectedMediaIndex}
          renderItem={item => renderMediaList(item)}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 10,
    right: 10,
    zIndex: 10,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: windowWidth,
    height: windowHeight - 200,
  },
});

export default DetailedMediaViewer;
