"use client";

const Table = ({ data, columns }) => {

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data to display.</div>;
  }

  if (!Array.isArray(columns) || columns.length === 0) {
    return <div>No columns defined.</div>;
  }

  const renderCell = (column, row) => {

    if (column.accessor === 'status') {
      // Check if the status is set correctly, and set it if not
      if (!row.status) {
        const latestCharge = row.latest_charge;
        let chargeStatus = "unknown";
        let isRefunded = false;

        if (latestCharge) {
          chargeStatus = latestCharge.status;
          isRefunded = latestCharge.refunded;
        }

        if (isRefunded) {
          row.status = "refunded";
        } else {
          row.status = chargeStatus;
        }
      }
    }

    return column.render ? column.render(row[column.accessor], row) : row[column.accessor];
  };

  return (
    <>
    {/* Desktop view */}
    <section className="py-10 px-14 max-w-[100%] text-center mb-2 hidden md:block">

    <div className="overflow-x-auto"> 
      <table className="w-full table-auto rounded-lg overflow-hidden shadow-md border border-gray-300 sm:table">
        <thead>
          <tr className="bg_color text-white text-center sm:table-row block">
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
    </section>

    {/* Mobile View */}
    <section className="py-10 px-4 text-center mx-auto block md:hidden">

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 text-sm">
      {data.map((row) => (
        <div
          key={row.id}
          className="border-t-2 border-gray-100 shadow-md rounded-md p-4"
        >
          {columns.map((column, index) => (
            <div
              key={index}
              className="flex justify-between item-center mb-2"
            >
              <span className="font-bold">{column.label}</span>
              <div className={column.align === 'right' ? 'text-end' : ''}>
                {/* {column.render ? column.render(row[column.accessor]) : row[column.accessor]} */}
                {renderCell(column, row)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    </section>
    </>
  );
};

export default Table;