// userController.test.js
// jest for tests
// sinon for mocking & spying

const { createUser } = require('../controllers/userControllers');
const database = require("../models/User");
const sinon = require('sinon');

describe('createUser', () => {
    let req, res, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
                permission: 'user',
            },
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create a new user when email is not already in use', async () => {
        const mockUser = {
            id: 1,
            email: 'test@example.com',
            password: 'password123',
            permission: 'user',
        };

        sandbox.stub(database.User, 'findOne').resolves(null);
        sandbox.stub(database.User, 'create').resolves(mockUser);

        await createUser(req, res);

        sinon.assert.calledWith(res.status, 201);
        sinon.assert.calledWith(res.json, mockUser);
    });

    it('should return 400 if email is already in use', async () => {
        sandbox.stub(database.User, 'findOne').resolves({ id: 1, email: 'test@example.com' });

        await createUser(req, res);

        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledWith(res.json, { message: "Email already in use" });
    });

    it('should return 400 if required fields are missing', async () => {
        req.body = { email: 'test@example.com' }; // Missing password and permission

        await createUser(req, res);

        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledWith(res.json, { message: "Missing required fields: email, password, or permission" });
    });

    it('should return 400 if email format is invalid', async () => {
        req.body.email = 'invalid-email';

        await createUser(req, res);

        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledWith(res.json, { message: "Invalid email format" });
    });

    
    it('should return 500 if there is an internal server error', async () => {
        sandbox.stub(database.User, 'findOne').throws(new Error('Internal server error'));

        await createUser(req, res);

        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledWith(res.json, { message: "Internal server error" });
    });
    
});
