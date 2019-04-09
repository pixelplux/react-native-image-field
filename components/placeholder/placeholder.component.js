import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './placeholder.style';

export class PlaceHolder extends React.Component {
  render() {
    const { images, placeHolders, onPressEmptyImageHolder } = this.props;

    const imageIndex = images.length - 1;
    return placeHolders.map((item, index) => {
      return (
        <TouchableOpacity key={index} onPress={onPressEmptyImageHolder}>
          <ImageBackground
            style={[
              (index + 1 + imageIndex) % 4 === 0
                ? styles.firstImage
                : styles.images
            ]}
          >
            <View style={styles.overlay}>
              <View style={styles.counterPlaceholder}>
                <Text style={styles.textCounterPlaceholder}>
                  {index + imageIndex + 2}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      );
    });
  }
}
