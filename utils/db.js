const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    this.url = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(this.url, {useNewUrlParser: true, useUnifiedTopology: true});
    this.isConnected = false;
  }

  async connect() {
    try {
      await this.client.connect();
      this.isConnected = true;
    } catch (err) {
      console.log('something sent wrong');
      this.isConnected = false;
    }
  }

  isAlive() {
    return this.isConnected;
  }

  async nbUsers() {

    const db = this.client.db(this.database);
    const collection = db.collection('users');
    return await collection.countDocuments();
  }

  async nbFiles() {
    const db = this.client.db(this.database);
    const collection = db.collection('files');
    return await collection.countDocuments();
  }
}

const dbClient = new DBClient();
dbClient.connect();

module.exports = dbClient
