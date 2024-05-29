const { createUser } = require('../controllers/userControllers');
const database = require("../models/User");

describe('creates a new user', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
                permission: 'user',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('creates a new user if email is not in use', async () => {
        const mockUser = {
            id: 1,
            email: 'test@example.com',
            password: 'password123',
            permission: 'user',
        };

        jest.spyOn(database.User, 'findOne').mockResolvedValue(null);
        jest.spyOn(database.User, 'create').mockResolvedValue(mockUser);

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    // For some reason this test is only passed if it's called before the 'handles email already in use' test
    it('handles missing required fields', async () => {
        req.body = { email: 'test@example.com' }; // Missing password and permission

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Missing required fields: email, password, or permission" });
    });

    // This one was the same problem related to being called before 'handles email already in use'
    it('handles invalid email format', async () => {
        req.body.email = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/@gmail.com';

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid email format" });
    });

    it('handles email already in use', async () => {
        jest.spyOn(database.User, 'findOne').mockResolvedValue({ id: 1, email: 'test@example.com' });

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Email already in use" });
    });

    it('handles database error', async () => {
        jest.spyOn(database.User, 'findOne').mockImplementation(() => { throw new Error('Internal server error') });

        await createUser(req, res);
        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
});
