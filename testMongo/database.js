const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();


// USERS
function getUser(email) {
  return userCollection.findOne({ email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token });
}

async function addUser(user) {
  return userCollection.insertOne(user);
}

async function updateUser(user) {
  return userCollection.updateOne({ email: user.email }, { $set: user });
}

// HABITS
function getHabits(email) {
  return habitCollection.find({ email }).toArray();
}

async function addHabit(habit) {
  return habitCollection.insertOne(habit);
}

async function updateHabit(id, newFields) {
  return habitCollection.updateOne({ id }, { $set: newFields });
}

async function deleteHabit(id) {
  return habitCollection.deleteOne({ id });
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  getHabits,
  addHabit,
  updateHabit,
  deleteHabit,
};












// const { MongoClient } = require('mongodb');
// const config = require('./dbConfig.json');

// const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

// // Connect to the database cluster
// const client = new MongoClient(url);
// const db = client.db('rental');
// const collection = db.collection('house');

// async function main() {
//   try {
//     // Test that you can connect to the database
//     await db.command({ ping: 1 });
//     console.log(`DB connected to ${config.hostname}`);
//   } catch (ex) {
//     console.log(`Connection failed to ${url} because ${ex.message}`);
//     process.exit(1);
//   }

//   try {
//     // Insert a document
//     const house = {
//       name: 'Beachfront views',
//       summary: 'From your bedroom to the beach, no shoes required',
//       property_type: 'Condo',
//       beds: 1,
//     };
//     await collection.insertOne(house);

//     // Query the documents
//     const query = { property_type: 'Condo', beds: { $lt: 2 } };
//     const options = {
//       sort: { name: -1 },
//       limit: 10,
//     };
//     const cursor = collection.find(query, options);
//     const rentals = await cursor.toArray();
//     rentals.forEach((i) => console.log(i));

//     // Delete documents
//     await collection.deleteMany(query);
//   } catch (ex) {
//     console.log(`Database (${url}) error: ${ex.message}`);
//   } finally {
//     await client.close();
//   }
// }

// main();