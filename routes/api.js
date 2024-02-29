const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
	const { name, email, password, confirmpassword } = req.body;
	if (!name) {
		return res.status(422).json({ msg: "name é obrigatório" });
	}
	if (!email) {
		return res.status(422).json({ msg: "email é obrigatório" });
	}
	if (!password) {
		return res.status(422).json({ msg: "password é obrigatório" });
	}
	if (password !== confirmpassword) {
		return res.status(422).json({ msg: "As senhas não conferem " });
	}
	const userExists = User.findOne({ email: email });
	if (userExists) {
		return res.status(422).json({ msg: "Usuário existe" });
	}

	const salt = await bcrypt.genSalt(12);
	const passwordHash = await bcrypt.hash(password, salt);
	const user = new User({
		name,
		email,
		password: passwordHash,
	});

	try {
		const users = await User.save(user);
		res.status(201).json({ msg: "usuário criado com sucesso" });
	} catch (error) {
		res.status(500).json({ error, msg: "Aconteceu um erro no servidor" });
	}
});

router.get("/user/:id", async (req, res) => {
	const id = req.params.id;
	const user = User.findById(id, "-password");

	if (!user) {
		res.status(404).json({ msg: "usuário não existe" });
		return;
	}
	res.status(200).json({ user });
});
function checkToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
}
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!email) {
		return res.status(422).json({ msg: "email é obrigatório" });
	}
	if (!password) {
		return res.status(422).json({ msg: "password é obrigatório" });
	}
	const userpost = User.findOne({ email: email });
	if (!userpost) {
		return res.status(422).json({ msg: "Usuário não existe existe" });
	}
	checkPassword = await bcrypt.compare(password, userpost.password);
	if (!checkPassword) {
		return res.status(422).json({ msg: "senha não correta" });
	}
	try {
		const secret = process.env.SECRET;
		const token = jwt.sign(
			{
				id: user._id,
			},
			secret,
		);
		res.status(200).json({ msg: "usuário logado com sucesso", token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Aconteceu um erro no servidor " });
	}
});
module.exports = router;
