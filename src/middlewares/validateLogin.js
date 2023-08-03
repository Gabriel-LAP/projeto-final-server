import users from '../models/user.js';

const validateLogin = async (email, password) => {
    const errors = [];

    // validations
    if (!email) {
        return errors.push({ msg: "O email é obrigatório!" });
    }

    if (!password) {
        return errors.push({ msg: "A senha é obrigatória!" });
    }

    const user = await users.findOne({ email });

    if (!user) {
        return errors.push({ msg: "Usuário não encontrado!" });
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return errors.push({ msg: "Senha inválida" });
    }

    return errors;
}

export { validateLogin };
