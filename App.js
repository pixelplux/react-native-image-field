import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { ImageAlbumComponent } from './components/image-album/image-album.component';

export const App = () => (
  <SafeAreaView>
    <View>
      <ImageAlbumComponent images={[]} title="Select image" />
    </View>
  </SafeAreaView>
);
