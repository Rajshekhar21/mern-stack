import mongoose from 'mongoose';

const initiateMongoDB = async () => {
  await mongoose.connect(
    'mongodb+srv://' +
      process.env.DB_USER_NAME +
      ':' +
      process.env.DB_PASSWORD +
      '@' +
      process.env.DB_HOST +
      '?retryWrites=true&w=majority',
  );
};

export default initiateMongoDB;
