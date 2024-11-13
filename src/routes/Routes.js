import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookingsQueueScreen from '../screens/BookingsQueueScreen';
import PostScreen from '../screens/PostScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomTabBar from './CustomTabBar';
import AddProfilePictureScreen from '../screens/AddProfilePictureScreen';
import AddressMapScreen from '../screens/AddressMapScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddBusinessTimingScreen from '../screens/AddBusinessTimingScreen';
import AddServicesScreen from '../screens/AddServicesScreen';
import PaymentMethod from '../screens/PaymentMethod';
import AddCardDetails from '../screens/AddCard';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import UserChatScreen from '../screens/UserChatScreen';
import PostLook from '../screens/PostLook';
import BookingDetailScreen from '../screens/BookingDetailScreen';
import CloseShopEarly from '../screens/CloseShopEarly';
import BusinessProfile from '../screens/BusinessProfile';
import EditProfileBusiness from '../screens/EditProfileBusiness';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} />} // Use custom tab bar here
            screenOptions={{ headerShown: false }} // Hide default headers
        >
            <Tab.Screen name="Booking/Queue" component={BookingsQueueScreen} />
            <Tab.Screen name="Post" component={PostScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    animation: 'slide_from_right',
                    headerShown: false,
                }}>
                <Stack.Screen name="Splash" component={Splash} headerShown={false} />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    headerShown={false}
                />
                <Stack.Screen
                    name="Signup"
                    component={SignUpScreen}
                    headerShown={false}
                />
                <Stack.Screen
                    name="AddProfilePictureScreen"
                    component={AddProfilePictureScreen}
                    headerShown={false}
                />

                <Stack.Screen
                    name="AddressMapScreen"
                    component={AddressMapScreen}
                    headerShown={false}
                />

                <Stack.Screen
                    name="AddAddressScreen"
                    component={AddAddressScreen}
                    headerShown={false}
                />

                <Stack.Screen
                    name="AddBusinessTimingScreen"
                    component={AddBusinessTimingScreen}
                    headerShown={false}
                />

                <Stack.Screen
                    name="AddServicesScreen"
                    component={AddServicesScreen}
                    headerShown={false}
                />

                <Stack.Screen
                    name="PaymentMethod"
                    component={PaymentMethod}
                    headerShown={false}
                />
                <Stack.Screen name="AddCard" component={AddCardDetails} headerShown={false} />

                <Stack.Screen
                    name="OrderDetailScreen"
                    component={OrderDetailScreen}
                    headerShown={false}
                />

                <Stack.Screen
                    name="UserChatScreen"
                    component={UserChatScreen}
                    headerShown={false}
                />
                <Stack.Screen
                    name="PostLook"
                    component={PostLook}
                    headerShown={false}
                />

                <Stack.Screen
                    name="BookingDetailScreen"
                    component={BookingDetailScreen}
                    headerShown={false}
                />

                <Stack.Screen
                    name="CloseShopEarly"
                    component={CloseShopEarly}
                    headerShown={false}
                />
                <Stack.Screen
                    name="BusinessProfile"
                    component={BusinessProfile}
                    headerShown={false}
                />
                <Stack.Screen
                    name="EditProfileBusiness"
                    component={EditProfileBusiness}
                    headerShown={false}
                />

                <Stack.Screen
                    name="MainApp"
                    component={TabNavigator}
                    headerShown={false}
                />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
