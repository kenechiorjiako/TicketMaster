import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import StackNav from './navigation/StackNav';
import {store} from './redux/Store'
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
