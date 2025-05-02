import { TableProps } from '../../src/app/types/ui';
import React from 'react'

function Table<T>({ data, columns, loading = false, noDataText = "No data found" }: TableProps<T>) {
    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <table className="w-full mt-6 border border-gray-300 text-sm">
            <thead className="bg-gray-200 dark:bg-[#1f1f1f] uppercase">
                <tr>
                    {columns.map((col, idx) => (
                        <th key={idx} className="px-4 py-2 text-center">{col.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((item, i) => (
                    <tr key={i} className="border-t text-center">
                        {columns.map((col, j) => (
                            <td key={j} className="px-4 py-3">
                                {col.render ? col.render(item) : (item as any)[col.key]}
                            </td>
                        ))}
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={columns.length} className="py-6 text-center">{noDataText}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Table;
