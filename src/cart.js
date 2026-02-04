// Static Demo Mode - Mock Cart model
// Cart is handled via localStorage on the frontend

const Cart = {
  findOne: async () => null,
  findOneAndUpdate: async () => ({ items: [] }),
  findOneAndDelete: async () => null
};

module.exports = { Cart };
