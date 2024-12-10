// create a redis client manager
const redis = require('redis');
const { promicify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient()
    this.client.on('error', (error) => {
      this.isconnected = false;
      console.log('Redis Error: ', error);
    });

    this.isConnected = true;
  }

  async connect() {
    // checks if the connection to reds was a success
    if (!this.isConnected) {
      try {
        await this.client.ping();
        this.isConnected = true;
      } catch (err) {
        this.isConnected = false;
      }
    }
  }

  isAlive() {
    return this.isConnected
  }
  async get(key) {
    //Retieve the value of the specified key
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async set(key, value, duration) {
    //Insert a key value into redis with a duration in seconds
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  async del(key) {
    // delete an already exixting key
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
      	if (err) reject(err);
	resolve(reply);
      });
    });
  }
}

// create and export an instance of the class
const redisClient = new RedisClient();
redisClient.connect();

module.exports = redisClient;
