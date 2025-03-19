import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Images } from '../assets/images';
import { Colors } from '../theme/colors';
import AppHeader from '../components/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { GetNotificationAction } from '../redux/action/GetNotificationAction';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
// Dummy Data for notifications
// const notifications = [
//   {
//     id: '1',
//     title: 'Fresh Cuts Straight hair',
//     // time: 'Today at 13:10',
//     timestamp: '1hr ago',
//     icon: Images?.chatWithBack,
//   },
//   {
//     id: '2',
//     title: 'Fresh Cuts sent you a message',
//     timestamp: '3hrs ago',
//     icon: Images?.crossWithBack,
//   },
//   {
//     id: '3',
//     title: 'Fresh Cuts cancelled your appointment',
//     timestamp: '6hrs ago',
//     icon: Images?.timeBack,
//   },
//   {
//     id: '4',
//     title: 'Fresh Cuts added a new service',
//     timestamp: '1d ago',
//     icon: Images?.crossWithBack,
//   },
//   {
//     id: '5',
//     title: 'Fresh Cuts IS ON SALE NOW!',
//     timestamp: '1d ago',
//     icon:Images?.chatWithBack,
//   },
//   {
//     id: '6',
//     title: 'Appointment at fresh cuts is now available to book 12.10 5pm',
//     timestamp: '1d ago',
//     icon: Images?.chatWithBack,
//   }
// ];

const Notification = ({ navigation }) => {
  const dispatch = useDispatch();
  const NotificationData = useSelector((state) => state.getNotificationData);

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    dispatch(GetNotificationAction())
  }, [])

  useEffect(() => {
    console.log('NotificationData?.respons', NotificationData?.response)
    if (Array.isArray(NotificationData?.response?.result)) {
      setNotifications(NotificationData?.response?.result)
    }
  }, [NotificationData])


  const timeAgo = (dateString) => {
    const now = new Date();
    const givenDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - givenDate) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInWeek = 7 * secondsInDay;
    const secondsInMonth = 30 * secondsInDay; // Approximate
    const secondsInYear = 365 * secondsInDay; // Approximate

    if (diffInSeconds < secondsInMinute) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < secondsInHour) {
      return `${Math.floor(diffInSeconds / secondsInMinute)} minutes ago`;
    } else if (diffInSeconds < secondsInDay) {
      return `${Math.floor(diffInSeconds / secondsInHour)} hours ago`;
    } else if (diffInSeconds < secondsInWeek) {
      return `${Math.floor(diffInSeconds / secondsInDay)} days ago`;
    } else if (diffInSeconds < secondsInMonth) {
      return `${Math.floor(diffInSeconds / secondsInWeek)} weeks ago`;
    } else if (diffInSeconds < secondsInYear) {
      return `${Math.floor(diffInSeconds / secondsInMonth)} months ago`;
    } else {
      return `${Math.floor(diffInSeconds / secondsInYear)} years ago`;
    }
  }

  // Render each notification item
  const renderNotificationItem = ({ item }) => (
    // <TouchableOpacity
    //   activeOpacity={0.8}
    //   style={styles.notificationItem}>
    //   {/* <View style={styles?.timestampView}> */}
    //     <Image source={item.icon} style={styles.icon} />
    //   {/* </View> */}
    //   <View style={styles.textContainer}>
    //     <View style={{flexDirection: 'row' , justifyContent: 'space-between'}}>
    //     <Text style={styles.title}>{item.title}</Text>
    //   {item.time && <Text style={styles.time}>{item.time}</Text>}
    //     </View>
    //     <Text style={styles.timestamp}>{item.timestamp}</Text>
    //   </View>
    // </TouchableOpacity>

    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.notificationItem}>
      <View style={[styles?.timestampView, item?.type == 'tag' && { backgroundColor: '#F07C2E' }, item?.type == 'cross' && { backgroundColor: '#FCE9E9' }]}>
        <Image source={item?.notification_type == "Cancel Appointment" ? Images?.Cross : item?.notification_type == "Appointment" ? Images?.timeBack : Images?.TimeSquare} style={[styles.icon, item?.type == 'tag' && { tintColor: Colors?.white }, item?.notification_type == "Cancel Appointment" && { tintColor: '#FE5F7C' }]} />
      </View>
      <View style={styles.textContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{item.title}</Text>
          {/* {item.created_at && <Text style={styles.time}>{getTimeValue(item.created_at)}</Text>} */}
        </View>
        <Text style={styles.timestamp}>{timeAgo(item.created_at)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <AppHeader
          title={'Notifications'}
        />

        {/* Notification List BackIcon*/}
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>

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
    paddingVertical: 15,
    marginBottom: 10,
    width: mobileW * 92 / 100,
    alignSelf: 'center',
    borderBottomColor: Colors?.borderColor,
    borderBottomWidth: mobileW * 0.3 / 100,
  },
  icon: {
    width: mobileW * 10 / 100,
    height: mobileW * 10 / 100,
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
    fontSize: 14,
    color: Colors?.black,
    marginBottom: 5,
    fontWeight: '600'
  },
  timestamp: {
    fontSize: 12,
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



