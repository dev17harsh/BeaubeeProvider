// CustomButton.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {mobileW} from './utils';

const CustomButton = ({title, onPress, style, textStyle}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffeef0', // Light red background
    paddingVertical: (mobileW * 4) / 100,
    paddingHorizontal: (mobileW * 2) / 100,
    borderRadius: (mobileW * 2.5) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fc6076', // Darker red text color
    fontWeight: 'bold',
    fontSize: (mobileW * 3.8) / 100,
  },
});

export default CustomButton;
