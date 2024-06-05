const { createUser } = require("../controllers/userControllers");
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
      json: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("creates a new user", () => {
    it("creates a new user if email is not in use", async () => {
      const mockUser = {
        email: "test@example.com",
        password: "password123",
        permission: "user",
      };
      req.body = mockUser;
      const findOneSpy = jest
        .spyOn(database.User, "findOne")
        .mockResolvedValue(null);

      const createSpy = jest
        .spyOn(database.User, "create")
        .mockResolvedValue(mockUser);

      await createUser(req, res);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: { email: mockUser.email },
      });
      expect(createSpy).toHaveBeenCalledWith(mockUser);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    // This one was the same problem related to being called before 'handles email already in use'
    it("handles invalid email format", async () => {
      req.body.email = "/^[^s@]+@[^s@]+.[^s@]+$/@gmail.com";
      req.body.password = "password";
      req.body.permission = "tenant user";

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email format",
      });
    });

    // For some reason this test is only passed if it's called before the 'handles email already in use' test
    it("handles missing required fields", async () => {
      req.body = { email: "test@example.com" }; // Missing password and permission

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Missing required fields: email, password, or permission",
      });
    });

    it("handles email already in use", async () => {
      req.body.email = "test@example.com";
      req.body.password = "password123";
      req.body.permission = "user";

      database.User.findOne.mockResolvedValue(true);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email already in use",
      });
    });

    it("handles database error", async () => {
      jest.spyOn(database.User, "findOne").mockImplementation(() => {
        throw new Error();
      });

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});
