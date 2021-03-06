import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export const types = {
  Error: 'error',
  Warning: 'warning',
  None: 'none'
};

export const colors = {
  grayLight: 'rgb(239,239,239)',
  grayMedium: 'rgb(220,220,220)',
  grayDark: 'rgb(190,190,190)',
  alternative: '#ff5722',
  primary: '#4285F4',
  secondary: '#005b9f',
  grayDarkExtra: 'rgb(130,130,130)',
  orange: 'rgb(241,90,35)',
  lightBlue: 'rgb(232,234,246)',
  mapMarkerColor: '#4196ea',
  grayHighDark: '#373737',
  textInputBackground: 'rgb(242,242,242)',
  black900: '#212121',
  pinkA400: '#F50057',
  imageSliderDotColor: 'rgba(128, 128, 128, 0.94)',
  message_warning: '#FF8F00',
  message_error: '#F50057',
  internetConnectionNoticeBackground: '#f44336',
  placeHolderText: '#9E9E9E',
  googleLoginBtn: '#4CAF50',
  imageAlbumCenterCircleBackground: '#388E3C',
  progressBarColor: 'rgba(0, 122, 255, 1)',
  white: '#FFFFFF',
  ux_hint_background: '#F5F5F5',
  ux_tint_line: '#E6E6E6',
  ux_tags_and_gray_text: '#999999',
  ux_master_text: '#4D4D4D',
  ux_hover_blue: '#366CC2',
  ux_red: '#E3685B',
  ux_hover_red: '#C2594E',
  ux_green: '#53C68C',
  ux_hover_green: '#46A676',
  blackHalfOpacity: 'rgba(0,0,0,0.5)'
};

export const pallete = {
  white: 'white',
  hintBackground: '#F5F5F5',
  tintLine: '#E6E6E6',
  tagsText: '#999999',
  black: '#000000',
  masterText: '#4D4D4D',
  master: '#4285F4',
  facebook: '#3B5998'
};

export const font = {
  textSmall: 10,
  textMedium: 14,
  textLarge: 18,
  input: 17
};

export function translate(key) {
  return key;
}

export function alert(data = {}) {
  Alert.alert(data.text);
}

export function cropPicture(image) {
  const width = image.width > 800 ? 800 : image.width;
  return ImagePicker.openCropper({
    path: image.path,
    includeBase64: true,
    width,
    height: width
  });
}

export async function imageTakeFromCamera() {
  const camera = await ImagePicker.openCamera({ width: 800, height: 800 });
  return [await cropPicture(camera)];
}

export async function fromGallery(multiple = true) {
  const images = await ImagePicker.openPicker({
    multiple
  });
  const croppedImages = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const image of images) {
    // eslint-disable-next-line no-await-in-loop
    croppedImages.push(await cropPicture(image));
  }
  return croppedImages;
}

export async function multiSourceImagePicker(
  source = 'gallery',
  uploadHandler
) {
  const { uploading, images } = this.state;
  this.setState({ isUploading: true });
  try {
    const croppedImages = await (source === 'gallery'
      ? fromGallery()
      : imageTakeFromCamera());
    this.setState({ uploading: croppedImages.length });
    croppedImages.forEach(async image => {
      const imageUrl = await uploadHandler(image);

      this.updateImages([...images, imageUrl]);
      this.setState({
        uploading: uploading - 1
      });
    });
    this.setState({ isUploading: false });
  } catch (error) {
    this.setState({ isUploading: false });
    if (error && error.code === 'E_PERMISSION_MISSING') {
      return alert({ text: translate('e_permission_missing') });
    }
    if (error && error.message && error.message.indexOf('cancelled') > -1) {
      return false;
    }

    alert({
      text: translate('cannot_upload_picture').replace('%msg%', error.message)
    });
  }
  return false;
}

/* @description hostComponent is the place that the code should be ran on */
export function photoSourceActionSheet(handler) {
  return (
    <ActionSheet
      ref={o => (this.ImageSourceSelector = o)}
      title={translate('pick_photo_from')}
      options={[
        translate('take_photo_camera'),
        translate('gallery'),
        translate('cancel')
      ]}
      cancelButtonIndex={2}
      destructiveButtonIndex={1}
      onPress={index => {
        if (index === 1) {
          handler('gallery');
        }
        if (index === 0) {
          handler('camera');
        }
      }}
    />
  );
}
