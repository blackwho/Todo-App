"use strict";

function Config()
{
    this.port = '3000';
    // this.dbUrl = 'mongodb://blackwho:letschatdbadmin@ds151242.mlab.com:51242/letschatdb';
    this.dbUrl = 'mongodb://blackwho:todoapp1@ds115154.mlab.com:15154/todoappdatabase'
    this.redisStore = {
        host: 'redis-18409.c114.us-east-1-4.ec2.cloud.redislabs.com:18409',
        port: '18409',
        secret: 'viki@95'
    };
}

module.exports = new Config();