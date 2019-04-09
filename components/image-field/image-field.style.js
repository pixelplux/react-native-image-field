import { StyleSheet, Dimensions } from 'react-native';
import { colors, font } from '../../services/shared';

const spaceBetweenEachItem = 8;
const display_width = Dimensions.get('window').width;
const imageSquareSize = (display_width - spaceBetweenEachItem * 5) / 4;
const counterHolderSize = 25;
export const styles = StyleSheet.create({
  imagesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: spaceBetweenEachItem,
    marginBottom: spaceBetweenEachItem
  },
  images: {
    justifyContent: 'center',
    alignItems: 'center',
    width: imageSquareSize,
    height: imageSquareSize,
    backgroundColor: colors.grayLight,
    marginTop: spaceBetweenEachItem
  },
  firstImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: imageSquareSize,
    height: imageSquareSize,
    marginTop: spaceBetweenEachItem,
    backgroundColor: colors.grayLight
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  counter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: counterHolderSize,
    height: counterHolderSize,
    borderRadius: counterHolderSize / 2,
    backgroundColor: colors.imageAlbumCenterCircleBackground,
    opacity: 0.7
  },
  counterPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: counterHolderSize,
    height: counterHolderSize,
    borderRadius: counterHolderSize / 2,
    backgroundColor: colors.white,
    opacity: 0.7
  },
  textCounter: {
    alignSelf: 'center',
    color: colors.white,
    fontSize: font.textMedium
  },
  textCounterPlaceholder: {
    alignSelf: 'center',
    color: colors.grayDark,
    fontSize: font.textMedium
  },
  uploadNotificationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationText: {
    marginTop: spaceBetweenEachItem,
    color: colors.black900,
    fontSize: font.textMedium
  },
  message_error: {
    marginLeft: spaceBetweenEachItem,
    color: colors.message_error,
    fontSize: font.textSmall,
    marginBottom: 4
  },
  message_warning: {
    marginLeft: spaceBetweenEachItem,
    marginBottom: 4,
    color: colors.message_warning,
    fontSize: font.textSmall
  }
});
