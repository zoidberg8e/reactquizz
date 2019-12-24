import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';

var initializedApp;
if (!firebase.apps.length) {
    initializedApp = firebase.initializeApp(ApiKeys.FirebaseConfig);
    console.log("initialized firebase");
}
export const db = initializedApp.database();
export const app = initializedApp;