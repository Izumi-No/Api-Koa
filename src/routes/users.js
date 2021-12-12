module.exports = (src) => {
  const { UserController } = src.Controllers;
	const router = src.router

  router.get("/users", UserController.getAllUsers);

  router.post("/users/create", UserController.createUser);

  router.put("/users/update/:id", UserController.updateUser);

  router.get("/users/select/:id", UserController.searchUserById);

};