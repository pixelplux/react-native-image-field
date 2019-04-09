import React from 'react';
import { View, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { colors } from '../../services/shared';

const { width } = Dimensions.get('window');

export function ProgressbarComponent() {
  return (
    <View>
      <Progress.Bar
        width={width}
        borderRadius={0}
        borderWidth={0}
        color={colors.progressBarColor}
      />
    </View>
  );
}
