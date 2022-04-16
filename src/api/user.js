import { auth, firestore } from "../../firebase";

export const getUser = async ({ userId }) => {
  console.log("userId", userId);
  await firestore
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      console.log("doc exists");

      if (doc.exists) {
        console.log("doc exists");
        return doc.data();
      }
      console.log("doc does not exist");
    })
    .catch((err) => {
      console.log(err);
    });
};
export async function login(user) {
  console.log("login-------------", user);
  let data;
  await firestore
    .collection("users")
    .doc(user.phone)
    .get()
    .then((doc) => {
      console.log("doc exists", doc.data());
       data = doc.data().userSnapshot;
      console.log("email", data.email, user.password);
      auth
        .signInWithPhoneNumber(user.phone)
        .then((user) => {
          if(user){

          }
        });
      });
      return data;
}

export const register = async ({ user }) => {
  console.log("actions register method ");
  console.log("actions register method ", user);
  
  await auth
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((result) => {
      const userSnapshot = {
        uid: result.user.uid,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        tc: user.tc,
        type: user.type,
        phone: user.phone,
      };
      firestore
        .collection("users")
        .doc(user.phone)
        .set({
          userSnapshot,
        })
        .then((q) => {
          return userSnapshot;
        });
    });
};
