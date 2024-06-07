const { createUser, updateUser } = require("../controllers/userControllers");
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
    jest.resetAllMocks();
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

    
    it("handles missing required fields", async () => {
      req.body = { email: "test@example.com" };

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
        throw new Error("Error creating a user. Please try again.");
      });

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error creating a user. Please try again.",
      });
    });
  });

  describe("updates a user", () => {
      it("updates an existent user", async() => {
        const req = {
          body: { id: 1, email: "newemail@example.com", password: "newpassword", permission: "newpermission" }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
    
        database.User.update = jest.fn().mockResolvedValue([1]);
    
        await updateUser(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("User data updated");
      });
      it("handles a request to update non existent user", async() => {
          const req = {
            body: { id: 99, email: "newemail@example.com", password: "newpassword", permission: "newpermission" }
          };
          const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
          };
          
          // O primeiro elemento da função updated do sequeleize é o número de linhas afetadas por essa atualização
          // Se o valor de n em mockResolverValue([n]) for diferente de 0, não estaremos buscando por alterações
          database.User.update = jest.fn().mockResolvedValue([0]);
      
          await updateUser(req, res);
      
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.send).toHaveBeenCalledWith("User not found");
      });
      it("handles partial updates", async() => {
        const req = {
          body: { id: 69, email: "newemail@example.com" }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };

        database.User.update = jest.fn().mockResolvedValue([69]);

        await updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("User data updated");
      });
      it("handles database error", async() => {
        const req = {
          body: { id: 1, email: "newemail@example.com" }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
        database.User.update = jest.fn().mockResolvedValue(new Error("Database error"));
        await updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("An error occurred while updating user data");
      });
  });

})
