import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Button from './Button';

const whiteColor = '#fff';
const primaryColor = 'green';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class Form extends Component {

    state = {
        showPassword: true,
    };

    render(){

        const { Form__Heading, Form__Content } = this.props;

        return(
                <View>

                    <Text style={styles.heading}>{Form__Heading}</Text>

                    {
                        Form__Content
                    }

                </View>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: screenHeight * 0.05, alignSelf: 'center'
    },
});

export default Form;