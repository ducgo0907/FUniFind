const checkEmailFPT = async (req, res, next) => {
	const { email } = req.body;
	if (isEmailInDomain(email, 'fpt.edu.vn')) {
		next();
	}else{
		return res.status(400).send({message: 'Only FPT University can do this.'});
	}
}

const isEmailInDomain = (email, domain) => {
	const regex = new RegExp(`@${domain}$`, 'i'); // Case-insensitive regex for the domain
	return regex.test(email);
}

export default {
	checkEmailFPT
}