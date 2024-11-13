import { Image, StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '../theme/colors';
import { Images } from '../assets/images';
import { DimensionsConfig } from '../theme/dimensions';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
         <StatusBar backgroundColor={Colors?.primary} barStyle={'light-content'} />
      <Image source={Images.logoWhite} style={styles.icon} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  icon: {
    height: DimensionsConfig.logoHeight,
    width: DimensionsConfig.logoWidth,
    resizeMode: 'contain',
  },
});
