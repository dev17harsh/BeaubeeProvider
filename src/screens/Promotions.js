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
  SafeAreaView,
} from 'react-native';
import {DimensionsConfig} from '../theme/dimensions';
import {Images} from '../assets/images';
import {Colors} from '../theme/colors';
import AppHeader from '../components/AppHeader';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const Promotions = ({visible, onClose, onSelect , navigation}) => {
  const [selectedOption, setSelectedOption] = useState('highToLow');
  const [selectedId, setSelectedId] = useState(null);

  const data = [
    {
      id: '1',
      name: '20% Off Storewide',
      rating: 5.0,
      reviews: 121,
      image: Images.Image1,
      email: 'Expired',
      status: true,
    },
    {
      id: '2',
      name: '15% Off Storewide',
      rating: 5.0,
      reviews: 100,
      image: Images.Image2,
      email: 'Active until 30 Oct, 2023',
      status: false,
    },
    {
      id: '3',
      name: '50% Off Storewide',
      rating: 5.0,
      reviews: 99,
      image: Images.image11,
      email: 'Expired',
      status: true,
    },
    {
      id: '4',
      name: '20% Off Braiding',
      rating: 5.0,
      reviews: 80,
      image: Images.image22,
      email: 'Expired',
      status: true,
    },
    {
      id: '5',
      name: '20% Off Storewide',
      rating: 5.0,
      reviews: 60,
      image: Images.image33,
      email: 'Active until 30 Oct, 2023',
      status: false,
    },
    {
      id: '6',
      name: 'Tom Cameron',
      rating: 5.0,
      reviews: 45,
      image: Images.image44,
      email: 'Active until 30 Oct, 2023',
      status: false,
    },
    {
      id: '7',
      name: 'Conor Charlie',
      rating: 5.0,
      reviews: 40,
      image: Images.image55,
      email: 'Expired',
      status: true,
    },
    {
      id: '8',
      name: 'Conor Charlie',
      rating: 5.0,
      reviews: 40,
      image: Images.image55,
      email: 'Active until 30 Oct, 2023',
      status: false,
    },
    {
      id: '9',
      name: 'Conor Charlie',
      rating: 5.0,
      reviews: 40,
      image: Images.image55,
      email: 'Expired',
      status: true,
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
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {backgroundColor: item.status ? '#D8DAE7' : Colors.white},
        ]}
        onPress={() => handleItemPress(item)}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.emailText}>{item.email}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: (mobileW * 4) / 100,
            paddingVertical: (mobileW * 2.5) / 100,
            backgroundColor: Colors.white,
            backgroundColor: item.status ? Colors.white : '#FCE9E9',
            borderRadius: (mobileW * 3) / 100,
          }}>
          <Text
            style={[
              styles.nameText,
              {color: item.status ? Colors.primary : Colors.red},
            ]}>
            {item.status ? 'Reactivate' : 'Disable'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <AppHeader title={'Promotions'} />
      <View style={{marginBottom: (mobileW * 18) / 100}}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={styles.listContent}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
          onPress={() => {navigation.navigate('NewPromotions')}}
        style={styles.addButton}>
        <Image style={styles.calenderIcon} source={Images.PlusWhite} />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default Promotions;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    height: '85%',
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: DimensionsConfig.screenWidth * 0.02,
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
    paddingVertical: (mobileW * 4) / 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FCE9E9',
    alignSelf: 'center',
    width: (mobileW * 90) / 100,
    // elevation: 2,
    marginTop: (mobileW * 4) / 100,
    paddingHorizontal: (mobileW * 3) / 100,
    borderRadius: (mobileW * 2) / 100,
  },
  profileImage: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    borderRadius: (mobileW * 7) / 100,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#301E39',
  },
  emailText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#301E39',
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
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  CloserView: {
    height: DimensionsConfig?.screenHeight * 0.008,
    width: DimensionsConfig?.screenWidth * 0.14,
    borderRadius: 10,
    backgroundColor: '#9E98AC',
    alignSelf: 'center',
    marginBottom: 10,
  },
  listContent: {
    marginBottom: (mobileW * 3) / 100,
    paddingBottom: 800,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: (mobileW * 1) / 100,
    backgroundColor: '#F6EFF9',
    borderRadius: (mobileW * 3) / 100,
    borderWidth: (mobileW * 1.5) / 100,
    borderColor: '#F6EFF9',
    marginVertical: (mobileW * 2) / 100,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderRadius: (mobileW * 3) / 100,
    paddingVertical: (mobileW * 2.8) / 100,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    color: Colors.black,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#8A2BE2',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  calenderIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
    resizeMode: 'contain',
  },
});
