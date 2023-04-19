
export function parsedField(fields) {
    Object.entries(fields).forEach(([key, value]) => {
        if (!value) {
            delete fields[key]
        }
    })
    return fields;
}