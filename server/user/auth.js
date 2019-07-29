class AuthService {

	public async Login(email, password): Promise<any> {
		const userRecord = await UserModel.findOne({ email });
		if (!userRecord) {
			throw new Error('User not found')
		} else {
			const correctPassword = 
			if (!correctPassword) {
				throw new Error('Incorrect password')
			}
		}

		return {
			user: {
				email: userRecord.email,
				name: userRecord.name,
			},
			token: this.generateJWT(userRecord),
		}
	}
}
