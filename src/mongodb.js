// Static Demo Mode - No MongoDB connection needed
// This file provides mock exports to prevent errors

const mongoose = require('mongoose');

// Mock schema for compatibility
const loginSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

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



