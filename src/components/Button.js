import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
 
class Button extends Component {

    handlePress (data) {
        alert(data);
    }

    render()
    {
        const { Button__BackgroundColor, Button__Label, Button__TextColor, Button__onPress } = this.props;

        const styles = StyleSheet.create({
            button: {
                alignItems: 'center', justifyContent: 'center', backgroundColor: Button__BackgroundColor, padding: screenHeight * 0.02
            },
            text: {
                color: Button__TextColor, 
            }
        });

        return(
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.handlePress(Button__onPress)}
            >
                <Text style={styles.text}>{Button__Label}</Text>
            </TouchableOpacity>
        );
    }
}



export default Button;