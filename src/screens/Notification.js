import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Images } from '../assets/images';
import { Colors } from '../theme/colors';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
// Dummy Data for notifications
const notifications = [
  {
    id: '1',
    title: 'Fresh Cuts Straight hair',
    // time: 'Today at 13:10',
    timestamp: '1hr ago',
    icon: Images?.TimeSquare,
  },
  {
    id: '2',
    title: 'Fresh Cuts sent you a message',
    timestamp: '3hrs ago',
    icon: Images?.TimeSquare,
  },
  {
    id: '3',
    title: 'Fresh Cuts cancelled your appointment',
    timestamp: '6hrs ago',
    icon: Images?.TimeSquare,
  },
  {
    id: '4',
    title: 'Fresh Cuts added a new service',
    timestamp: '1d ago',
    icon: Images?.TimeSquare,
  },
  {
    id: '5',
    title: 'Fresh Cuts IS ON SALE NOW!',
    timestamp: '1d ago',
    icon:Images?.TimeSquare,
  },
  {
    id: '6',
    title: 'Appointment at fresh cuts is now available to book 12.10 5pm',
    timestamp: '1d ago',
    icon: Images?.TimeSquare,
  }
];

const Notification = ({navigation}) => {

  // Render each notification item
  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.notificationItem}>
      <View style={styles?.timestampView}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <View style={{flexDirection: 'row' , justifyContent: 'space-between'}}>
        <Text style={styles.title}>{item.title}</Text>
      {item.time && <Text style={styles.time}>{item.time}</Text>}
        </View>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Image source={Images?.BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Image style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      {/* Notification List BackIcon*/}
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mobileW * 5 / 100,
    backgroundColor: Colors?.white,
    paddingVertical: mobileW * 8 / 100,
    borderBottomColor: Colors?.borderColor,
    borderBottomWidth: mobileW * 0.5 / 100
  },
  backButton: {
    fontSize: 18,
    color: Colors?.black
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: Colors?.black
  },
  listContent: {
    paddingBottom: 20,
    marginTop: mobileH * 2 / 100
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors?.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: mobileW * 94 / 100,
    alignSelf: 'center',
    borderBottomColor: Colors?.borderColor,
    borderBottomWidth: mobileW * 0.3 / 100
  },
  icon: {
    width: mobileW * 4.8 / 100,
    height: mobileW * 4.8 / 100,
  },
  backIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
  },
  textContainer: {
    flex: 1,
    left: 10
  },
  title: {
    fontSize: 16,
    color: Colors?.black,
    marginBottom: 5,
    fontWeight: '500'
  },
  timestamp: {
    fontSize: mobileW * 3.5 / 100,
    color: Colors?.darkGrey,
    fontWeight: '400'
  },
  time: {
    fontSize: mobileW * 3 / 100,
    color: '#8D10B5',
    backgroundColor: Colors?.purpleLite,
    padding: 5,
    borderRadius: mobileW * 4 / 100,
    paddingHorizontal: mobileW * 4 / 100,
    marginLeft: 10
  },
  timestampView: {
    backgroundColor: "#F5F0FF",
    borderRadius: mobileW * 5.5 / 100,
    width: mobileW * 11 / 100, height: mobileW * 11 / 100,
    alignItems: 'center', justifyContent: 'center'
  }
});

export default Notification;


