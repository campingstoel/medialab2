import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GeoFirestore } from "geofirestore";
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import { getInAppMessaging } from "firebase/in-app-messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBCdZPiC92MSHyTIIMWjMa-ANFj5jPPquU",
  authDomain: "brandweer-2c170.firebaseapp.com",
  projectId: "brandweer-2c170",
  storageBucket: "brandweer-2c170.appspot.com",
  messagingSenderId: "284501305697",
  appId: "1:284501305697:web:8de2403ad55ad8acebbd20",
  measurementId: "G-TS6JL3ELDP",
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
export const geoFirestore = new GeoFirestore(db);
export const inAppMessaging = getInAppMessaging(app);
