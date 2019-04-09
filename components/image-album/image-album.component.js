import React, { Component } from 'react';
import ActionSheet from 'react-native-actionsheet';

import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { styles } from './image-album.style';

import {
  ValidationTypes,
  multiSourceImagePicker,
  photoSourceActionSheet
} from '../../services/shared';
import { ProgressbarComponent } from '../progressbar/progressbar.component';

export class ImageAlbumComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      images: [],
      selection: [],
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

  getOrientation() {
    let { width, height } = Dimensions.get('window');
    const isPortrait = width > height ? false : true;
    this.setState({ isPortrait }, () => {
      this.updateImages(this.state.images, false);
    });
  }

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
  updateImages(images, invokeParent = true) {
    this.setState(
      {
        images
      },
      () => {
        this.calculateNumberOfPlaceHolders();
      }
    );
    if (this.props.onImagesChange && invokeParent) {
      this.props.onImagesChange(images);
    }
  }

  componentWillMount() {
    this.updateImages(this.props.images, false);
  }

  onPressImage(index) {
    this.imageIndex = index;
    this.ActionSheet.show();
  }

  onDeleteImage() {
    this.updateImages(
      this.state.images.filter((item, index) => index !== this.imageIndex)
    );
  }

  onSetDefault() {
    const images = [...this.state.images];
    const selectedImage = images[this.imageIndex];
    images[this.imageIndex] = images[0];
    images[0] = selectedImage;

    this.updateImages(images);
  }

  onPressEmptyImageHolder() {
    this.ImageSourceSelector.show();
  }

  render() {
    const { isUploading, uploading } = this.state;
    const { ValidationMessage, ValidationType } = this.props;
    return (
      <View style={{ borderRadius: 2 }}>
        <TouchableOpacity
          onPress={this.imagePicker}
          style={{ margin: 5, marginTop: 10 }}
        >
          <Text>
            {this.props.title || 'Tap to select a photo. Tap on photo to edit.'}
          </Text>
        </TouchableOpacity>

        {isUploading || uploading ? <ProgressbarComponent /> : null}
        {uploading ? (
          <View style={styles.uploadNotificationContainer}>
            <Text style={styles.notificationText}>
              {uploading ? '(' + uploading + ') ...' : null}
            </Text>
          </View>
        ) : null}

        {this.imageContentGenerator()}
        {this.showValidationMessage(ValidationMessage, ValidationType)}
        {this.imageSelectActionSheet()}
        {this.photoSourceActionSheet(this.multiSourceImagePicker)}
      </View>
    );
  }

  imageSelectActionSheet() {
    return (
      <ActionSheet
        ref={o => (this.ActionSheet = o)}
        title={'What to do with image?'}
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

  imageContentGenerator() {
    return (
      <TouchableWithoutFeedback onPress={this.onPressEmptyImageHolder}>
        <View style={styles.imagesWrapper}>
          {this.state.images.map((image, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.onPressImage(index)}
              >
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
          })}
          {this.generatePlaceHolders()}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  calculateNumberOfPlaceHolders() {
    const { isPortrait } = this.state;
    let multiplexer = isPortrait ? 4 : 8;
    let imageCount = this.state.images.length;
    let rowPLNeed = Math.floor(imageCount / multiplexer) + 1;
    let plNeed = rowPLNeed * multiplexer - imageCount;
    let placeHolders = Array(plNeed)
      .fill()
      .map((e, i) => i + 1);
    this.setState({ placeHolders });
  }

  generatePlaceHolders() {
    let imageIndex = this.state.images.length - 1;
    return this.state.placeHolders.map((item, index) => {
      return (
        <TouchableOpacity key={index} onPress={this.onPressEmptyImageHolder}>
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

  showValidationMessage(ValidationMessage, ValidationType) {
    return (
      <View style={{ margin: 0, padding: 0 }}>
        {ValidationMessage !== '' && ValidationMessage !== undefined && (
          <Text
            style={
              ValidationType === ValidationTypes.Error
                ? styles.message_error
                : styles.message_warning
            }
          >
            {[ValidationMessage]}
          </Text>
        )}
      </View>
    );
  }
}
