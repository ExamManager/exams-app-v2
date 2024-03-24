// imports
import { AccountHeader } from "@/components/header"
import { AccountShell } from "@/components/shell"


// funcs

export default async function DBPage() {
    return (
        <>
            <AccountShell>
                <AccountHeader heading="Exams" text="Create and manage exams.">
                </AccountHeader>
                <div className="hidden flex-col md:flex divide-y divide-border rounded-md border">
                {tables.map((table, idx) => (
                    <table id={idx}>
                        table.rows.map((row, idx) => (
                            <tr id={idx}>
                                row.map((cell, idx) => (
                                    <td id={idx}>
                                        {cell}
                                    </td>
                                ))
                            </tr>
                        ))
                    </table>
                ))}
                </div>
            </AccountShell>
            
        </>
    )
}