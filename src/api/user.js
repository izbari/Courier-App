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
export async function login({ props }) {
  const { payload } = props;
  console.log("login-------------", payload);
  let data;
  await firestore
    .collection("users")
    .doc(payload.phone)
    .get()
    .then((doc) => {
      if(!doc.exists){ throw new Error("Kayıtlı olmayan bir numara girdiniz.");
    }
      data = doc.data();
      console.log("docdata",data)
    });
  
  return data;
}
export const checkDuplicateUser = async ({ user }) => {
  console.log("duplicate ", user);

  if (
    user?.name &&
    user?.lastName &&
    user?.password &&
    user?.phone &&
    user?.password &&
    user.tc.length == 11 &&
    user.phone.length == 10 &&
    user?.passwordAgain &&
    user?.password == user?.passwordAgain &&
    user?.tc
  ) {
  } else {
    console.log("---------> ", user?.password !== user?.passwordAgain);
    let msg = "Lütfen tüm alanları doldurunuz.";
    user?.password !== user?.passwordAgain && (msg = "Şifreleriniz uyuşmuyor.");
    user?.phone.length !== 10 && (msg = "Telefon numaranızı doğru giriniz.");
    user?.tc.length != 11 && (msg = "TC numaranızı doğru giriniz.");

    throw new Error(msg);
  }
  const status = await firestore.collection("users").doc(user.phone).get();
  const status2 = await firestore
    .collection("users")
    .where("tc", "==", user.tc)
    .get();
  console.log("status", status.exists);
  if (status.exists) {
    throw new Error("Bu telefon numarası ile daha önce hesap oluşturulmuş.");
  }
  if (!status2.empty) {
    throw new Error("Bu TC numarası ile daha önce hesap oluşturulmuş.");
  }
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", status2.empty);
};
export const register = async ({ user }) => {
  //const status = await checkDuplicateUser(user);
  console.log("deneme status bekliyor mu");
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
        .set(userSnapshot)
        .then((q) => {
          return userSnapshot;
        });
      result.user
        .updateProfile({
          displayName: user.name + " " + user.lastName,
          photoURL:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          phoneNumber: user.phone,
        })
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log("Successfully updated user", userRecord);
        })
        .catch((error) => {
          console.log("Error updating user:", error);
        });
    });
};
