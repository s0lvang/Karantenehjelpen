import firebase from "firebase/app";
import fb from "@/firebaseConfig.js";

export const handleSignedIn = async (context, user) => {
  if (!user.displayName) {
    await context.$dialog
      .prompt(
        {
          title: "Navn",
          body: "Skriv inn navnet ditt",
          promptHelp: `Skriv ditt navn i boksen under og trykk "[+:okText]"`
        },
        {
          okText: "Fortsett",
          cancelText: "Lukk",
          customClass: "phone-prompt"
        }
      )
      .then(dialog => {
        if (!dialog.data) {
          throw new Error("Venligst skriv inn et navn");
        }
        user.updateProfile({ displayName: user.data });
      });
  }
  await fb.additionalUserInfoCollection
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

export const getRedirectUrl = () => {
  return `${window.location.origin}/login`;
};
