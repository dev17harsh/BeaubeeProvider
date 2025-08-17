import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import {Colors} from '../theme/colors';
import {mobileW} from './utils';

const CommonButton = ({onPress, title, buttonStyle, textStyle , isDisable}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisable}
      style={[styles.rescheduleButton, buttonStyle]} // Allow for additional custom styles
    >
      <Text style={[styles.rescheduleText, textStyle]}>
        {title === undefined || null ? 'Submit' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rescheduleButton: {
    backgroundColor: Colors.primary, // You can replace with your Colors.primary
    borderRadius: (mobileW * 2.8) / 100,
    paddingVertical: Platform.OS == 'ios' ? (mobileW * 4) / 100 : (mobileW * 3.3) / 100,
    alignItems: 'center',
    marginTop: (mobileW * 4) / 100,
  },
  rescheduleText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '600',
  },
});

export default CommonButton;
