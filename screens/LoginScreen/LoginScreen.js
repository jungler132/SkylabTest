import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {signOut} from 'firebase/auth';
import {authentication} from '../../utils/firebase-config';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const SignOut = () => {
    signOut(authentication)
      .then(re => {
        AsyncStorage.setItem('logged', JSON.stringify(false));
        navigation.goBack();
      })
      .catch(re => {
        console.log(re);
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>WELCOME</Text>
      <TouchableOpacity
        style={{
          width: 100,
          height: 50,
          borderRadius: 10,
          backgroundColor: 'teal',
          marginVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={SignOut}>
        <Text style={{textAlign: 'center', fontSize: 20, color: 'aqua'}}>
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
