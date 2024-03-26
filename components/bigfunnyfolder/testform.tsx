"use client";
import { AccountHeader } from "@/components/header"
import { AccountShell } from "@/components/shell"

import { handler } from "@/app/api/db/db_api"
import { useState, useEffect } from "react"

import * as dbtools from "@/hooks/db_tools"

export default function DBPage({propTables, propTablenames}) {
    // Now that tables is defined, you can proceed to define form_inputs
    const [tables, setTables] = useState([]);
    const [tablenames, setTablenames] = useState([]);

    useEffect(() => {
        setTables(propTables);
        setTablenames(propTablenames);
    }, [propTables, propTablenames]);

    console.log(tablenames)
    console.log(propTables[3][0])

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch("api endpoint", {
            //     method: "GET",
            // })
            // response has to be to the api endpoint 

            const response = await fetch("/api/db/db_api", {
                method: "GET",
            })

            const data = await response.json()
            console.log("API DATA: ", data)
        }

        fetchData()
    })

    

    return (
        <>
            <AccountShell>
                <AccountHeader heading="BIG FUNNYYYYYY" text="IT WORKSSSSSS!!!!!!!!!!!">
                </AccountHeader>
                    {tablenames.map((tablename, index) => (
                        <div key={index} className="flex flex-col divide-y divide-border overflow-x-scroll rounded-md border">
                            <h4 className="text-bold text-center uppercase">{tablename}</h4>
                            <table className="border border-zinc-900">
                                <thead>
                                    <tr>
                                        {tables[index][0] != undefined? Object.keys(tables[index][0]).map((key, idx) => (
                                            // Using the combination of key name and index as a unique key for <th>
                                            <th key={`header-${key}-${idx}`} className="text-bold border border-zinc-900 px-8 ">
                                                {key}
                                            </th>
                                        )): <th>NO DATA</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tables[index].map((user, userIndex) => (
                                        // Using userIndex as a unique key for each row might be okay,
                                        // but consider a more stable unique identifier if available
                                        <tr key={`row-${userIndex}`}>
                                            {Object.keys(user).map((key, index) => (
                                                // Using the combination of user index, key name, and index as a unique key for <td>
                                                <td key={`cell-${userIndex}-${key}-${index}`} className="border border-zinc-900 px-4">
                                                    {String(user[key])}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                            

                    <h4>ADD DATA</h4>
                    <form id="add_data">
                        <label htmlFor="table">Table</label>
                        <select name="table" id="table">
                            {tablenames.map((tablename, index) => (
                                <option key={index} value={tablename}>{tablename}</option>
                            ))}
                        </select>
                        <label htmlFor="data">Data</label>
                    </form>

                    <button onClick={() => (console.log("clicked"))}>Submit</button>


            </AccountShell>
            
        </>
    )
}