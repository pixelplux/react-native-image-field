import React from 'react';
import ActionSheet from 'react-native-actionsheet';

export function TapActionSheet() {
  return (
    <ActionSheet
      ref={o => (this.ActionSheet = o)}
      title="What to do with image?"
      options={['Set as default', 'Delete image', 'cancel']}
      cancelButtonIndex={2}
      destructiveButtonIndex={1}
      onPress={index => {
        /* do something */
        if (index === 1) {
          this.onDeleteImage();
        }
        if (index === 0) {
          this.onSetDefault();
        }
      }}
    />
  );
}
