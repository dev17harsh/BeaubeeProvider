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
import {Colors} from '../../theme/colors';
import {DimensionsConfig} from '../../theme/dimensions';
import {Images} from '../../assets/images';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const ListProfessionalModal = ({visible, onClose}) => {
  const [selectedOption, setSelectedOption] = useState('highToLow');
  const [selectedItem, setselectedItem] = useState(null);

  const selectedItemsSte = data => {
    setselectedItem(data);
    onClose();
  };

  // selectedItem
  const data = [
    {
      id: '1',
      name: 'Johnathan Morrison',
      rating: 5.0,
      reviews: 121,
      image: Images.Image1,
    },
    {
      id: '2',
      name: 'Maria Kevin',
      rating: 5.0,
      reviews: 100,
      image: Images.Image2,
    },
    {
      id: '3',
      name: 'Linda Johnson',
      rating: 5.0,
      reviews: 99,
      image: Images.image11,
    },
    {
      id: '4',
      name: 'Kevin Frank',
      rating: 5.0,
      reviews: 80,
      image: Images.image22,
    },
    {
      id: '5',
      name: 'Dwayne Jackson',
      rating: 5.0,
      reviews: 60,
      image: Images.image33,
    },
    {
      id: '6',
      name: 'Tom Cameron',
      rating: 5.0,
      reviews: 45,
      image: Images.image44,
    },
    {
      id: '7',
      name: 'Conor Charlie',
      rating: 5.0,
      reviews: 40,
      image: Images.image55,
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        selectedItemsSte(item);
      }}>
      <Image source={item.image} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Image source={Images?.starIcon} style={styles.plusIcon} />
          <Text style={styles.ratingText}> {item.rating + '.0'}</Text>
          <Text style={styles.reviewsText}>({item.reviews} Reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose} />
      <View style={styles.modalContent}>
        <TouchableOpacity
          onPress={onClose}
          hitSlop={100}
          style={styles?.CloserView}
        />
        <Text style={styles.title}>Select Professional</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </Modal>
  );
};

export default ListProfessionalModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    height: '70%',
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
    // textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
});
