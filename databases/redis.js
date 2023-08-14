const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(); // Connect to Redis server

// Promisify Redis commands
const lpushAsync = promisify(client.lpush).bind(client);
const rpushAsync = promisify(client.rpush).bind(client);
const lpopAsync = promisify(client.lpop).bind(client);
const llenAsync = promisify(client.llen).bind(client);

// Function to add an item to the beginning of a queue
async function enqueue(queueName, data) {
  await lpushAsync(queueName, data);
}

// Function to add an item to the end of a queue
async function enqueueBack(queueName, data) {
  await rpushAsync(queueName, data);
}

// Function to remove and get the next item from the queue
async function dequeue(queueName) {
  return await lpopAsync(queueName);
}

// Function to get the current size of the queue
async function getQueueSize(queueName) {
  return await llenAsync(queueName);
}

module.exports = {
  enqueue,
  enqueueBack,
  dequeue,
  getQueueSize,
};
