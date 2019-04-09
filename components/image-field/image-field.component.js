import React, { Component } from 'react';
import ActionSheet from 'react-native-actionsheet';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { styles } from './image-field.style';

import {
  multiSourceImagePicker,
  photoSourceActionSheet
} from '../../services/shared';
import { ProgressbarComponent } from '../progressbar/progressbar.component';
import { PlaceHolder } from '../placeholder/placeholder.component';
import { ImageHolder } from '../imageholder/imageholder.component';
import { Message } from '../validation/validation.component';

export class ImageField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      uploading: 0,
      isUploading: false,
      placeHolders: [],
      isPortrait: true
    };
    this.onSetDefault = this.onSetDefault.bind(this);
    this.getOrientation = this.getOrientation.bind(this);
    this.onPressEmptyImageHolder = this.onPressEmptyImageHolder.bind(this);
    this.onChangeOrientationHandler = this.onChangeOrientationHandler.bind(
      this
    );
    this.photoSourceActionSheet = photoSourceActionSheet.bind(this);
    this.multiSourceImagePicker = multiSourceImagePicker.bind(this);
  }

  componentWillMount() {
    const { images } = this.props;
    this.updateImages(images, false);
  }

  // eslint-disable-next-line react/sort-comp
  onChangeOrientationHandler() {
    this.getOrientation();
  }

  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', this.onChangeOrientationHandler);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChangeOrientationHandler);
  }

  componentWillReceiveProps(props) {
    if (props.images) {
      this.setState(
        {
          images: props.images
        },
        () => {
          this.calculateNumberOfPlaceHolders();
        }
      );
    }
  }

  onPressImage = index => {
    this.imageIndex = index;
    this.ActionSheet.show();
  };

  onDeleteImage() {
    const { images } = this.state;
    this.updateImages(
      images.filter((item, index) => index !== this.imageIndex)
    );
  }

  onSetDefault() {
    const { images } = this.state;
    const tempImages = [...images];
    const selectedImage = tempImages[this.imageIndex];
    // eslint-disable-next-line prefer-destructuring
    tempImages[this.imageIndex] = tempImages[0];
    tempImages[0] = selectedImage;

    this.updateImages(tempImages);
  }

  onPressEmptyImageHolder() {
    this.ImageSourceSelector.show();
  }

  getOrientation() {
    const { width, height } = Dimensions.get('window');
    const { images } = this.state;
    const isPortrait = width < height;
    this.setState({ isPortrait }, () => {
      this.updateImages(images, false);
    });
  }

  uploadBySource = source => {
    const { uploadHandler } = this.props;
    this.multiSourceImagePicker(source, uploadHandler);
  };

  updateImages(images, invokeParent = true) {
    this.setState({ images }, () => {
      this.calculateNumberOfPlaceHolders();
    });
    if (this.props.onImagesChange && invokeParent) {
      this.props.onImagesChange(images);
    }
  }

  imageSelectActionSheet() {
    return (
      <ActionSheet
        // eslint-disable-next-line no-return-assign
        ref={o => (this.ActionSheet = o)}
        title="What to do with image?"
        options={['Set as default', 'Delete image', 'cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={index => {
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

  imageContentGenerator() {
    const { placeHolders, images } = this.state;
    return (
      <TouchableWithoutFeedback onPress={this.onPressEmptyImageHolder}>
        <View style={styles.imagesWrapper}>
          {images.map((image, index) => {
            return (
              <ImageHolder
                image={image}
                index={index}
                onPressImage={this.onPressImage}
              />
            );
          })}
          <PlaceHolder
            placeHolders={placeHolders}
            images={images}
            onPressEmptyImageHolder={this.onPressEmptyImageHolder}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  calculateNumberOfPlaceHolders() {
    const { images, isPortrait } = this.state;
    const multiplexer = isPortrait ? 4 : 8;
    const imageCount = images.length;
    const rowPLNeed = Math.floor(imageCount / multiplexer) + 1;
    const plNeed = rowPLNeed * multiplexer - imageCount;
    const placeHolders = Array(plNeed)
      .fill()
      .map((e, i) => i + 1);
    this.setState({ placeHolders });
  }

  render() {
    const { isUploading, uploading } = this.state;
    const { message, type, title } = this.props;
    return (
      <View style={{ borderRadius: 2 }}>
        <TouchableOpacity
          onPress={this.onPressImage}
          style={{ margin: 5, marginTop: 10 }}
        >
          <Text>{title || 'Tap to select a photo. Tap on photo to edit.'}</Text>
        </TouchableOpacity>

        {isUploading || uploading ? <ProgressbarComponent /> : null}
        {uploading ? (
          <View style={styles.uploadNotificationContainer}>
            <Text style={styles.notificationText}>
              {uploading ? `(${uploading})` : null}
            </Text>
          </View>
        ) : null}

        {this.imageContentGenerator()}
        <Message message={message} type={type} />
        {this.imageSelectActionSheet()}
        {this.photoSourceActionSheet(this.uploadBySource)}
      </View>
    );
  }
}
ImageField.defaultProps = {
  message: null,
  type: null,
  onImagesChange: null
};

ImageField.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  uploadHandler: PropTypes.func.isRequired,
  onImagesChange: PropTypes.func,
  message: PropTypes.string,
  type: PropTypes.string
};
