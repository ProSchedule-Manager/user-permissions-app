const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const userRoutes = require('../routes/userRoutes');

// Setup an in-memory Sequelize instance for testing
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  permission: {
    type: DataTypes.STRING,
  },
});

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

const app = express();
app.use(bodyParser.json());
app.use('/users', userRoutes);

describe('User API', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'test@example.com',
        password: 'password123',
        permission: 'admin',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('email', 'test@example.com');
    expect(response.body).toHaveProperty('password', 'password123');
    expect(response.body).toHaveProperty('permission', 'admin');
  });

  it('should not create a user with an existing email', async () => {
    // Create a user first
    await User.create({
      email: 'duplicate@example.com',
      password: 'password123',
      permission: 'admin',
    });

    const response = await request(app)
      .post('/users')
      .send({
        email: 'duplicate@example.com',
        password: 'password123',
        permission: 'admin',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Email already in use');
  });

  it('should not create a user with missing fields', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'missingfields@example.com',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Missing required fields: email, password, or permission');
  });

  it('should not create a user with invalid email format', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'invalid-email',
        password: 'password123',
        permission: 'admin',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid email format');
  });
});
