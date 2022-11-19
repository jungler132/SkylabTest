import React, {useEffect} from 'react';

import {Text, View} from 'react-native';
import {requestUserPermission} from '../../utils/PushNotificationHelper';

import {styles} from './style';

const StartScreen = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30}}>StartScreen</Text>
    </View>
  );
};

export default StartScreen;
