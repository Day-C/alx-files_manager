const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class AppController {
  static async getStatus(req, res) {
    // theck if reds is alive
    const redisAlive = redisClient.isAlive();
    // check if the mongodb is alive
    const dbIsAlive = dbClient.isAlive();
    res.status(200).json({ redis: redisAlive, db: dbIsAlive });
  }
  static async getStats(req, res) {
    //get the number of users
    const userCount = await dbClient.nbUsers();
    // get the number of files
    const fileCount = await dbClient.nbFiles();
    res.status(200).json({users: userCount, files: fileCount});
  }
}

module.exports = AppController;
