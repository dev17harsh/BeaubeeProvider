import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SectionList, ImageBackground, StatusBar, SafeAreaView } from 'react-native';
import { Images } from '../assets/images';
import { Colors } from '../theme/colors';
import { DimensionsConfig } from '../theme/dimensions';

const data = [
  {
    id: '1',
    date: '23rd March',
    customerName: "Customer's name",
    service: 'Hair',
    time: 'from 1:00 to 2:00',
    location: 'Location goes here',
    image: Images.image11,
    unread: true,
  },
  {
    id: '2',
    date: '23rd March',
    customerName: "Customer's name",
    service: 'Hair',
    time: 'from 1:00 to 2:00',
    location: 'Location goes here',
    image: Images.image22,
    unread: true,
  },
  {
    id: '3',
    date: '24th March',
    customerName: "Customer's name",
    service: 'Hair',
    time: 'from 1:00 to 2:00',
    location: 'Location goes here',
    image: Images.image33,
    unread: false,
  },
  {
    id: '4',
    date: '24th March',
    customerName: "Customer's name",
    service: 'Hair',
    time: 'from 1:00 to 2:00',
    location: 'Location goes here',
    image: Images.image44,
    unread: true,
  },
];

const ChatScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Filter and group data by date
  const getFilteredData = () => {
    // Apply the filter based on the selected option (All or Unread)
    const filteredData = data.filter(item => selectedFilter === 'All' || item.unread);

    // Group data by date
    const groupedData = filteredData.reduce((acc, item) => {
      const dateSection = acc.find(section => section.date === item.date);
      if (dateSection) {
        dateSection.data.push(item);
      } else {
        acc.push({ date: item.date, data: [item] });
      }
      return acc;
    }, []);

    return groupedData;
  };

  const renderSectionHeader = ({ section: { date } }) => (
    <Text style={styles.date}>{date}</Text>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>{
      navigation.navigate('UserChatScreen')
    }} style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={Images?.Hair} style={styles?.serviceIcon} />
          <Text style={styles.service}>{item.service}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={Images?.calenderIcon} style={styles?.serviceIcon} />
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={Images?.locationIcon} style={styles?.serviceIcon} />
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
      {item.unread && (
          <ImageBackground tintColor={Colors?.primary} source={Images?.ChatActive} style={{
            width: 30,
            height: 30,
            justifyContent: 'center'
          }} > 
          <Text style={styles.unreadText}>6</Text>
          </ImageBackground>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <StatusBar backgroundColor={Colors?.white} barStyle={'dark-content'} />
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Upcoming')} style={[styles.tabButton, activeTab == 'Upcoming' && styles.tabInactive]}>
          <Text style={styles.tabText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Previous')} style={[styles.tabButton, activeTab == 'Previous' && styles.tabInactive]}>
          <Text style={[styles.tabText]}>Previous</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setSelectedFilter('All')} style={[styles.filterButton, selectedFilter == 'All' && styles.ActiveFilterBtn]}>
          <Text style={[styles.filterText, selectedFilter == 'All' && styles.ActiveFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedFilter('Unread')} style={[styles.filterButton, selectedFilter == 'Unread' && styles.ActiveFilterBtn]}>
          <Text style={[styles.filterText, selectedFilter == 'Unread' && styles.ActiveFilterText]}>Unread</Text>
        </TouchableOpacity>
      </View>
      <SectionList
        sections={getFilteredData()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.white,
    paddingHorizontal: DimensionsConfig?.screenHeight * 0.02,
    paddingTop: DimensionsConfig?.screenHeight * 0.035,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F6EFF9',
    borderRadius: DimensionsConfig?.screenHeight * 0.015,
    padding: DimensionsConfig?.screenHeight * 0.008,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: DimensionsConfig?.screenHeight * 0.015,
    borderRadius: DimensionsConfig?.screenHeight * 0.015,
  },
  tabInactive: {
    backgroundColor: Colors?.white,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors?.black
  },
  inactiveText: {
    color: '#a0a0a0',
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  filterButton: {
    marginRight: 10,
    borderWidth: 1,
    padding: DimensionsConfig?.screenHeight * 0.008,
    paddingHorizontal: DimensionsConfig?.screenHeight * 0.01,
    borderRadius: DimensionsConfig?.screenHeight * 0.03,
    borderColor: '#DCDEE6'
  },
  ActiveFilterBtn: {
    marginRight: 10,
    borderWidth: 1,
    padding: DimensionsConfig?.screenHeight * 0.008,
    paddingHorizontal: DimensionsConfig?.screenHeight * 0.01,
    borderRadius: DimensionsConfig?.screenHeight * 0.03,
    borderColor: '#F6EFF9',
    backgroundColor: '#F6EFF9'
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B6F80',
  },
  ActiveFilterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8D10B5',
  },
  listContent: {
    paddingVertical: 16,
  },
  itemContainer: {
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
    fontWeight: '700',
    color: '#301E39',
    marginBottom: DimensionsConfig?.screenHeight * 0.01,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: DimensionsConfig?.screenHeight * 0.02,
    borderRadius: DimensionsConfig?.screenHeight * 0.01,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E7E7E7'
    
  },
  image: {
    width: DimensionsConfig?.screenHeight * 0.1,
    height: DimensionsConfig?.screenHeight * 0.1,
    borderRadius: DimensionsConfig?.screenHeight * 0.01,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#301E39',
  },
  service: {
    fontSize: 12,
    color: '#301E39',
    fontWeight: '400',
    marginVertical: 4,
  },
  time: {
    fontSize: 12,
    color: '#301E39',
    fontWeight: '400',
  },
  location: {
    fontSize: 12,
    color: '#301E39',
    fontWeight: '400',
  },
  unreadBadge: {
    backgroundColor: '#8D10B5',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: Colors?.primary,
    marginHorizontal: 7,
    textAlign: 'center'
  },
  serviceIcon: {
    width: DimensionsConfig.screenHeight * 0.02,
    height: DimensionsConfig.screenHeight * 0.02,
    marginRight: DimensionsConfig.screenHeight * 0.005,
    tintColor: '#9E98AC',
    resizeMode: 'contain'
  }
})