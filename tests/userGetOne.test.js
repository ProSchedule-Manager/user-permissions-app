const { getOneUser, readUser } = require("../controllers/userControllers");
const database = require("../models/User");

jest.mock("../models/User");

describe("user controller", () => {

    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            param: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json:   jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
})

describe("reads an user", () => {
    it("get an existing user", async () => {
        const mockUser = {
            id: 1,
            email: "test@example.com",
            password: "password",
            permission: "tentant",
        };

        req.body = mockUser;
 
        const findOneSpy = jest
            .spyOn(database.User, "findone")
            .mockResolveValue(null);

        const createSpy = jest
            .spyon(database.User, "readOne")
            .mockResolveValue(mockUser);

        await readUser(req, res);

        expect(findOneSpy).toHaveBeenCalledWith({
            where: { email: mockUser.email }
        });
        expect(createSpy).toHaveBeenCalledWith(mockUser);
        expect(req.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });
})