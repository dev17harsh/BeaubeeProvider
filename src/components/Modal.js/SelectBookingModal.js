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
import {DimensionsConfig} from '../../theme/dimensions';
import {Images} from '../../assets/images';
import {Colors} from '../../theme/colors';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const SelectBookingModal = ({visible, onClose, onSelect}) => {
  const [selectedOption, setSelectedOption] = useState('highToLow');
  const [selectedId, setSelectedId] = useState(null);

  const data = [
    {
      id: '1',
      image: Images.Image1,
      name: 'Business Name',
      categories: ['Hair', 'Makeup', 'Skincare'],
      rating: 5.0,
      reviews: 214,
    },
    {
      id: '2',
      image: Images.Image2,
      name: 'Business Name',
      categories: ['Hair', 'Makeup', 'Skincare'],
      rating: 5.0,
      reviews: 214,
    },
    {
      id: '3',
      image: Images.Image1,
      name: 'Business Name',
      categories: ['Hair', 'Makeup', 'Skincare'],
      rating: 5.0,
      reviews: 214,
    },
    {
      id: '4',
      image: Images.Image2,
      name: 'Business Name',
      categories: ['Hair', 'Makeup', 'Skincare'],
      rating: 5.0,
      reviews: 214,
    },
    {
      id: '5',
      image: Images.Image1,
      name: 'Business Name',
      categories: ['Hair', 'Makeup', 'Skincare'],
      rating: 5.0,
      reviews: 214,
    },
    {
      id: '6',
      image: Images.Image2,
      name: 'Business Name',
      categories: ['Hair', 'Makeup', 'Skincare'],
      rating: 5.0,
      reviews: 214,
    },
    {
      id: '7',
      image: Images.Image1,
      name: 'Business Name',
      categories: ['Hair', 'Makeup', 'Skincare'],
      rating: 5.0,
      reviews: 214,
    },
    {
      id: '8',
      image: Images.Image2,
      name: 'Business Name',
      categories: ['Hair', 'Makeup', 'Skincare'],
      rating: 5.0,
      reviews: 214,
    },
    // Add more entries as needed
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
        onPress={() => handleItemPress(item)}
        style={styles.card}>
        <Image source={item?.image} style={styles.image} />
        <View style={styles.content}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.name}>{item.name}</Text>
            <Image
              source={
                isSelected ? Images.selectedButton : Images.unSelectedButton
              }
              style={styles.plusIcon}
            />
          </View>
          <View style={styles.categories}>
            {item.categories.includes('Hair') && (
              <View
                style={{
                  right: 8,
                  paddingHorizontal: (mobileW * 2) / 100,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: (mobileW * 1) / 100,
                }}>
                <Image source={Images.Hair} style={styles.listIcons} />
                <Text style={styles.iconText}>Hair</Text>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: (mobileW * 1) / 100,
            }}>
            <Image source={Images?.calenderIcon} style={styles.listIcons} />
            <Text style={styles.iconText}>23 March, 2022 (from 1:00-2:00)</Text>
          </View>
          <View style={styles.rating}>
            <Image source={Images?.locationIcon} style={styles.listIcons} />
            <Text style={styles.ratingText}>{'Home'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  //   const renderItem = ({item}) => {
  //     const isSelected = item.id === selectedId;
  //     return (
  //       <TouchableOpacity
  //         style={styles.itemContainer}
  //         onPress={() => handleItemPress(item)}>
  //         <Image source={item.image} style={styles.profileImage} />
  //         <View style={styles.textContainer}>
  //           <Text style={styles.nameText}>{item.name}</Text>
  //         </View>

  //       </TouchableOpacity>
  //     );
  //   };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose} />
      <View style={styles.modalContent}>
        <TouchableOpacity
          onPress={onClose}
          hitSlop={100}
          style={styles?.CloserView}
        />
        <Text style={styles.title}>Select Customer</Text>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </Modal>
  );
};

export default SelectBookingModal;

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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    width: (mobileW * 90) / 100,
    elevation: 2,
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

  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    // padding: 12,
    marginBottom: (mobileW * 3) / 100,
    borderBottomWidth: (mobileW * 0.1) / 100,
    borderBottomColor: '#9E98AC',
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    padding: (mobileW * 2) / 100,
    borderRadius: (mobileW * 2) / 100, 
    borderWidth: 1,
    borderColor: '#F6EFF9',
  },
  image: {
    width: (mobileW * 25) / 100,
    height: (mobileW * 25) / 100,
    borderRadius: 10,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#301E39',
    marginBottom: 4,
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: (mobileW * 2) / 100,
  },
  ratingText: {
    marginLeft: (mobileW * 3) / 100,
    color: '#555',
  },
  heartIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLabel: {
    fontSize: (mobileW * 4.2) / 100,
    color: Colors.black,
    left: (mobileW * 4) / 100,
    fontWeight: '600',
    marginTop: 10,
  },
  heartIconStyle: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
  listIcons: {
    width: (mobileW * 3.8) / 100,
    height: (mobileW * 3.8) / 100,
    // left: (mobileW * 2) / 100,
    tintColor: '#9E98AC',
    resizeMode: 'contain',
  },
  iconText: {
    color: '#301E39',
    fontWeight: '400',
    fontSize: 12,
    left: (mobileW * 2) / 100,
  },
});
