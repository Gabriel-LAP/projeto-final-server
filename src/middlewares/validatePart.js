function validatePart(part) {
    const errors = [];
    const requiredFields = [
        { field: "name", message: "O nome da peça e obrigatório!" },
        { field: "purchasePrice", message: "O preço da peça é obrigatório!" },
        { field: "quantity", message: "A quantidade da peça é obrigatória!" },

    ];

    requiredFields.forEach((field) => {
        if (!part[field.field]) {
            errors.push(field.message);
        }
    });

    return errors;
}

export { validatePart };
