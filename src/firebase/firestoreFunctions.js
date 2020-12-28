import db from "./firebaseConfig";

const userRef = db.firestore().collection("users");

const readUser = async id => {
  try {
    const doc = await userRef.doc(id.toString()).get();
    if (!doc.exists) {
      return null;
    } else {
      return doc.data();
    }
  } catch (err) {
    return "error";
  }
};

const updateUser = (dbUser, rewardData) => {
  let finalUser;

  if (dbUser === "error") {
    return;
  }
  if (dbUser === null) {
    finalUser = {
      display_name: rewardData.user.display_name,
      points_spent: rewardData.reward.cost,
      rewards_count: 1,
    };
  }
  if (dbUser) {
    console.log(dbUser);
    finalUser = {
      display_name: rewardData.user.display_name,
      points_spent: dbUser.points_spent + rewardData.reward.cost,
      rewards_count: dbUser.rewards_count + 1,
    };
  }
  return finalUser;
};

const setUser = async (id, user) => {
  await userRef.doc(id).set(user);
};

export const handleReward = async rewardData => {
  const dbUser = await readUser(rewardData.user.id);
  const finalUser = updateUser(dbUser, rewardData);
  setUser(rewardData.user.id, finalUser);
};

const queueRef = db.firestore().collection("queue");

export const saveLastRedeems = async rewards => {
  await queueRef.doc("queue").set({ rewards: JSON.stringify(rewards) });
};

export const loadLastRedeems = async () => {
  const data = await queueRef.doc("queue").get();
  return JSON.parse(data.data().rewards);
};
