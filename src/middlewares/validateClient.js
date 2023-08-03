function validateClient(client) {
    const errors = [];
    const requiredFields = [
        { field: "name", message: "O nome é obrigatório!" },
        { field: "email", message: "O email é obrigatório!" },
        { field: "cpf", message: "O cpf é obrigatório!" },
        { field: "phone", message: "O telefone é obrigatório!" },

    ];

    requiredFields.forEach((field) => {
        if (!client[field.field]) {
            errors.push(field.message);
        }
    });

    return errors;
}

export { validateClient };
