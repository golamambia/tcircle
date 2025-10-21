import { Dimensions } from "react-native";

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const theme = {
  paddingHorizontal:screenWidth*0.032,
  colors: {
    primary: '#518ADA',
    secondary: '#518ADA',
    background: '#FFFFFF',
    textPrimary: '#595858',
    textSecondary: '#323030',
    colorHeading: '#323030',
    white: '#FFFFFF',
    black: '#000',
    error: '#B00020',
    red: '#ED2F2F',
    activeColor: '#4BB543',
    inputLabelColor: '#3C3C3C',
    inputTextColor: '#707274',
    inputBoxBorderColor: '#ccc',
  },

  fonts: {
    regular: 'Montserrat-Regular', //400
    semiBold: 'Montserrat-SemiBold.ttf', //600
    bold: 'Montserrat-Bold', //700
    medium: 'Montserrat-Medium.ttf', //500
    light: 'Montserrat-Light.ttf', //300
    thin: 'Montserrat-Thin.ttf', //100
  },
  fontsWeight: {
    regular: '400',
    semiBold: '600',
    bold: '700',
    medium: '500',
    light: '300',
    thin: '100',
  },
  fontSizes: {
    smallest: 8,
    smaller: 10,
    small: 12,
    fontSize14: 14,
    medium: 16,
    fontSize18: 18,
    large: 20,
    fontSize22: 22,
    larger: 24,
    fontSize26: 26,
    fontSize28: 28,
    largest: 30,
  },
};

export default theme;
