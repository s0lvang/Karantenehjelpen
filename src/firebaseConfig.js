import firebase from 'firebase/app';

import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyDRuCJ-o1mhzoEwgvQPO3gRSveSLnk1TJ8',
  authDomain: 'karantenehjelpen-test.firebaseapp.com',
  databaseURL: 'https://karantenehjelpen-test.firebaseio.com',
  projectId: 'karantenehjelpen-test',
  storageBucket: 'karantenehjelpen-test.appspot.com',
  messagingSenderId: '456610386940',
  appId: '1:456610386940:web:cab8716a42bec9476f5879',
  measurementId: 'G-RT92SR5NGP',
});

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const { currentUser } = auth;

db.settings({});

// firebase collections
const usersCollection = db.collection('users');

export default {
  db,
  auth,
  currentUser,
  usersCollection,
};
