// Static Demo Mode - Mock Order model
// Orders are handled via localStorage on the frontend

class MockOrder {
  constructor(data) {
    Object.assign(this, data);
  }
  async save() {
    return this;
  }
  static async find() {
    return [];
  }
  static async deleteMany() {
    return { deletedCount: 0 };
  }
}

module.exports = { Order: MockOrder };

