import firebase from "firebase";
import fb from "@/firebaseConfig.js";

const loginUser = context => {
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
          });
      }
    });
};

export default loginUser;
