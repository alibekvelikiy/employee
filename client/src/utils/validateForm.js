export const validateForm = (errors, employee) => {
    let valid = true;
    for (let key in employee) {
        if (employee[key] === '') {
            valid = false;
        }
    }
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

export const required = value => value ? undefined : "Field is required";
export const minLength = minLength => value => {
    return value.length < minLength ? `Min length is ${minLength} symbols` : undefined;
}