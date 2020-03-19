import firebase from "firebase";
import fb from "@/firebaseConfig.js";

export const authenticateUser = context => {
  console.log(context);
  const { currentUser } = firebase.auth();
  fb.additionalUserInfoCollection
    .doc(currentUser.uid)
    .get()
    .then(userInfo => {
      if (userInfo.data() && userInfo.data().phoneNumber) {
        context.$store.dispatch("SET_CURRENT_USER", {
          ...currentUser,
          ...userInfo.data()
        });
        context.$router.replace("home");
      } else {
        context.$dialog
          .prompt({
            title: "Telefonnummer",
            body: "Skriv inn telefonnummeret ditt uten landskode",
            promptHelp: ""
          })
          .then(dialog => {
            fb.additionalUserInfoCollection
              .doc(currentUser.uid)
              .set({ phoneNumber: dialog.data });
            context.$store.dispatch("SET_CURRENT_USER", {
              ...currentUser,
              phoneNumber: dialog.data
            });
            context.$router.replace("home");
          })
          .catch(() => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                context.$store.dispatch("SET_CURRENT_USER", null);
              })
              .catch(error => {
                console.log(`something went wrong ${error.message}`);
              });
          });
      }
    });
};

export const getErrorMessage = errorCode => {
  switch (errorCode) {
    case "auth/invalid-password":
      return "Passordet er feil!";
    case "auth/invalid-email":
      return "Formatet på mailen er feil!";
    case "auth/email-already-in-use":
      return "Mailen skrevet inn er allerede i bruk";
    case "auth/too-many-requests":
      return "For mange login forsøk, prøv igjen senere";
    default:
      return `Ukjent errorkode: ${errorCode}`;
  }
};
