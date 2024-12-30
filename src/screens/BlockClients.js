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

const BlockClients = ({visible, onClose, onSelect}) => {
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
      isBlock: true,
    },
    {
      id: '2',
      name: 'Maria Kevin',
      rating: 5.0,
      reviews: 100,
      image: Images.Image2,
      email: 'Mariakevin@gmail.com',
      isBlock: false,
    },
    {
      id: '3',
      name: 'Linda Johnson',
      rating: 5.0,
      reviews: 99,
      image: Images.image11,
      email: 'Lindajohnson@gmail.com',
      isBlock: true,
    },
    {
      id: '4',
      name: 'Kevin Frank',
      rating: 5.0,
      reviews: 80,
      image: Images.image22,
      email: 'KevinFrank@gmail@gmail.com',
      isBlock: true,
    },
    {
      id: '5',
      name: 'Dwayne Jackson',
      rating: 5.0,
      reviews: 60,
      image: Images.image33,
      email: 'Dwaynejackson@gmail@gmail.com',
      isBlock: false,
    },
    {
      id: '6',
      name: 'Tom Cameron',
      rating: 5.0,
      reviews: 45,
      image: Images.image44,
      email: 'Tomcameron@gmail@gmail.com',
      isBlock: false,
    },
    {
      id: '7',
      name: 'Conor Charlie',
      rating: 5.0,
      reviews: 40,
      image: Images.image55,
      email: 'Conorcharlie@gmail@gmail.com',
      isBlock: true,
    },
    {
      id: '8',
      name: 'Conor Charlie',
      rating: 5.0,
      reviews: 40,
      image: Images.image55,
      email: 'Conorcharlie@gmail@gmail.com',
      isBlock: false,
    },
    {
      id: '9',
      name: 'Conor Charlie',
      rating: 5.0,
      reviews: 40,
      image: Images.image55,
      email: 'Conorcharlie@gmail@gmail.com',
      isBlock: true,
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
        activeOpacity={0.8}
        style={[
          styles.itemContainer,
          {
            backgroundColor: item.isBlock ? '#FCE9E9' : Colors.white,
            borderColor: item.isBlock ? '#FCE9E9' : '#F6EFF9',
          },
        ]}
        onPress={() => handleItemPress(item)}>
        <Image source={item.image} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.emailText}>{item.email}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: (mobileW * 4) / 100,
            paddingVertical: (mobileW * 2.5) / 100,
            backgroundColor: Colors.white,
            backgroundColor: item.isBlock ? Colors.white : '#FCE9E9',
            borderRadius: (mobileW * 3) / 100,
          }}>
          <Text
            style={[
              styles.nameText,
              {color: item.isBlock ? Colors.primary : Colors.red},
            ]}>
            {item.isBlock ? 'Unblock' : 'Block'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [selectedTab, setSelectedTab] = useState('Blocked');

  // Filter the data based on selected tab
  const filteredData =
    selectedTab === 'Blocked' ? data.filter(item => item.isBlock) : data;

  const tabsView = () => {
    return (
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('Blocked');
          }}
          style={[styles.tab, selectedTab === 'Blocked' && styles.activeTab]}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Blocked' && styles.activeTabText,
            ]}>
            Blocked
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('All');
          }}
          style={[styles.tab, selectedTab === 'All' && styles.activeTab]}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'All' && styles.activeTabText,
            ]}>
            All
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <AppHeader title={'Block Clients'} />
        <View style={{paddingHorizontal: (mobileW * 3) / 100}}>
          {tabsView()}
        </View>
        <TouchableOpacity
          // onPress={() => setSearchModalVisible(true)}
          style={styles.locationSection}>
          <Image
            style={styles.tagIcon}
            resizeMode="contain"
            source={Images.SearchIcon}
          />
          <View style={styles.textInputView}>
            <Text style={styles.searchPlaceholder}>Search Client</Text>
          </View>
        </TouchableOpacity>
        <View style={{marginBottom: (mobileW * 36) / 100}}>
          <FlatList
            data={filteredData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            style={styles.listContent}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BlockClients;

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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FCE9E9',
    alignSelf: 'center',
    width: (mobileW * 90) / 100,
    // elevation: 2,
    borderWidth: 1,
    borderColor: '#F6EFF9',
    marginTop: (mobileW * 4) / 100,
    paddingHorizontal: (mobileW * 3) / 100,
    borderRadius: (mobileW * 2) / 100,
  },
  profileImage: {
    width: (mobileW * 14) / 100,
    height: (mobileW * 14) / 100,
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
    color: '#554F67',
    maxWidth: '95%',
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
    height: DimensionsConfig?.screenHeight * 0.004,
    width: DimensionsConfig?.screenWidth * 0.14,
    borderRadius: 10,
    backgroundColor: '#9E98AC',
    alignSelf: 'center',
    marginBottom: 10,
  },
  listContent: {
    marginBottom: (mobileW * 3) / 100,
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
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#ffffff',
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    borderRadius: (mobileW * 8) / 100,
    paddingVertical: (mobileW * 3.5) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tagIcon: {
    width: (mobileW * 5.2) / 100,
    height: (mobileW * 5.2) / 100,
  },
  textInputView: {
    left: 7,
    width: (mobileW * 75) / 100,
  },
  searchPlaceholder: {
    fontSize: (mobileW * 4) / 100,
    fontWeight: '400',
    color: '#554F67',
  },
});
