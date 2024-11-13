import { Dimensions } from 'react-native';

// Get device screen dimensions
const { width, height } = Dimensions.get('window');

export const DimensionsConfig = {
  // Screen dimensions
  screenWidth: width,
  screenHeight: height,

  // Font sizes
  fontSmall: 12,
  fontRegular: 16,
  fontLarge: 20,
  fontExtraLarge: 24,

  // Spacing (Margin, Padding)
  spaceTiny: 4,
  spaceSmall: 8,
  spaceRegular: 16,
  spaceLarge: 24,
  spaceExtraLarge: 32,

  // Component dimensions (example)
  buttonHeight: height * 0.07,
  buttonWidth: width * 0.9,
  inputHeight: height * 0.07,
  inputWidth: width * 0.9,
  logoHeight: height * 0.15,
  logoWidth: width * 0.4,
};
