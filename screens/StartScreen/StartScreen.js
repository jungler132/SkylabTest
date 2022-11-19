import React, {useEffect, useState} from 'react';

import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  NotificationListener,
  requestUserPermission,
} from '../../utils/PushNotificationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {authentication} from '../../utils/firebase-config';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';

const StartScreen = () => {
  const navigation = useNavigation();
  const [isSignedIn, setIsSignedIn] = useState();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogged = async () => {
    try {
      const data = await AsyncStorage.getItem('logged');
      setIsSignedIn(data);
      if (isSignedIn !== undefined) {
        setLoading(false);
        if (isSignedIn === 'true') {
          navigation.navigate('LoginScreen');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const RegisterUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(re => {
        console.log(re);
        infoAlert('Registration');
      })
      .catch(re => {
        console.log(re);
      });
  };

  const infoAlert = issue => {
    if (issue === 'Registration') {
      Alert.alert('Registration', 'Success you can log in now.', [
        {text: 'OK'},
      ]);
    } else {
      Alert.alert('Wrong Credentials', 'Please try again.', [{text: 'OK'}]);
    }
  };

  const LoginUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then(re => {
        setIsSignedIn(true);
        AsyncStorage.setItem('logged', JSON.stringify(true));
      })
      .catch(re => {
        infoAlert();
        console.log(re);
      });
  };

  useEffect(() => {
    isLogged();
    requestUserPermission();
    NotificationListener();
  }, [isSignedIn]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {loading ? (
        <ActivityIndicator size="large" color="teal" />
      ) : (
        <>
          <TextInput
            style={{
              marginVertical: 10,
              fontSize: 20,
            }}
            placeholder="Enter email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={{
              marginVertical: 10,
              fontSize: 20,
            }}
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
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
            onPress={RegisterUser}>
            <Text style={{textAlign: 'center', fontSize: 20, color: 'aqua'}}>
              Register
            </Text>
          </TouchableOpacity>
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
            onPress={LoginUser}>
            <Text style={{textAlign: 'center', fontSize: 20, color: 'aqua'}}>
              Log In
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default StartScreen;
