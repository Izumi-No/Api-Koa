const bcrypt = require('bcrypt')


function UserController() {
	return {
		hashPassword: password => {
			const saltRounds = bcrypt.genSaltSync(rounds);
			const hashedPassword = bcrypt.hashSync(password, saltRounds);

			return hashedPassword;
		}, 

		getAllUsers: async ({response}) => {
			try {
				const users = await model.find({});
				response.status(200).json(users);
			} catch (error) {
				response.status(500).json(error);
			}
		},

		createUser: async ({request,response}) => {
			const user = request.body;
			try {
				user.password = this.hashPassword(user.password);
				console.log(user.password);
				const newUser = await model.create(user);
				response.status(200).json(newUser);
			} catch (error) {
				console.log(error);
				response.status(500).json(error);
			}
		},

		updateUser: async ({request,response}) => {
			const user = request.body;
			try {
				user.password = this.hashPassword(user.password);
				await model.findByIdAndUpdate(request.params.id, user);
				response.status(200).json(user);
			} catch (error) {
				response.status(404).json(error);
			}
		},

		searchUserById: async ({request,response}) => {
			const { id } = request.params;
			try {
				const user = await model.findById(id);
				response.status(200).json(user);
			} catch (error) {
				response.status(404).json(error);
			}
		}
	}
}



module.exports = UserController()
