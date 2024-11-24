import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import {DimensionsConfig} from '../theme/dimensions';
import {Images} from '../assets/images';
import {Colors} from '../theme/colors';
import AppHeader from '../components/AppHeader';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const StaffProfile = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState('highToLow');
  const [selectedId, setSelectedId] = useState(null);

  const data = [
    {
      id: '1',
      name: 'Johnathan Morrison',
      rating: 5.0,
      reviews: 121,
      image: Images.Image1,
      email: 'Johnathanmorrison@gmail.com',
    },
    {
      id: '2',
      name: 'Maria Kevin',
      rating: 5.0,
      reviews: 100,
      image: Images.Image2,
      email: 'Mariakevin@gmail.com',
    },
    {
      id: '3',
      name: 'Linda Johnson',
      rating: 5.0,
      reviews: 99,
      image: Images.image11,
      email: 'Lindajohnson@gmail.com',
    },
    {
      id: '4',
      name: 'Kevin Frank',
      rating: 5.0,
      reviews: 80,
      image: Images.image22,
      email: 'KevinFrank@gmail@gmail.com',
    },
    {
      id: '5',
      name: 'Dwayne Jackson',
      rating: 5.0,
      reviews: 60,
      image: Images.image33,
      email: 'Dwaynejackson@gmail@gmail.com',
    },
    {
      id: '6',
      name: 'Tom Cameron',
      rating: 5.0,
      reviews: 45,
      image: Images.image44,
      email: 'Tomcameron@gmail@gmail.com',
    },
    {
      id: '7',
      name: 'Conor Charlie',
      rating: 5.0,
      reviews: 40,
      image: Images.image55,
      email: 'Conorcharlie@gmail@gmail.com',
    },
  ];

  const handleItemPress = item => {
    const newSelectedId = item.id === selectedId ? null : item.id;
    setSelectedId(newSelectedId);

    // Return selected item data to the parent component
    if (onSelect) {
      onSelect(newSelectedId ? item : null); // Pass selected item or null if deselected
    }
  };

  const renderItem = ({item}) => {
    const isSelected = item.id === selectedId;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.itemContainer}
        onPress={() => navigation.navigate('StaffDetails')}>
        <Image source={item.image} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: (mobileW * 1) / 100,
            }}>
            <Image source={Images?.starIcon} style={styles?.backIcon} />
            <Text style={styles?.ratingText}>
              {item?.rating + '.0 '}
              <Text style={[styles.ratingText, styles.reviewTxt]}>
                ({item?.reviews + ' Ratings'})
              </Text>
            </Text>
          </View>
        </View>
        <Image source={Images?.forwardIcon} style={styles.plusIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.modalOverlay}>
      <AppHeader title={'Staff Profiles'} />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
        <TouchableOpacity style={styles.fab} onPress={() => {
                navigation.navigate('AddProfesssional')
            }}>
                <Image source={Images?.PlusWhite} style={{
                    height: DimensionsConfig.screenHeight * 0.028,
                    width: DimensionsConfig.screenHeight * 0.028,
                    resizeMode: 'contain'
                }} />
            </TouchableOpacity>
    </View>
  );
};

export default StaffProfile;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 15,
    paddingHorizontal: (mobileW * 3) / 100,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: (mobileW * 3) / 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    width: (mobileW * 90) / 100,
    // elevation: 2,
    marginTop: (mobileW * 4) / 100,
    paddingHorizontal: (mobileW * 3) / 100,
    borderRadius: (mobileW * 2) / 100,
  },
  profileImage: {
    width: (mobileW * 15) / 100,
    height: (mobileW * 15) / 100,
    borderRadius: (mobileW * 7.5) / 100,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black, // Star color
    marginRight: 8,
  },
  reviewsText: {
    fontSize: 14,
    color: '#888',
  },
  plusIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  CloserView: {
    height: DimensionsConfig?.screenHeight * 0.008,
    width: DimensionsConfig?.screenWidth * 0.14,
    borderRadius: 10,
    backgroundColor: '#9E98AC',
    alignSelf: 'center',
    marginBottom: 10,
  },
  backIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  reviewTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray, // Star color
    marginRight: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: DimensionsConfig.screenHeight * 0.07,
    height: DimensionsConfig.screenHeight * 0.07,
    backgroundColor: '#A020F0',
    borderRadius: DimensionsConfig.screenHeight * 0.07 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
},
});
