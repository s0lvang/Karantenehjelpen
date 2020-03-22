import fb from "firebase";
import fbh from "@/firebaseConfig.js";
import { getRedirectUrl } from "@/helpers/auth";

/**
 * HELPERS
 */

const retrieveRequest = (userId, requestId) =>
  fbh.usersCollection
    .doc(userId)
    .collection("requests")
    .doc(requestId);

/**
 * HELPERS END
 */

export const signOut = async (callback = () => {}) => {
  await fb.auth().signOut();

  callback();
};

const ACTION_CODE_SETTINGS = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: getRedirectUrl(),
  // This must be true.
  handleCodeInApp: true,
  lang: "no"
};

/**
 * @returns string if error, null if success
 * @param {Function} callback Callback on success
 */
export const registerWithEmail = async (email, callback = () => {}) => {
  try {
    await fb.auth().sendSignInLinkToEmail(email, ACTION_CODE_SETTINGS);
    window.localStorage.setItem("emailForSignIn", email);

    callback();

    return null;
  } catch (err) {
    return err.code;
  }
};

export const isAuthLink = url => {
  return fb.auth().isSignInWithEmailLink(url);
};

export const login = async (url, dialogControl, callback = () => {}) => {
  try {
    if (!isAuthLink(url)) {
      return null;
    }

    let email = window.localStorage.getItem("emailForSignIn");

    if (!email) {
      // If the user opens the link on another device
      const prompt = await dialogControl.prompt(
        {
          title: "Epostadresse",
          body: "Skriv inn epostadressen din",
          promptHelp: `Skriv din epostadresse i boksen under og trykk "[+:okText]"`
        },
        {
          okText: "Fortsett",
          cancelText: "Lukk",
          customClass: "phone-prompt"
        }
      );
      email = await prompt.data;
    }

    await fb.auth().signInWithEmailLink(email, url);

    // Vi må utføre dette i component for å bevare "this"
    await callback(fb.auth().currentUser);

    window.localStorage.removeItem("emailForSignIn");

    return null;
  } catch (err) {
    return err.code;
  }
};

export const updateRequest = async (
  userId,
  requestId,
  payload,
  callback = () => {}
) => {
  await retrieveRequest(userId, requestId).update(payload);

  callback();
};

export const createRequest = async (userId, request, callback = () => {}) => {
  await fbh.usersCollection
    .doc(userId)
    .collection("requests")
    .add({
      createdOn: new Date(),
      ...request
    });

  callback();
};

export const signInWithGoogle = () =>
  fb.auth().signInWithRedirect(new fb.auth.GoogleAuthProvider());

export const deleteRequest = async (userId, requestId, callback = () => {}) => {
  await retrieveRequest(userId, requestId).delete();

  callback();
};

export const updateUserPhoneNumber = (userId, phoneNumber) =>
  fbh.additionalUserInfoCollection.doc(userId).update({ phoneNumber });

export const deleteUser = (userId, callback = () => {}) => {
  fbh.usersCollection.doc(userId).delete();
  fbh.additionalUserInfoCollection.doc(userId).delete();

  fb.auth().currentUser.delete();

  callback();
};

export const getDelivered = async (callback = () => {}) => {
  const resp = await fb
    .firestore()
    .collectionGroup("requests")
    .where("delivered", "==", true)
    .get();

  callback(resp.docs.length);
};

export const getOngoingCount = async (callback = () => {}) => {
  const resp = await fb
    .firestore()
    .collectionGroup("requests")
    .where("delivered", "==", false)
    .orderBy("connectedUser")
    .startAfter(null)
    .get();
  callback(resp.docs.length);
};
