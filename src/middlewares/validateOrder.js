function validateOrder(order) {
    const errors = [];
    const requiredFields = [
        { field: "brand", message: "O nome da marca é obrigatório!" },
        { field: "device", message: "O nome do aparelho e obrigatório!" },
        { field: "owner", message: "O proprietário é obrigatório!" },
        { field: "faulty", message: "O defeito é obrigatório!" },

    ];

    requiredFields.forEach((field) => {
        if (!order[field.field]) {
            errors.push(field.message);
        }
    });

    return errors;
}

export { validateOrder };
