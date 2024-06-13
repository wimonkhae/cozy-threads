"use client";

import React from 'react';

const Table = ({ data, columns }) => {

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data to display.</div>;
  }

  if (!Array.isArray(columns) || columns.length === 0) {
    return <div>No columns defined.</div>;
  }

  return (
    <div className="overflow-x-auto"> 
      <table className="w-full table-auto rounded-lg overflow-hidden shadow-md border border-gray-300 sm:table">
        <thead>
          <tr className="bg_color text-white text-center">
          <th className="px-4 py-3 text-center sm:table-cell block">#</th>
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-3 sm:table-cell block">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border sm:table-row block ${
                rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <td className="px-4 py-3 text-center sm:table-cell block">{rowIndex + 1}</td>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className="px-4 py-3 text-center sm:table-cell block">
                  {/* {column.accessor ? row[column.accessor] : ''} */}
                  {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;