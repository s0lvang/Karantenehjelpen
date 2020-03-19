import firebase from "firebase";
import fb from "@/firebaseConfig.js";

export default (context, user) => {
  fb.additionalUserInfoCollection
    .doc(user.uid)
    .get()
    .then(userInfo => {
      if (userInfo.data() && userInfo.data().phoneNumber) {
        context.$store.dispatch("SET_CURRENT_USER", {
          ...user,
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
              .doc(user.uid)
              .set({ phoneNumber: dialog.data });
            context.$store.dispatch("SET_CURRENT_USER", {
              ...user,
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
