import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './imageholder.style';

export function ImageHolder(props) {
  const { index, image, onPressImage } = props;
  return (
    <TouchableOpacity key={index} onPress={() => onPressImage(index)}>
      <ImageBackground
        source={{ uri: image }}
        style={index % 4 === 0 ? styles.firstImage : styles.images}
      >
        <View style={styles.overlay}>
          <View style={styles.counter}>
            <Text style={styles.textCounter}>{index + 1}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
