import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Pdf from 'react-native-pdf';

import PDFView from 'react-native-view-pdf';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';


const resources = {
    file: Platform.OS === 'ios' ? 'test-pdf.pdf' : '/sdcard/Download/test-pdf.pdf',
    url: 'https://www.ets.org/Media/Tests/TOEFL/pdf/SampleQuestions.pdf',
    base64: 'JVBERi0xLjMKJcfs...',
};


class Testing extends Component {

  static navigationOptions = {
    header: null,
  }

  state = {
      loading: false,
  }

  componentDidMount()
  {
    console.log(this.props.navigation.state.params.uri ? this.props.navigation.state.params.uri : 'nothing');

  }

  render() {

      const source = {
          uri: 'data:application/pdf;base64,'+ this.props.navigation.state.params.uri
      };

      const resourceType = 'base64';

    //   const source = {uri:'http://www.africau.edu/images/default/sample.pdf',cache:true};

      return (
          <View style={{ flex: 1 }}>

                <View style={styles.header}>

                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <MaterialIcon name='arrow-back' size={24} color={whiteColor} />
                    </TouchableOpacity>

                    <View style={{ width: '80%' }}>
                        <Text style={styles.headerText}>History Report</Text>
                    </View>

                </View>

                <Pdf
                    style={{ flex: 1, width: screenWidth, height: screenHeight }}
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages} ${filePath}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={error => {
                        console.log(error);
                    }}
                />

                {/* <PDFView
                    fadeInDuration={250.0}
                    style={{ flex: 1 }}
                    resource={source}
                    resourceType={'base64'}
                    onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                    onError={(error) => console.log('Cannot render PDF', error)}
                /> */}

          </View>
      );
  }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: primaryColor, padding: screenHeight * 0.02, flexDirection: 'row', alignItems: 'center', height: screenHeight * 0.09,
        justifyContent: 'space-between',
    },
    headerText: {
        color: whiteColor, fontSize: screenHeight * 0.03
    },
    waitingText: {
        color: primaryColor
    },
    loadingContainer: {
        alignItems: 'center', justifyContent: 'center', height: screenHeight
    }
});

export default Testing;