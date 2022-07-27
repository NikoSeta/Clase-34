const mongoose = require('mongoose');

run().catch(error => console.log(error.stack));

async function run() {
  await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

  // Clear the database every time. This is for the sake of example only,
  // don't do this in prod :)
  await mongoose.connection.dropDatabase();

  const customerSchema = new mongoose.Schema({ name: String, age: Number, email: String });
  const Customer = mongoose.model('Customer', customerSchema);

  await Customer.create({ name: 'A', age: 30, email: 'a@foo.bar' });
  await Customer.create({ name: 'B', age: 28, email: 'b@foo.bar' });

  // Find all customers
  const docs = await Customer.find();
  console.log(docs);
}