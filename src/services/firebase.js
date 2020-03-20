import fb from "firebase";

export const signOut = async (store, router, callback) => {
  try {
    await fb.auth().signOut();
    store.dispatch("SET_CURRENT_USER", null);
    router.push("/login");

    callback();
  } catch (err) {
    console.error(`Error oppsto ved utlogging: ${err}`);
  }
};

export const signIn = async () => { };
