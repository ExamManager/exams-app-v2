"use client";
import { AccountHeader } from "@/components/header"
import { AccountShell } from "@/components/shell"

import { useState, useEffect, use } from "react"

export function Table({data, name}) {
    return (
            <>
            <div className="flex flex-col divide-y divide-border overflow-x-auto rounded-md border ">
                <div className="flex flex-row justify-start">
                    <h4 className="text-bold mr-12 text-center uppercase ">{name}</h4>
                    <button className="rounded-md border bg-gray-600 px-2">EDIT</button>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            {data[0] != undefined? Object.keys(data[0]).map((key, idx) => (
                                // Using the combination of key name and index as a unique key for <th>
                                <th key={`header-${key}-${idx}`} className="text-bold border border-zinc-900 px-8 ">
                                    {key}
                                </th>
                            )): <th>NO DATA</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, userIndex) => (
                            // Using userIndex as a unique key for each row might be okay,
                            // but consider a more stable unique identifier if available
                            <tr key={`row-${userIndex}`}>
                                {Object.keys(user).map((key, index) => (
                                    // Using the combination of user index, key name, and index as a unique key for <td>
                                    <td key={`cell-${userIndex}-${key}-${index}`} className="border border-zinc-900 px-4">
                                        <div contentEditable={false}>{String(user[key])}</div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </>
    )

}

export default function DBPage({propTables, propTablenames}) {
    // Now that tables is defined, you can proceed to define form_inputs
    const [tables, setTables] = useState([]);
    const [tablenames, setTablenames] = useState([]);

    useEffect(() => {
        setTables(propTables);
        setTablenames(propTablenames);
    }, [propTables, propTablenames]);

    // useEffect(() => {
    //     const testfunc = async () => {
    //         const data = await fetch("/api/database")
    //         console.log(await data.json())
    //     }
    //     testfunc()
    // }, [])
    
    // console.log(tables)
    

    var changelog = []
    
    const [selectedTable, setSelectedTable] = useState([tables[3]]);
    const [selectedName, setSelectedName] = useState(tablenames[3]);

    function formSelectionHandler(e) {
        const selected_table: String = e.target.value
        const selected_index = tablenames.indexOf(selected_table)

        console.log("SELECTED DATA = ", tables[selected_index])
        setSelectedTable(tables[selected_index])
        setSelectedName(selected_table)
    }

    function editClicked(tableIndex) {
        console.log("EDIT CLICKED for table: ", tablenames[tableIndex])
    }
    

    return (
        <>
            <AccountShell>
                <AccountHeader heading="BIG FUNNYYYYYY" text="IT WORKSSSSSS!!!!!!!!!!!">
                </AccountHeader>
                    {tablenames.map((tablename, index) => (
                        <div key={index} className="flex flex-col divide-y divide-border overflow-x-auto rounded-md border ">
                            <div className="flex flex-row justify-start">
                                <h4 className="text-bold mr-12 text-center uppercase ">{tablename}</h4>
                                <button key={index} className="rounded-md border bg-gray-600 px-2" onClick={()=>{editClicked(index)}}>EDIT</button>
                            </div>
                            
                            <table>
                                <thead>
                                    <tr>
                                        {tables[index][0] ? Object.keys(tables[index][0]).map((key, idx) => (
                                            // Using the combination of key name and index as a unique key for <th>
                                            <th key={`header-${key}-${idx}`} className="text-bold border border-zinc-900 px-8 ">
                                                {key}
                                            </th>
                                        )): <th>NO DATA</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tables[index][0] ? tables[index].map((user, userIndex) => (
                                        // Using userIndex as a unique key for each row might be okay,
                                        // but consider a more stable unique identifier if available
                                        <tr key={`row-${userIndex}`}>
                                            {Object.keys(user).map((key, index) => (
                                                // Using the combination of user index, key name, and index as a unique key for <td>
                                                <td key={`cell-${userIndex}-${key}-${index}`} className="border border-zinc-900 px-4">
                                                    <div contentEditable={false}>{String(user[key])}</div>
                                                </td>
                                            ))}
                                        </tr>
                                    )) : <tr><td>NO DATA</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    ))}
                            

                    <h4>ADD DATA</h4>
                    <form id="add_data">
                        <label htmlFor="table">Table</label>
                        <select name="table" id="table" onChange={formSelectionHandler}>
                            {tablenames.map((tablename, index) => (
                                <option key={index} value={tablename}>{tablename}</option>
                            ))}
                        </select>
                        <label htmlFor="data">Data</label>
                    </form>
                    { selectedTable[0] ?
                    
                    <div className="flex flex-col divide-y divide-border overflow-x-scroll rounded-md border">
                        <h4 className="text-bold text-center uppercase">{selectedName}</h4>
                        <table className="border border-zinc-900">
                            <thead>
                                <tr>
                                    {selectedTable[0] ? Object.keys(selectedTable[0]).map((key, idx) => (
                                        // Using the combination of key name and index as a unique key for <th>
                                        <th key={`header-${key}-${idx}`} className="text-bold border border-zinc-900 px-8 ">
                                            {key}
                                        </th>
                                    )): <th>NO DATA</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {selectedTable.map((user, userIndex) => (
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
                    : <p>No data</p>}

                    {/* {
                        selectedTable[0] ? 
                        <Table data={selectedTable} />
                        : <p>No data</p>
                    } */}

                    <div>
                        <p>{JSON.stringify(selectedTable[0])}</p>
                    </div>


                    <button onClick={() => (console.log("clicked"))}>Submit</button>

                    <div className="size-full overflow-scroll">
                    <iframe src="http://localhost:5555" scrolling="true" className="w-full overflow-hidden"/>
                    </div>

            </AccountShell>
            
            
        </>
    )
}