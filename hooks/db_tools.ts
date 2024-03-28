import { db } from "@/lib/db"

export async function DESC(table: string, full: boolean = false) {
    /*
    test example:
    const data = await dbtools.DESC("users");
    */


    const data = await db.$queryRawUnsafe(`DESC ${table}`);

    if (!full) {
        return data.map((d) => d.Field);
    }
    
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
    
    test example: 

    const d = 
    {
        testchar: "testADD",
        testint: 479,
        testfloat: 3.29,
        testdt: "2022-01-01 12:18:12",
        testjson: "{\"testADD\": \"did it work?\"}"
    }
    const data = await dbtools.ADD("test", d);
    
    */
    const query = `INSERT INTO ${table} (${Object.keys(d).join(", ")}) VALUES ('${Object.values(d).join("', '")}')`

    console.log("ADD QUERY: ", query)
    const response = await db.$queryRawUnsafe(query);
    return response;
}

export async function DELETE(table: string, condition: string) {
    /*
    table = tablename 
    condition = condition to be met for deletion in mySQL formmat
    
    example: 

    const data = await dbtools.DELETE("test", "testint = 479")
    
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
    
    example: 

    const d = 
    {
        testchar: "testUPDATE",
        testint: 14,
        testfloat: 3.29,
        testdt: "2022-01-01 12:18:12",
        testjson: "{\"testUPDATE\": \"did it work?\"}"
    }

    const data = await dbtools.UPDATE("test", d, "testint = 479")
    
    */
    const query = `UPDATE ${table} SET ${Object.keys(d).map((key) => `${key} = '${d[key]}`).join("', ")}' WHERE ${condition}`
    const response = await db.$queryRawUnsafe(query);
    return response;
}