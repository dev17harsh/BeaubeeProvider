import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../assets/images';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
const AppHeader = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Images?.BackIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity>
       {title == "Business Profile" ? ( <Image source={Images?.HeartIcon} style={styles.backIcon} />) : <Image style={styles.backIcon} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (mobileW * 5) / 100,
    paddingVertical: (mobileW * 6) / 100,
    borderBottomColor: '#ebedf4',
    borderBottomWidth: (mobileW * 0.5) / 100,
  },
  headerBackIconView: {
    backgroundColor: '#FFFFFF',
    width: (mobileW * 10) / 100,
    height: (mobileW * 10) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (mobileH * 5) / 100,
  },
  backIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#000',
  },
});

export default AppHeader;
