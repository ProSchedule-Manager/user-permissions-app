const { createUser } = require('../controllers/userControllers');
const database = require("../models/User");

describe('creates a new user', () => {
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

    it('creates a new user if email is not in use', async () => {
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

    it('handles email already in use', async () => {
        sandbox.stub(database.User, 'findOne').resolves({ id: 1, email: 'test@example.com' });

        await createUser(req, res);

        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledWith(res.json, { message: "Email already in use" });
    });

    it('handles missing required fields', async () => {
        req.body = { email: 'test@example.com' }; // Missing password and permission

        await createUser(req, res);

        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledWith(res.json, { message: "Missing required fields: email, password, or permission" });
    });

    it('handles invalid email format', async () => {
        req.body.email = 'invalid-email';

        await createUser(req, res);

        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledWith(res.json, { message: "Invalid email format" });
    });

    
    it('handles database error', async () => {
        sandbox.stub(database.User, 'findOne').throws(new Error('Internal server error'));

        await createUser(req, res);

        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledWith(res.json, { message: "Internal server error" });
    });
    
});
