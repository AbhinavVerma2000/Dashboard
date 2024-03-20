const mongoose = require('mongoose');
const nodeSchema = new mongoose.Schema({}, { strict: false }); // Create a dynamic schema-less model
const Node = mongoose.models.Node || mongoose.model('Node', nodeSchema);
export default Node;