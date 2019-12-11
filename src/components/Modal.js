import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';

import DateTimePicker from '@react-native-community/datetimepicker';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';

class Modal extends Component {

    state = {
        visible: true,
        date: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        mode: 'date',
        showStart: false,
        showEnd: false,
        checkStart: false,
        checkEnd: false,
    }

    static navigationOptions = {
        drawerLabel: () => null,
    }

    setStartDate = (event, date) => {
        date = date || this.state.startDate;

        this.setState({
            showStart: Platform.OS === 'ios' ? true : false,
            startDate: date,
        });
        if(this.state.checkStart == false){
            this.startTimepicker();
                this.setState({
                    checkStart: true,
            });
        }
    }

    setEndDate = (event, date) => {
        date = date || this.state.endDate;

        this.setState({
            showEnd: Platform.OS === 'ios' ? true : false,
            endDate: date,        
        });
        if(this.state.checkEnd == false){
            this.endTimePicker();
                this.setState({
                    checkEnd: true,
            });
        }
    }

    showStart = mode => {
        this.setState({
            showStart: true,
            mode,
        });
    }
    
    showEnd = mode => {
        this.setState({
            showEnd: true,
            mode,
        });
    }

    startDatePicker = () => {
        this.showStart('date');
        this.setState({ checkStart: false });
    }

    startTimepicker = () => {
        this.showStart('time');
    }

    endDatePicker = () => {
        this.showEnd('date');
        this.setState({ checkEnd: false });
    }

    endTimePicker = () => {
        this.showEnd('time');
    }

    render()
    {
        const { showStart, showEnd, startDate, endDate, mode } = this.state;

        return(
                <Dialog
                    visible={this.state.visible}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                >
                    <DialogContent>
                        <View style={{ width: screenWidth * 0.82, paddingTop: screenHeight * 0.02 }}>
                            <View>
                                <Text style={styles.modalHeading}>History Replay</Text>
                            </View>

                            <View style={styles.modalItem}>
                                <Text>VRN</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: screenHeight * 0.02 }}>
                                    <MaterialIcon name='directions-car' size={26} color={grayColor} />
                                    <Text>KMJ-2959</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.modalItem}
                                onPress={this.startDatePicker}
                            >
                                <Text>Start Time</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: screenHeight * 0.02 }}>
                                    <Image source={require('../assets/starttimeldpi.png')} style={styles.modalImage} />
                                    <Text>{this.state.startDate.toISOString().slice(0, 10) + ' ' + this.state.startDate.toLocaleTimeString('it-IT')}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalItem}
                                onPress={this.endDatePicker}
                            >
                                <Text>End Time</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: screenHeight * 0.02 }}>
                                    <Image source={require('../assets/endtimeldpi.png')} style={styles.modalImage} />
                                    <Text>{this.state.endDate.toISOString().slice(0, 10) + ' ' + this.state.endDate.toLocaleTimeString('it-IT')}</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={styles.modalBottom}>

                                <TouchableOpacity style={styles.button}
                                    onPress={() => {this.setState({ visible: false });}}
                                >
                                    <Text>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.button, { backgroundColor: primaryColor }]}>
                                    <Text style={{ color: whiteColor }}>Replay</Text>
                                </TouchableOpacity>

                            </View>

                            { showStart && <DateTimePicker value={startDate}
                                        mode={mode}
                                        display="default"
                                        onChange={this.setStartDate} />
                            }

                            { showEnd && <DateTimePicker value={endDate}
                                        mode={mode}
                                        display="default"
                                        onChange={this.setEndDate} />
                            }

                        </View>
                    </DialogContent>
                </Dialog>
        );
    }
}

const styles = StyleSheet.create({
    modalHeading: {
        fontSize: screenHeight * 0.03, alignSelf: 'center'
    },
    modalItem: {
        borderBottomWidth: 1, borderColor: primaryColor, margin: screenHeight * 0.01
    },
    modalImage: {
        height: screenHeight * 0.035, width: screenHeight * 0.035, tintColor: grayColor
    },
    modalBottom: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: screenHeight * 0.01,
    },
    button: {
        backgroundColor: whiteColor, elevation: 4, width: '40%', alignItems: 'center', justifyContent: 'center', 
        paddingVertical: screenHeight * 0.015, marginHorizontal: screenHeight * 0.01,
    }
});

export default Modal;