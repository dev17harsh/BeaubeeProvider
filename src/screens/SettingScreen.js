import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    Dimensions,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Images } from '../assets/images';
import CustomSwitch from '../components/CustomSwitch';
// import MapView, { Circle } from 'react-native-maps';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const SettingScreen = ({navigation}) => {
    const [radius, setRadius] = useState(1.5); // Radius in km
    const [appNotifications, setAppNotifications] = useState({
        Messages: false,
        UpcomingAppointments: true,
        Cancellations: true,
    });
    const [smsNotifications, setSmsNotifications] = useState({
        Messages: false,
        UpcomingAppointments: true,
        Cancellations: true,
    });

    const toggleAppNotification = (key) => {
        setAppNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleSmsNotification = (key) => {
        setSmsNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images?.CrossIcon} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Setting</Text>
                <TouchableOpacity>
                <Image style={styles.backIcon} />
                </TouchableOpacity>
            </View>
            {/* Map Section */}
            <View style={styles.mapContainer}>
                {/* <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.7749,
            longitude: -122.4194,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Circle
            center={{ latitude: 37.7749, longitude: -122.4194 }}
            radius={radius * 1000} // Convert to meters
            strokeColor="rgba(128,0,128,0.5)"
            fillColor="rgba(128,0,128,0.2)"
          />
        </MapView> */}
                <View style={styles.sliderContainer}>
                    <Image source={Images?.SettingMap} style={{
                        height: (mobileH * 20) / 100,
                        width: (mobileW * 84) / 100,
                        resizeMode: 'contain'
                    }}/>
                    <Text style={styles.radiusText}>Radius for at-home service</Text>
                    <View style={{
                        flexDirection: 'row' , 
                        alignItems: 'center',
                        marginTop: 2,
                    }}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0.5}
                        maximumValue={10}
                        step={0.1}
                        value={radius}
                        onValueChange={(value) => setRadius(value)}
                        minimumTrackTintColor="#800080"
                        thumbTintColor="#800080"
                    />
                    <View style={{
                        borderWidth: 1,
                        borderColor: '#E6E8F1',
                        padding: 5,
                        borderRadius: 50
                    }}>

                    <Text style={styles.radiusValue}>{radius.toFixed(1)} km</Text>
                    </View>
                    </View>
                </View>
            </View>

            {/* Notifications Section */}
            <View style={styles.notificationsContainer}>
                <Text style={[styles.sectionTitle , {marginTop: 10}]}>App Notifications</Text>
                {Object.keys(appNotifications).map((key) => (
                    <View key={key} style={styles.switchRow}>
                        <Text style={styles.switchLabel}>{key.replace(/([A-Z])/g, ' $1')}</Text>
                        <CustomSwitch isEnabled={appNotifications[key]} toggleSwitch={() => toggleAppNotification(key)}  />
                    </View>
                ))}

                <Text style={[styles.sectionTitle , {marginTop: 10}]}>SMS Notifications</Text>
                {Object.keys(smsNotifications).map((key) => (
                    <View key={key} style={styles.switchRow}>
                        <Text style={styles.switchLabel}>{key.replace(/([A-Z])/g, ' $1')}</Text>
                        <CustomSwitch isEnabled={smsNotifications[key]} toggleSwitch={() => toggleSmsNotification(key)}  />
                    </View>
                ))}
            </View>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mapContainer: {
        // flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: 200,
    },
    sliderContainer: {
        // position: 'absolute',
        // bottom: 10,
        // left: 20,
        // right: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        width: (mobileW * 90) / 100,
        elevation: 5,
    },
    radiusText: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
        color: '#0D0E11'
    },
    slider: {
        width: '80%',
        left: -(mobileW * 2) / 100,
    },
    radiusValue: {
        // textAlign: 'center',
        // marginTop: 10,
        fontSize: 14,
        fontWeight: '600',
        color: '#301E39',
    },
    notificationsContainer: {
        flex: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
        color: '#301E39',
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    switchLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#301E39',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: (mobileW * 5) / 100,
        paddingVertical: (mobileW * 6) / 100,
      },
    headerBackIconView: {
        backgroundColor: '#FFFFFF',
        width: (mobileW * 10) / 100,
        height: (mobileW * 10) / 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: (mobileH * 5) / 100,
      },
      backIcon: {
        width: (mobileW * 4) / 100,
        height: (mobileW * 4) / 100,
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        color: '#000',
      },
});

export default SettingScreen;
