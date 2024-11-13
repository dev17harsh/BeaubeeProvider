// ServiceSelector.js
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import {Images} from '../../assets/images';
import {mobileW} from '../utils';
import {Colors} from '../../theme/colors';

const ServiceSelector = ({
  visible,
  onClose,
  onSelectService,
  tabs,
  services,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleServiceSelect = service => {
    onSelectService(service);
    onClose(); // Close modal after selection
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          {/* Dynamic Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabContainer}>
            {tabs.map((tab, index) => (
              <View>
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tabButton,
                    activeTab === tab ? styles.activeTab : null,
                  ]}
                  onPress={() => setActiveTab(tab)}>
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab ? styles.activeTabText : null,
                    ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Service List */}
          <FlatList
            data={services.filter(service => service.category === activeTab)}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceTitle}>{item.title}</Text>
                  <Text style={styles.servicePrice}>{item.price}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={Images?.Like} style={styles.forwardIcon} />
                  <Text style={styles.serviceRating}>
                    {item.rating} ({item.reviews})
                  </Text>
                </View>
                <Text style={styles.serviceDuration}>
                  Duration: {item.duration}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => handleServiceSelect(item)}>
                    <Text style={styles.selectButtonText}>Select</Text>
                  </TouchableOpacity>
                  <Image source={Images?.downError} style={styles.downIcon} />
                </View>
                <View style={styles.straightLine} />

              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ServiceSelector;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    bottom: 0,
    position: 'absolute',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6200EE',
  },
  tabText: {
    color: Colors.black,
    fontSize: (mobileW * 3.5) / 100,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6200EE',
  },
  serviceCard: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicePrice: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  serviceRating: {
    color: '#888',
    marginVertical: 5,
    left: 10,
  },
  serviceDuration: {
    color: '#888',
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: Colors.semiPurpleLight,
    padding: 10,
    borderRadius: (mobileW * 1.5) / 100,
    alignItems: 'center',
    width: (mobileW * 78) / 100,
  },
  selectButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#6200EE',
    fontSize: 16,
  },
  forwardIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  downIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
  straightLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E7E7E7',
    marginVertical: (mobileW * 3) / 100,
  },
});
