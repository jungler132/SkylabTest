import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCnB_iQiiZmIQ7XUMsKm8DAqTeH2a6AwGg',
  authDomain: 'skyllab.firebaseapp.com',
  projectId: 'skyllab',
  storageBucket: 'skyllab.appspot.com',
  messagingSenderId: '233204633871',
  appId: '1:233204633871:web:90a0adf7760a91050cae7a',
  measurementId: 'G-D4CQD1DV8B',
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
