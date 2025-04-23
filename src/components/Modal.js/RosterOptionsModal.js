import React, { useState } from 'react';
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
import { Colors } from '../../theme/colors';
import { DimensionsConfig } from '../../theme/dimensions';
import { Images } from '../../assets/images';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const RosterOptionsModal = ({ visible, onClose , onPressEdit , onPressRemove}) => {


    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <TouchableOpacity style={styles.modalOverlay} onPress={onClose} />
            <View style={styles.modalContent}>
                <TouchableOpacity
                    onPress={onClose}
                    hitSlop={100}
                    style={styles?.CloserView}
                />
                <Text style={styles.title}>Options</Text>

                <TouchableOpacity style={styles.option} onPress={() => onPressEdit()}>
                    <View style={{
                        padding: DimensionsConfig.screenHeight * 0.015,
                        backgroundColor: '#F6EFF9',
                        borderRadius: DimensionsConfig.screenHeight * 0.1,
                        marginLeft: DimensionsConfig.screenHeight * 0.015

                    }}>
                        <Image
                            resizeMode="contain"
                            style={[styles.EditIcon]}
                            source={Images.Edit}
                        />
                    </View>
                    <Text style={styles.optionText}>Edit Roster</Text>
                    <Image
                        resizeMode="contain"
                        style={[styles.EditIcon, { marginRight: DimensionsConfig.screenHeight * 0.015 }]}
                        source={Images.forwardIcon}
                    />

                </TouchableOpacity>
                <TouchableOpacity style={[styles.option, { marginVertical: DimensionsConfig.screenHeight * 0.015, }]} onPress={() => onPressRemove()}>
                    <View style={{
                        padding: DimensionsConfig.screenHeight * 0.015,
                        backgroundColor: '#FCE9E9',
                        borderRadius: DimensionsConfig.screenHeight * 0.1,
                        marginLeft: DimensionsConfig.screenHeight * 0.015,

                    }}>
                        <Image
                            resizeMode="contain"
                            style={[styles.EditIcon]}
                            source={Images.deleteButton}
                        />
                    </View>
                    <Text style={styles.optionText}>Remove Roster</Text>
                    <Image
                        resizeMode="contain"
                        style={[styles.EditIcon, { marginRight: DimensionsConfig.screenHeight * 0.015 }]}
                        source={Images.forwardIcon}
                    />

                </TouchableOpacity>

            </View>
        </Modal>
    );
};

export default RosterOptionsModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        // height: '30%',
        width: '100%',
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: DimensionsConfig.screenWidth * 0.04,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#301E39',
        marginBottom: 15,
        // textAlign: 'center',
    },

    CloserView: {
        height: DimensionsConfig?.screenHeight * 0.008,
        width: DimensionsConfig?.screenWidth * 0.14,
        borderRadius: 10,
        backgroundColor: '#9E98AC',
        alignSelf: 'center',
        marginBottom: 10,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: DimensionsConfig.screenHeight * 0.02,
        borderWidth: 1,
        borderColor: '#F6EFF9',
        borderRadius: DimensionsConfig.screenHeight * 0.02
    },
    optionText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 10,
        color: '#301E39'
    },
    EditIcon: {
        width: (mobileW * 4.2) / 100,
        height: (mobileW * 4.2) / 100,
    },
});
