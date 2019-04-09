import React from 'react';
import { View, Text } from 'react-native';
import propTypes from 'prop-types';

import { styles } from './validation.style';

export function Message({ message, type }) {
  if (!message) {
    return null;
  }
  return (
    <View style={{ margin: 0, padding: 0 }}>
      <Text
        style={type === 'error' ? styles.message_error : styles.message_warning}
      >
        {[message]}
      </Text>
    </View>
  );
}

Message.defaultProps = {
  message: null,
  type: null
};

Message.propTypes = {
  message: propTypes.string,
  type: propTypes.string
};
