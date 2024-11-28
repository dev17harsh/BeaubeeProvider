import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, LayoutAnimation, UIManager, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DimensionsConfig } from '../theme/dimensions';
import { Colors } from '../theme/colors';
import { Images } from '../assets/images';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [state.index]);

    return (
        <View style={[styles.tabContainer, { paddingBottom: insets.bottom }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!event.defaultPrevented) {
                        // Trigger animation before navigating
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        navigation.navigate(route.name);
                    }
                };

                const iconSource =
                    label === 'Booking/Queue'
                        ? isFocused
                            ? Images?.BookingsActive
                            : Images?.Bookings
                        : label === 'Post'
                            ? isFocused
                                ? Images?.PostActive
                                : Images?.Post
                            : label === 'Chat'
                                ? isFocused
                                    ? Images?.ChatActive
                                    : Images?.Chat
                                : label === 'Profile'
                                    ? isFocused
                                        ? Images?.ProfileActive
                                        : Images?.Profile
                                    : null;

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={styles.tabItem}
                        activeOpacity={1}
                    >
                        <View style={isFocused ? styles.activeTab : styles.inactiveTab}>
                            <Image source={iconSource} style={styles.icon} />
                            {isFocused && <Text numberOfLines={1} style={styles.tabLabel}>{label}</Text>}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Colors?.primary,
        height: Platform.OS == 'ios' ? DimensionsConfig.screenHeight * 0.12 : DimensionsConfig.screenHeight * 0.095,
        justifyContent: 'space-around',
        borderTopLeftRadius: DimensionsConfig.screenHeight * 0.022,
        borderTopRightRadius: DimensionsConfig.screenHeight * 0.022,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        color: '#FFF',
        fontSize: 12,
        marginLeft: 5,
        textAlign: 'center',
    },
    icon: {
        height: DimensionsConfig?.screenHeight * 0.028,
        width: DimensionsConfig?.screenHeight * 0.028,
        resizeMode: 'contain',
    },
    activeTab: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors?.activeTabBackground,
        paddingHorizontal: DimensionsConfig?.screenHeight * 0.015,
        paddingVertical: DimensionsConfig?.screenHeight * 0.008,
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    inactiveTab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: DimensionsConfig?.screenHeight * 0.008,
    },
});

export default CustomTabBar;
