// Static Demo Mode - No MongoDB connection needed
// This file provides mock exports to prevent errors

// Create a mock collection that returns empty/null for all operations
const mockCollection = {
  findOne: async () => null,
  find: async () => [],
  insertMany: async () => [],
  updateOne: async () => ({ modifiedCount: 0 }),
  deleteMany: async () => ({ deletedCount: 0 })
};

console.log('📌 Static Demo Mode - MongoDB connection disabled');
console.log('📌 Cart and orders are stored in browser localStorage');

module.exports = { collection: mockCollection };



