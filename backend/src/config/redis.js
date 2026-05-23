const {createClient} = require("redis");

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PAS ,
    socket: {
        host: 'ultraneat-stone-condition-88519.db.redis.io',
        port: 13912
    }
});

module.exports= redisClient;