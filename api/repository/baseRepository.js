import { getPoolConnexion } from "../db.js";

async function find(sql, args = [], onlyOne = false) {
    try {
        const [rows] = await getPoolConnexion()
            .query(sql, args)

        return onlyOne ? rows[0] : rows
    } catch (error) {
        console.error(error)
    }

    return onlyOne ? null : []
}

async function findOne(sql, args = []) {
    return find(sql, args, true)
}

async function findAll(table) {
    return find(`SELECT * FROM ${table}`)
}


export async function insert(table, data) {
    try {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const valuesMarkers = values.map(() => "?").join(", ");

        const [result] = await getPoolConnexion().execute(
            `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${valuesMarkers})`,
            values
        );

        return result.insertId;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



// table, id, {fields: values}
// SET field1 = 1, field2 = 2
async function update(table, id, entries) {
    const keys = Object.keys(entries);
    const values = Object.values(entries);
    const setValues = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
    const sql = `UPDATE ${table} SET ${setValues} WHERE id = $${keys.length + 1}`;
    const args = [...values, id];
    return getPoolConnexion().query(sql, args);
}

export default {
    find,
    findOne,
    findAll,
    insert,
    update
}
