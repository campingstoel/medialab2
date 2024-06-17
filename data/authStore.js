import { auth, db, storage } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Store, registerInDevTools } from "pullstate";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
  GeoPoint,
  query,
} from "firebase/firestore";

export const AuthStore = new Store({
  isLoggedIn: false,
  user: null,
  initialized: false,
  displayName: "",
  location: "",
  users: [],
});

export const registerUser = async (email, password, displayName) => {
  console.log("registering user");
  if (!(await inputValidation(email, password))) {
    console.log("invalid input");
    return null;
  }
  console.log("registering user");
  try { 
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: displayName,
    });
    await saveUserToFirestore(user, "");
    return user;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const signInUser = async (email, password) => {
  if (!(await inputValidation(email, password))) {
    return null;
  }
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("signed in");
    return userCredential.user;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getUserFromFirestore = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    if(!userRef) return console.log("No userRef");

    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      AuthStore.update((s) => {
        s.location = docSnap.data().location;
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const saveUserToFirestore = async (user, location) => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      location: new GeoPoint(0, 0),
    });
    AuthStore.update((s) => {
      s.location = location;
    });
  } catch (e) {
    console.log(e);
  }
};

const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    getUserFromFirestore(user);
  }
  AuthStore.update((s) => {
    s.user = user;
    s.isLoggedIn = user ? true : false;
    s.initialized = true;
    s.displayName = user ? user.displayName : "";
    s.location = user ? user.location : "";
  });
});

export const updateLocationInFirestore = async (user, location) => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      location: new GeoPoint(location.latitude, location.longitude),
    });
    AuthStore.update((s) => {
      s.location = location;
    });
  } catch (e) {
    console.log(e);
  }
}

//create a function that gets all users where location isnt 0,0 
export const getUsers = async () => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  let users = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().location.latitude !== 0 && doc.data().location.longitude !== 0) {
      users.push(doc.data());
    }
    AuthStore.update((s) => {
      s.users = users;
    });
  });
  return users;
};



const inputValidation = async (email, password) => {
  // check if email has valid format
  if (email) {
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return true;
    }
  }
  if (password) {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,20}$/;
    return passwordRegex.test(password);
  }
  return false;
};
