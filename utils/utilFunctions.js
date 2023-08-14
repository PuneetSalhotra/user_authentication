const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Set your JWT secret key
const JWT_SECRET = 'yourSecretKeyHere';
const algorithm = 'aes-256-cbc'; // AES encryption with 256-bit key in CBC mode
const key = crypto.randomBytes(32); // 256-bit encryption key
const iv = crypto.randomBytes(16); // Initialization vector (IV) for added security


// Function to create a JWT token
function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

// Function to verify a JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Function to hash a password
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Function to compare a password with its hash
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// Function to encrypt data
function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decrypt data using AES-256-CBC
function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}


module.exports = {
  createToken,
  verifyToken,
  hashPassword,
  comparePassword,
  encrypt,
  decrypt
};
