// imports
import { AccountHeader } from "@/components/header"
import { AccountShell } from "@/components/shell"

import { db } from "@/lib/db"
import DBPage from "@/components/bigfunnyfolder/testform"
// funcs

console.log('new test')

export default async function newPagePleaseWork() {
    var loading = true;

    const data = await db.user.findMany();
    // var form_inputs = await Object.keys(tables[tablenames[0]])
    const hopefully : Object = await db.$queryRaw`SHOW TABLES`;
    var tablenames: Array<string> = [];
    var tables = [];

    for (var i in hopefully) {
        tablenames.push(hopefully[i].Tables_in_exammanager);
    }

    console.log(tablenames);

    loading = false;

    // Use map to create an array of promises
    const tableQueries = tablenames.map(async (tablename) => {
        const query = `SELECT * FROM ${tablename}`;
        console.log("query: ", query);
        const tmp_data = await db.$queryRawUnsafe(query);
        console.log("tmp_data: ", tmp_data);
        return tmp_data; // Return the data to be included in the promise array
    });

    // Wait for all promises to resolve
    var tables = await Promise.all(tableQueries);

    console.log("TABLESSSSSS: ", tables); // Now, tables should contain all the data.

    return (
        <>
            { loading ? <h1>Loading...</h1> :
                <DBPage propTables={tables} propTablenames={tablenames} />
            
            }
            
            
        </>
    )
}


export async function funny() {
    // Fetch tablenames from the database
    const hopefully = await db.$queryRaw`SHOW TABLES`;
    var tablenames = [];

    for (var i in hopefully) {
        tablenames.push(hopefully[i].Tables_in_exammanager);
    }

    // Fetch data for all tables
    const tableQueries = tablenames.map(async (tablename) => {
        const query = `SELECT * FROM ${tablename}`;
        const tmp_data = await db.$queryRawUnsafe(query);
        return tmp_data; // Return the data to be included in the promise array
    });

    // Wait for all promises to resolve
    var tables = await Promise.all(tableQueries);

    // Return the fetched data as props
    return {
        props: {
            tablenames,
            tables
        }
    };
}