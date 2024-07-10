
  // firebaseConfig.js

import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyBEPlDAEU8mkd8Q93TqzgBa_HvHBDil138",
    authDomain: "meet-app-dbc6c.firebaseapp.com",
    databaseURL: "https://meet-app-dbc6c-default-rtdb.firebaseio.com",
    projectId: "meet-app-dbc6c",
    storageBucket: "meet-app-dbc6c.appspot.com",
    messagingSenderId: "308762302948",
    appId: "1:308762302948:web:f7aa1a745d7198623c0ff1",
    measurementId: "G-WFYLYCHD83"
  };


const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
