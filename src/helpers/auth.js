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
          .prompt(
            {
              title: "Telefonnummer",
              body: "Skriv inn telefonnummeret ditt uten landskode",
              promptHelp: `Skriv ditt telefonnummer i boksen under og trykk "[+:okText]"`
            },
            {
              okText: "Fortsett",
              cancelText: "Lukk",
              customClass: "phone-prompt"
            }
          )
          .then(dialog => {
            // 8:  92848870
            // 10: 928 48 870
            // 11: 92 84 88 70
            if (!/^[\d\s]{8,11}$/g.test(dialog.data)) {
              context.$dialog.alert(
                "Vennligst logg inn på nytt og skriv ditt telefonnummer uten landskode. E.g. 99988777."
              );
              throw new Error("Feil format på telefonnummer.");
            }

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
