import React from 'react';
import { Text, View } from 'react-native';
import { ImageAlbumComponent } from './components/image-album/image-album.component';

export const App = () => (
  <View>
    <Text>Welcome to React Native!</Text>
    <ImageAlbumComponent images={[]} title="Select image" />
  </View>
);
