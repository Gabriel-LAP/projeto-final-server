function validateUser(user, confirmPassword) {
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

    ];

    requiredFields.forEach((field) => {
        if (!user[field.field]) {
            errors.push(field.message);
        }
    });

    if (user.password !== confirmPassword) {
        errors.push("A senha e a confirmação precisam ser iguais!");
    }

    return errors;
}

export { validateUser };
