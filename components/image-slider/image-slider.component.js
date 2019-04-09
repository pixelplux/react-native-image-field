import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { styles } from './image-slider.style';
import { colors } from '@product/theme';

/**
 * For smaller margin or different components, get the width like this
 * 
 * onLayout = event => {
    if (this.state.dimensions) return;
    let { width, height } = event.nativeEvent.layout;
    this.setState({ dimensions: { width, height } });
  };
 */
const initScreenDimensions = Dimensions.get('window');
const width = initScreenDimensions.width;
export class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
    this._onImagesPressed = this._onImagesPressed.bind(this);
  }
  _onImagesPressed(index) {
    if (this.props.onImagesPressed) {
      this.props.onImagesPressed(index);
    }
  }
  _renderItem({ item, index }) {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => this._onImagesPressed(index)}
      >
        <Image style={{ width: null, height: Dimensions.get('window').width }} source={{ uri: item }} />
      </TouchableWithoutFeedback>
    );
  }
  get pagination() {
    return (
      <Pagination
        borderRadius={2}
        dotsLength={this.props.imagesSource.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={styles.PaginationContainerStyle}
        dotStyle={styles.dotStyle}
        dotColor={colors.imageSliderDotColor}
        inactiveDotColor={colors.white}
        inactiveDotOpacity={0.8}
        inactiveDotScale={0.8}
        carouselRef={this._slider1Ref}
        tappableDots={!!this._slider1Ref}
      />
    );
  }
  render() {
    return (
      <View style={{ borderRadius: 2 }}>
        <Carousel
          borderTopRightRadius={2}
          borderTopLeftRadius={2}
          ref={c => (this._slider1Ref = c)}
          data={this.props.imagesSource}
          renderItem={item => this._renderItem(item)}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          layout={'default'}
          sliderWidth={this.props.parentWidth || width}
          itemWidth={this.props.parentWidth || width}
          loop={false}
        />
        {this.props.imagesSource.length > 1 && this.pagination}
      </View>
    );
  }
}
