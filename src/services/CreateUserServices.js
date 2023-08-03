import bcrypt from "bcrypt";

class CreateUserServices {
    static createUser = async ({
        name,
        email,
        password,
        confirmpassword,
        phone,
        adress,
        zipCode,
        city,
        state,
        type
    }) => {

        // create password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = {
            name,
            email,
            password: passwordHash,
            phone,
            adress,
            zipCode,
            city,
            state,
            type
        }

        // validations
        const errors = [];
        const requiredFields = [
            { field: "name", message: "O nome é obrigatório!" },
            { field: "email", message: "O email é obrigatório!" },
            { field: "password", message: "A senha é obrigatória!" },
            { field: "phone", message: "O telefone é obrigatório!" },
            { field: "adress", message: "O endereço é obrigatório!" },
            { field: "zipCode", message: "O CEP é obrigatório!" },
            { field: "city", message: "A cidade é obrigatória!" },
            { field: "state", message: "O estado é obrigatório!" },
            { field: "type", message: "O país é obrigatório!" }
        ];

        requiredFields.forEach((field) => {
            if (!user[field.field]) {
                errors.push(field.message);
            }
        });

        if (password !== confirmpassword) {
            errors.push("A senha e a confirmação precisam ser iguais!");
        }

        if (errors.length > 0) {
            return errors
        }

        // check if user exists
        const userExists = await users.findOne({ email: email });

        if (userExists) {
            return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
        }


        return user
    }

}

export {
    CreateUserServices
}