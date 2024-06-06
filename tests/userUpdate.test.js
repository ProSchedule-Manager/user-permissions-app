const { updateUser } = require("../controllers/userControllers");
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
            json: jest.fn().mockReturnThis,
        }
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("updates an user", () => {
        it("updates an user if the user alreadys exists");
        it("fails to update an inexisting user");
        it("tries to update an user with missing fields requirements");
        it("handles database error");
    })
});