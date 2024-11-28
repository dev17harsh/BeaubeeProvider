import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {DimensionsConfig} from '../theme/dimensions';
import {Images} from '../assets/images';
import {Colors} from '../theme/colors';
import AppHeader from '../components/AppHeader';
import {mobileW} from '../components/utils';

const services = [
  {id: '1', image: Images?.Image1, isVideo: true},
  {id: '2', image: Images?.Image2},
  {id: '3', image: Images?.Image1},
  {id: '2', image: Images?.Image2},
  {id: '3', image: Images?.Image1, isVideo: true},
  {id: '1', image: Images?.Image1},
  {id: '2', image: Images?.Image2},
  {id: '3', image: Images?.Image1},
  {id: '2', image: Images?.Image2, isVideo: true},
  {id: '3', image: Images?.Image1},
  {id: '1', image: Images?.Image1},
  {id: '2', image: Images?.Image2},
  {id: '3', image: Images?.Image1, isVideo: true},
  {id: '2', image: Images?.Image2},
  {id: '3', image: Images?.Image1},
];

const Posts = ({navigation}) => {
  const [postName, setPostName] = useState('All');

  const categories = [
    {id: '1', title: 'All', icon: Images?.allPosts},
    {id: '2', title: 'Hair', icon: Images?.Hair},
    {id: '3', title: 'Skin Tone', icon: Images?.Skincare},
    {id: '4', title: 'Makeup', icon: Images?.Makeup},
    {id: '5', title: 'Hair', icon: Images?.Hair},
    {id: '6', title: 'Skin Tone', icon: Images?.Hair},
    {id: '7', title: 'Makeup', icon: Images?.Makeup},
  ];

  // Render categories horizontally
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setPostName(item.title)}
      style={[
        styles.button,
        {
          backgroundColor:
            postName == item.title ? Colors.primary : Colors.white,
        },
      ]}>
      <Image
        source={item?.icon}
        style={[
          styles.icon,
          {
            tintColor: postName == item.title ? Colors.white : Colors.primary,
          },
        ]}
      />
      {item.title !== '' && (
        <Text
          style={[
            styles.text,
            {
              color: postName == item.title ? Colors.white : Colors.primary,
            },
          ]}>
          {item.title}
        </Text>
      )}
    </TouchableOpacity>
  );

  // Render service cards vertically
  const renderService = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('PostLook')}>
      <ImageBackground
        resizeMode="cover"
        source={item.image}
        imageStyle={styles.serviceImage}
        style={styles.serviceImage}>
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={Images?.horizontalDotIcon}
            style={[styles.verticalDotIcon]}
          />
        </TouchableOpacity>
        {item.isVideo && (
          <Image source={Images?.VideoIcon} style={[styles.VideoIconStyle]} />
        )}
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <AppHeader title={'Posts'} />
      {/* Vertical FlatList for categories */}
      <View>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      {/* Vertical FlatList for Services */}
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.serviceList}
        numColumns={3}
        contentContainerStyle={{
          alignSelf: 'center',
          paddingBottom: (DimensionsConfig?.screenWidth * 10) / 100,
          right: 6,
        }}
        ListFooterComponent={<View style={{height: 20}} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.white,
  },
  card: {
    backgroundColor: Colors?.white,
    borderRadius: 10,
    padding: 15,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  serviceImage: {
    width: (DimensionsConfig?.screenWidth * 29) / 100,
    height: (DimensionsConfig?.screenWidth * 29) / 100,
    borderRadius: 10,
    marginBottom: (mobileW * 1.5) / 100,
    marginHorizontal: (mobileW * 1.5) / 100,
  },
  bookButtonText: {
    fontSize: 16,
    color: '#8e44ad',
  },
  serviceList: {
    marginTop: 20,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors?.white,
    borderRadius: (DimensionsConfig?.screenWidth * 4) / 100,
    paddingHorizontal: 15,
    paddingVertical: (DimensionsConfig?.screenWidth * 3) / 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  verticalDotIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
    right: (mobileW * 0.3) / 100,
    top: (mobileW * 1) / 100,
    position: 'absolute',
  },
  VideoIconStyle: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
    right: (mobileW * 0.3) / 100,
    bottom: (mobileW * 1) / 100,
    position: 'absolute',
  },
  text: {
    fontSize: (DimensionsConfig?.screenWidth * 3.2) / 100,
    color: '#4B4B4B',
    fontWeight: '500',
  },
});

export default Posts;
