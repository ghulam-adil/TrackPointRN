import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator, TextInput, ToastAndroid } 
          from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import CheckBox from 'react-native-check-box';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import DateTimePicker from '@react-native-community/datetimepicker';

var moment = require('moment');

import { variables } from './variables';
import { ScrollView } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';

class Grid extends Component {

  state = {
    isChecked: false,
    visible: false,
    visible1: false,
    visible2: false,
    visible3: false,
    date: new Date(),
    startDate: '',
    endDate: '',
    mode: 'date',
    showStart: false,
    showEnd: false,
    checkStart: false,
    checkEnd: false,
    currentItem: '',
    data: [],
    selectedData: [],
    vehicleIdsString: '',
    token: '',
    loading: true,
    counts: 0,
    showPassword: true,
    name: '',
    password: '',
    modalLoading: false,
  }

  static navigationOptions = {
    drawerLabel: () => null,
  }

  componentDidMount () {

    AsyncStorage.getItem('data').then(value => {
      var getter = (JSON.parse(value));
      
      fetch(variables.ip + 'GETALLVRNSANDDATA', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  vehicleids: getter.vehicleIdsString,
                  token: getter.token
              }),
          }
      )
      .then(response => response.json())
      .then(responseJson => {
          console.log(JSON.parse(responseJson.d));
          var data = JSON.parse(responseJson.d);
          data.forEach(function (element) {
            element.isChecked = false;
          });
          this.setState({ data: data, loading: false, token: getter.token });
          // console.log('this is data ' + JSON.parse(this.state.data));
      })
      .catch(error => {
          console.log(error);
      })

    })

  }

  handleStatus(item){
    const { vehiclestatus } = item;
    if(vehiclestatus == 'Parked')
    {
      return <Image style={styles.imageStyle} source={require('../assets/parked.png')} />
    }
    else if(vehiclestatus == 'Moving')
    {
      return <Image style={styles.imageStyle} source={require('../assets/moving.png')} />
    }
    else
    {
      return <Image style={styles.imageStyle} source={require('../assets/idle.png')} />
    }
  }

    setStartDate = (event, date) => {
      console.log('start date:');
      console.log(date);
        // date = date || this.state.startDate;

        this.setState({
            showStart: Platform.OS === 'ios' ? true : false,
            startDate: date,
        });
        // if(this.state.checkStart == false){
        //     this.startTimepicker();
        //         this.setState({
        //             checkStart: true,
        //     });
        // }
    }

    setEndDate = (event, date) => {
        // date = date || this.state.endDate;
        console.log('end date');
        console.log(date);

        this.setState({
            showEnd: Platform.OS === 'ios' ? true : false,
            endDate: date,        
        });
        // if(this.state.checkEnd == false){
        //     this.endTimePicker();
        //         this.setState({
        //             checkEnd: true,
        //     });
        // }
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

    checkAll = () => {

      var data = [...this.state.data];
      var selectedData = [...this.state.selectedData];
      data.map((value, index) => {
        value.isChecked = !value.isChecked;
      })

      if(this.state.isChecked)
      {
        console.log('this is true');
        this.setState({ data, selectedData: [], isChecked: !this.state.isChecked, counts: 0, });
        console.log('Now this is selected data ' +this.state.selectedData);
      }
      else
      {
        console.log('this is false');
        this.setState({ data, selectedData: data, isChecked: !this.state.isChecked, counts: this.state.data.length, });
        console.log('Now this is selected data ' +data);
      }
      
    }

    handleCheckBox (index, item) {
      var data = [...this.state.data];
      var selectedData = [...this.state.selectedData];
      
      if(item.isChecked){
        console.log("check false");
        data[index].isChecked = false;

        console.log(item);

        var index = selectedData.indexOf(item);
        if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
          selectedData.splice(index, 1);
        }
        
        console.log('this is selected data');
        console.log(selectedData);

        this.setState({ 
          data,
          selectedData,
          counts: --this.state.counts ,
        });
      }
      else if(!item.isChecked){
        console.log("check true");
        selectedData.push(item);

        console.log(item);

        console.log('this is selected data');
        console.log(selectedData);

        data[index].isChecked = true;
        this.setState({ 
          data,
          selectedData,
          counts: ++this.state.counts,
        });
      }
    
      console.log(this.state.counts);
    }

    handlePress = (item, index) => {

      var screen = this.props.Grid__screen;
      
      if(screen == 'HistoryReplay')
      {
        this.setState({ 
          visible: !this.state.visible,
          currentItem: item
        });
      }
      else if(screen == 'CodeRed')
      {
        this.setState({ 
          visible1: !this.state.visible1,
          // currentItem: item
        });
      }
      else if(screen == 'TripDetails')
      {
        this.props.Grid__onPress ? this.props.Grid__onPress(item) : null
      }
      else if(screen == 'AlertManagement')
      {
        this.setState({ 
          visible: false,
        });
        this.props.Grid__onPress(index)
      }
      else if(screen == 'HistoryReport')
      {
        console.log('from history report');
        this.setState({ loading: true });

        AsyncStorage.getItem('data').then(value => {
          var getter = (JSON.parse(value));

          console.log('all' +' '+ item.VehicleRegistrationNumber +' '+ getter.gId +' '+ getter.gName +' '+ getter.token);

          fetch(variables.ip +'Get24hHistoryMovmentData', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      status: 'all',
                      VRN: item.VehicleRegistrationNumber.toString(),
                      GroupId: getter.gId.toString(),
                      groupname: getter.gName.toString(),
                      token: getter.token.toString(),
                    }),
                }
            )
            .then(response => response.json())
            .then(responseJson => {
                
              console.log(JSON.parse(responseJson.d).report);
              this.setState({ loading: false });
              this.props.Grid__onPress(JSON.parse(responseJson.d).report);

            })
            .catch(error => {
                console.log(error);
            })
    
        })

      }

    }

    handleLocation = () => {
      this.props.Grid__onPress(this.state.selectedData);
      console.log('this is grid');
      console.log(this.state.selectedData);
    }

    handleReplay = () => {
      this.setState({ loading: true, visible: false });

      // console.log(JSON.stringify(this.state.currentItem) +' '+ this.state.startDate.toISOString().toString() +' '+ this.state.endDate.toISOString().toString());
      // console.log(JSON.stringify(this.state.currentItem.vehicleid));
      console.log(this.state.currentItem.vehicleid);
      console.log(this.state.startDate.toISOString().replace('T', ' ').split('.')[0]);
      console.log(this.state.endDate.toISOString().replace('T', ' ').split('.')[0]);
      // '2019-11-1 14:38:50'
      // '2019-11-5 15:54:15'
      
      AsyncStorage.getItem('data').then(value => {
        var getter = (JSON.parse(value));

            fetch(variables.ip +'GETHISTORYDATA', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              VEHICLEID: this.state.currentItem.vehicleid,
              start: this.state.startDate.toISOString().replace('T', ' ').split('.')[0],
              end: this.state.endDate.toISOString().replace('T', ' ').split('.')[0],
              token: getter.token,
            }),

          }
        )
        .then(response => response.json())
        .then(responseJson => {
          
          coordinates = [];
          JSON.parse(responseJson.d).map(value => {
            console.log(value.Latitude +' '+ value.Longitude);
            
            coordinates.push({
              latitude: value.Latitude,
              longitude: value.Longitude
            })
          })
          console.log(coordinates.length);
          console.log(responseJson.d);
          this.setState({ loading: false, startDate: '', endDate: '' });
          // this.props.navigation.navigate('historyLocation');
          this.props.Grid__onPress(JSON.parse(responseJson.d), coordinates);
        })
        .catch(error => {
          console.log('error');
          console.log(error);
        })

      })
     
    }

    handleLogin = () => {

      const { name, password } = this.state;

      console.log(name);
      console.log(password);

      if(name == '' || password == '')
      {
          ToastAndroid.showWithGravity(
              'Please Fill All Fields!',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
          );
      }
      else
      {
        this.setState({ modalLoading: true });
        fetch(variables.ip +'LOGINVERIFY', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: name,
                    password: password,
                    datetime: '23-10-19',
                    imei: '867796037481707',
                }),
            }
        )
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson.d);
            console.log(JSON.parse(responseJson.d).status);
            
            if(JSON.parse(responseJson.d).status == 'unsuccessful')
            {
              this.setState({ modalLoading: false });
              ToastAndroid.showWithGravity(
                'Please Enter Correct Credentials!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }
            else
            {
              this.setState({ modalLoading: false, visible2: true, visible1: false });
            }
            
        })
        .catch(error => {
            console.log(error);
            this.setState({ modalLoading: false })
        })

      }

    }

    handleCodeRed = () => {

      const { name, password, token } = this.state;

      fetch(variables.ip + 'CodeRedAuthentication', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: name,
            password: password,
            token: token,
          })

        }
      )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ visible3: false });
        ToastAndroid.showWithGravity(
          'Your vehicle is successfully marked code red',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      })
      .catch(error => {
        console.log(error);
      })

    }

  render(){

    console.log(this.props.searchValue);

    const filteredData = this.state.data.filter(value => {
      return value.VehicleRegistrationNumber.toLowerCase().includes(this.props.searchValue.toLowerCase());
    });

    const { showStart, showEnd, startDate, endDate, mode } = this.state;

    return(

      <View style={{ flex: 1 }}>

        {
          this.props.Grid__Header ? 

          <View style={styles.gridHeader}>

            {
              this.props.isCheckBox && 
                <CheckBox
                  checkBoxColor={whiteColor}
                  checkedCheckBoxColor={whiteColor}
                  onClick={ this.checkAll }
                  isChecked={this.state.isChecked}
                />
            }
            
            {
              this.props.isVrn && 

              <View>
                <MaterialIcon name='directions-car' size={24} color={whiteColor} />
              </View>

            }

            {
              this.props.isAlertType &&

              <View>
                  <Text style={{ color: whiteColor }}>Alert Type</Text>
              </View>
            }

            {
              this.props.isSpeed && 

              <View>
                <Image style={styles.imageStyle} source={require('../assets/Speedldpi.png')} />
              </View>
              
            }

            {
              this.props.isTime && 

              <View>
                <MaterialIcon name='access-time' size={24} color={whiteColor} />
              </View>

            }

            {
              this.props.isIgnition && 

              <View>
                <Image style={styles.imageStyle} source={require('../assets/Ignitionldpi.png')} />
              </View>

            }

            {
              this.props.isStatus && 

              <View>
                <MaterialIcon name='donut-large' size={24} color={whiteColor} />
              </View>

            }
            
          </View>
          :
          null

        }

        {
          this.state.loading ? 
                    
              <View style={styles.loadingContainer}>
                  <ActivityIndicator size='large' color={primaryColor} />
                  <Text style={styles.waitingText}>Please Wait...</Text>
              </View>

              :

                <View style={{ flex: 1 }}>

                  <FlatList 
                    data={filteredData}
                    renderItem={({ item, index }) => {

                    return(

                      <TouchableOpacity style={styles.itemStyle}
                        onPress={() => { this.handlePress(item, index) }}
                      >
                        
                        {
                          this.props.isCheckBox && 
                            <CheckBox
                              checkBoxColor={grayColor}
                              checkedCheckBoxColor={primaryColor}
                              isChecked={item.isChecked}
                              onClick={ () => { this.handleCheckBox(index, item) }}                             
                            />
                        }
                        
                        {
                          this.props.isVrn && 
                          <View>
                              <Text>{item.VehicleRegistrationNumber}</Text>
                          </View>
                        }

                        {
                          this.props.isAlertType &&
                          <View>
                              <Text>{'item.alertType'}</Text>
                          </View>
                        }

                        {
                          this.props.isSpeed && 
                          <View>
                              <Text>{item.speed}</Text>
                          </View>
                        }

                        {
                          this.props.isTime &&
                          <View style={{ width: '20%', }}>
                              <Text style={{ alignSelf: 'center' }}>{moment(item.ReceiveDateTime).fromNow().split('ago')}</Text>
                          </View>
                        }

                        {
                          this.props.isIgnition &&

                          <View>

                            {
                              item.ignitionstatus == true ?

                              <Image style={styles.imageStyle} source={require('../assets/status_ignition_on.png')} />

                              :

                              <Image style={styles.imageStyle} source={require('../assets/status_ignition_off.png')} />

                            }
                              
                          </View>
                        }

                        {
                          this.props.isStatus &&

                          <View>
                            {
                              
                              this.handleStatus(item)
                              
                            }
                              
                          </View>
                        }
                        
                      </TouchableOpacity>
                    );

                  }
                }
              keyExtractor={item => item.VehicleRegistrationNumber}
            />

            {

              this.state.counts > 0

              ?

              <TouchableOpacity
                  style={styles.locationButton}
                  onPress={this.handleLocation}
              >
                  <MaterialIcon name='my-location' size={24} color={whiteColor} />
              </TouchableOpacity>

              :

              null

            }

            </View>

        }

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
                            <Text>{this.state.currentItem ? this.state.currentItem.VehicleRegistrationNumber : ''}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.modalItem}
                        onPress={this.startDatePicker}
                    >
                        <Text>Start Time</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: screenHeight * 0.02 }}>
                            <Image source={require('../assets/starttimeldpi.png')} style={styles.modalImage} />
                            <Text>

                            {
                              this.state.startDate == '' ?

                              ''

                              :

                              this.state.startDate.toISOString().slice(0, 10) + ' ' + this.state.startDate.toLocaleTimeString('it-IT')

                            }
                              
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalItem}
                        onPress={this.endDatePicker}
                    >
                        <Text>End Time</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: screenHeight * 0.02 }}>
                            <Image source={require('../assets/endtimeldpi.png')} style={styles.modalImage} />
                            <Text>
                            {
                              this.state.endDate == '' ?

                              ''

                              :

                              this.state.endDate.toISOString().slice(0, 10) + ' ' + this.state.endDate.toLocaleTimeString('it-IT')

                            }
                            
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.modalBottom}>

                        <TouchableOpacity style={styles.button}
                            onPress={() => this.setState({ visible: false }) }
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, { backgroundColor: primaryColor }]}
                          onPress={this.handleReplay}
                        >
                            <Text style={{ color: whiteColor }}>Replay</Text>
                        </TouchableOpacity>

                    </View>

                    { showStart && <DateTimePicker value={startDate == '' ? new Date() : startDate}
                                mode={mode}
                                display="default"
                                onChange={this.setStartDate} />
                    }

                    { showEnd && <DateTimePicker value={endDate == '' ? new Date() : endDate}
                                mode={mode}
                                display="default"
                                onChange={this.setEndDate} />
                    }

                </View>
            </DialogContent>
        </Dialog>

        <Dialog
            visible={this.state.visible1}
            dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
            })}
            onTouchOutside={() => {
                this.setState({ visible1: false });
            }}
        >
            <DialogContent>
                <View style={{ width: screenWidth * 0.74, paddingTop: screenHeight * 0.02 }}>

                  {
                    this.state.modalLoading ? 

                    <View style={{ height: screenHeight * 0.3, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size='large' color={primaryColor} />
                        <Text style={styles.waitingText}>Please Wait...</Text>
                    </View>

                    :

                    <View>

                      <View style={styles.logoContainer}>
                        
                        <Image source={require('../assets/logo.gif')} style={{ height: '76%', width: '76%' }} />

                      </View>

                      <View>
                          
                          <View style={styles.textBox}>

                            <MaterialIcon name='person-outline' size={24} style={styles.icon} />
                            <TextInput 
                                placeholder='Username Here'
                                style={styles.textInput}
                                onChangeText={(name) => { this.setState({ name }) }}
                                value={this.state.name}
                            />

                          </View>

                          <View style={styles.textBox}>

                            <MaterialIcon name='lock-outline' size={24} style={styles.icon} />
                            <TextInput 
                                placeholder='Password Here'
                                secureTextEntry={this.state.showPassword}
                                style={[ styles.textInput, { width: '80%' } ]}
                                onChangeText={(password) => { this.setState({ password }) }}
                                value={this.state.password}
                            />

                            <TouchableOpacity
                                onPress={() => { this.setState({ showPassword: !this.state.showPassword }) }}
                            >
                                <FontAwesome5 style={styles.icon} name={this.state.showPassword ? 'eye-slash' : 'eye'} size={20} />
                            </TouchableOpacity>

                          </View>

                          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginVertical: screenHeight * 0.01 }}>

                            <TouchableOpacity style={styles.buttonLogin}
                                onPress={ () => this.setState({ visible1: false }) }
                            >
                                <MaterialIcon name='clear' size={screenHeight * 0.04} color={whiteColor} />
                            </TouchableOpacity>
                        
                            <TouchableOpacity style={styles.buttonLogin}
                                onPress={() => this.handleLogin()}
                            >
                                <MaterialIcon name='keyboard-arrow-right' size={screenHeight * 0.05} color={whiteColor} />
                            </TouchableOpacity>

                          </View>
                          
                      </View>

                    </View>

                  }

                </View>
            </DialogContent>
        </Dialog>

        <Dialog
            visible={this.state.visible2}
            dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
            })}
            onTouchOutside={() => {
                this.setState({ visible2: false });
            }}
        >
            <DialogContent>
                <View style={{ width: screenWidth * 0.74, paddingTop: screenHeight * 0.02 }}>

                  <Text style={{ fontSize: screenHeight * 0.03 }}>Select Option</Text>

                  <TouchableOpacity
                    onPress={() => this.setState({ visible2: false, visible3: true })}
                  >
                    <Text style={{ marginVertical: screenHeight * 0.02 }}>Code Red</Text>
                  </TouchableOpacity>

                </View>
            </DialogContent>
        </Dialog>

        <Dialog
            visible={this.state.visible3}
            dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
            })}
            onTouchOutside={() => {
                this.setState({ visible3: false });
            }}
        >
            <DialogContent>
                <View style={{ width: screenWidth * 0.74, paddingTop: screenHeight * 0.02 }}>

                  <Text style={{ fontSize: screenHeight * 0.03, alignSelf: 'center' }}>Code Red</Text>

                  <Text style={{ marginVertical: screenHeight * 0.02, alignSelf: 'center' }}>Are you sure?</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginVertical: screenHeight * 0.01 }}>

                    <TouchableOpacity style={styles.buttonLogin}
                        onPress={ () => this.setState({ visible3: false }) }
                    >
                        <MaterialIcon name='clear' size={screenHeight * 0.04} color={whiteColor} />
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.buttonLogin}
                        onPress={() => this.handleCodeRed()}
                    >
                        <MaterialIcon name='check' size={screenHeight * 0.04} color={whiteColor} />
                    </TouchableOpacity>

                  </View>

                </View>
            </DialogContent>
        </Dialog>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: { backgroundColor: '#f9c2ff', padding: 20, marginVertical: 8, marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  imageStyle: {
    height: screenHeight * 0.04, width: screenHeight * 0.04
  },
  itemStyle: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: whiteColor, elevation: 3,
    marginHorizontal: screenWidth * 0.02, marginVertical: screenWidth * 0.01, paddingVertical: screenHeight * 0.02, elevation: 1
  },
  gridHeader: {
    backgroundColor: '#6B9946', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: screenHeight * 0.02,
  },
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
  },
  waitingText: {
    color: primaryColor
  },
  loadingContainer: {
    alignItems: 'center', justifyContent: 'center', height: screenHeight * 0.7
  },
  locationButton: {
    backgroundColor: primaryColor, height: screenHeight * 0.08, width: screenHeight * 0.08, borderRadius: screenHeight * 0.04,
    elevation: 8, alignItems: 'center', justifyContent: 'center', bottom: screenHeight * 0.1, right: screenWidth * 0.03,
    position: 'absolute'
  },
  textBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: whiteColor, elevation: 4, borderRadius: screenHeight * 0.04,
    marginVertical: screenHeight * 0.01, marginHorizontal: screenHeight * 0.03, paddingHorizontal: screenWidth * 0.05, zIndex: 2
  },
  icon: {
    color: primaryColor,
  },
  logoContainer: {
      height: screenHeight * 0.16, alignItems: 'center', justifyContent: 'center'
  },
  buttonLogin: {
      alignItems: 'center', justifyContent: 'center', backgroundColor: primaryColor, borderRadius: screenWidth * 0.75, 
      elevation: 3, height: screenWidth * 0.1, width: screenWidth * 0.2, marginHorizontal: screenWidth * 0.01
  }
});


export default Grid;