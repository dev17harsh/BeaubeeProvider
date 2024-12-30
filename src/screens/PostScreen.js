import React, {useEffect, useState} from 'react';
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
import Storage from '../components/Storage';
import {useIsFocused} from '@react-navigation/native';

const servicesArray = [
  {id: 1, isLocal: false, image: Images?.Image1, isVideo: true},
  {id: 2, isLocal: false, image: Images?.Image2},
  {id: 3, isLocal: false, image: Images?.Image1},
  {id: 4, isLocal: false, image: Images?.Image2},
  {id: 5, isLocal: false, image: Images?.Image1, isVideo: true},
  {id: 6, isLocal: false, image: Images?.Image1},
  {id: 7, isLocal: false, image: Images?.Image2},
  {id: 8, isLocal: false, image: Images?.Image1},
  {id: 9, isLocal: false, image: Images?.Image2, isVideo: true},
  {id: 10, isLocal: false, image: Images?.Image1},
  {id: 11, isLocal: false, image: Images?.Image1},
  {id: 12, isLocal: false, image: Images?.Image2},
  {id: 13, isLocal: false, image: Images?.Image1, isVideo: true},
  {id: 14, isLocal: false, image: Images?.Image2},
  {id: 15, isLocal: false, image: Images?.Image1},
];

const Posts = ({navigation}) => {
  const [postName, setPostName] = useState('All');
  const [services, setServices] = useState(null);
  const isFocused = useIsFocused();
  const categories = [
    {id: 1, title: 'All', icon: Images?.allPosts},
    {id: 2, title: 'Hair', icon: Images?.Hair},
    {id: 3, title: 'Skin Tone', icon: Images?.Skincare},
    {id: 4, title: 'Makeup', icon: Images?.Makeup},
    {id: 5, title: 'Hair', icon: Images?.Hair},
    {id: 6, title: 'Skin Tone', icon: Images?.Hair},
    {id: 7, title: 'Makeup', icon: Images?.Makeup},
  ];

  useEffect(() => {
    setDataToStorage();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setDataToStorage();
    }
  }, [isFocused]);

  const setDataToStorage = async () => {
    let postData = await Storage.get('post_data');
    console.log('=============>>>>>>>>>',postData);
    
    if (postData === null) {
      setServices(servicesArray);
      console.log('=============>>>>>>>>>11111111111',postData);

      await Storage.set('post_data', services);
    } else {
      setServices(postData);
    }
  };

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
    <TouchableOpacity activeOpacity={0.8}>
      <ImageBackground
        resizeMode="cover"
        source={item.isLocal ? {uri: item.image} : item.image}
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
      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('PostLook')}
        style={styles.addButton}>
        <Image style={styles.calenderIcon} source={Images.PlusWhite} />
      </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  serviceImage: {
    width: (DimensionsConfig?.screenWidth * 29) / 100,
    height: (DimensionsConfig?.screenWidth * 29) / 100,
    borderRadius: 10,
    marginBottom: (mobileW * 1.9) / 100,
    marginHorizontal: (mobileW * 1.2) / 100,
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
  addButton: {
    backgroundColor: Colors?.primary,
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: (mobileW * 13) / 100,
    height: (mobileW * 13) / 100,
    borderRadius: (mobileW * 7.5) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  calenderIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
    resizeMode: 'contain',
  },
});

export default Posts;
