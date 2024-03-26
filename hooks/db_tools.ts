import { db } from "@/lib/db"

export async function DESC(table: string) {
    const data = await db.$queryRawUnsafe(`DESC ${table}`);
    return data;
}

export async function ADD(table: string, d: Object) {
    /*
    table is simply table name 
    d is object as follows: 
    {
        column_name: value,
        column_name: value,
        ...
    }

    not all columns need to be defined in d, anything undefined will be done automatically by db as per rules
    */
    const query = `INSERT INTO ${table} (${Object.keys(d).join(", ")}) VALUES ('${Object.values(d).join("', '")}')`
    const response = await db.$queryRawUnsafe(query);
    return response;
}

export async function DELETE(table: string, condition: string) {
    /*
    table = tablename 
    condition = condition to be met for deletion in mySQL formmat
    */
    const response = await db.$queryRawUnsafe(`DELETE FROM ${table} WHERE ${condition}`);
    return response;
} 

export async function UPDATE(table: string, d: Object, condition: string) {
    /*
    table = tablename
    d = object as follows:
    {
        column_name: value,
        column_name: value,
        ...
    }
    condition = condition to be met for update in mySQL format
    */
    const query = `UPDATE ${table} SET ${Object.keys(d).map((key) => `${key} = '${d[key]}`).join("', ")}' WHERE ${condition}`
    const response = await db.$queryRawUnsafe(query);
    return response;
}