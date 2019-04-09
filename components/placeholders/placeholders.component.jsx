// import React from 'react';
// import PropTypes from 'prop-types';

// export class Placeholders extends React.Component {
//   render() {
//     const { images, placeHolders } = this.props;

//     const imageIndex = images.length - 1;
//     return placeHolders.map((item, index) => (
//       <TouchableOpacity onPress={this.onPressEmptyImageHolder}>
//         <ImageBackground
//           style={[
//             (index + 1 + imageIndex) % 4 === 0
//               ? styles.firstImage
//               : styles.images
//           ]}
//         >
//           <View style={styles.overlay}>
//             <View style={styles.counterPlaceholder}>
//               <Text style={styles.textCounterPlaceholder}>
//                 {index + imageIndex + 2}
//               </Text>
//             </View>
//           </View>
//         </ImageBackground>
//       </TouchableOpacity>
//     ));
//   }
// }

// Placeholders.propTypes = {
//   images: PropTypes.any,
//   placeHolders: PropTypes.any
// }