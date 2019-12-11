import React, { Component } from 'react';
import { View } from 'react-native';

import PropTypes from 'prop-types';

import AppNavigator from './src/components/AppNavigator';

class App extends Component {
    render() {
        return (
            <AppNavigator />
        );
    }
}

export default App;
