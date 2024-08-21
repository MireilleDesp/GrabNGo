import "../Main.css";
import "./Table.css"; // Import the CSS file for styling

type Props = {
  config: any;
  data: any;
};

const Table = ({ config, data }: Props) => {
  const renderedRows = data.map((tableObject: any) => {
    return (
      <tr key={tableObject.id}>
        {config.map((val: any, idx: number) => {
          return (
            <td key={`${val.label}-${idx}`} className="p-3">
              {val.render(tableObject)}
            </td>
          );
        })}
      </tr>
    );
  });

  const renderedHeaders = config.map((config: any, idx: number) => {
    return (
      <th
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        key={idx}
      >
        {config.label}
      </th>
    );
  });

  return (
    <div className="sideMargin bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="table-container">
        <table className="min-w-full divide-y divide-gray-200 m-5">
          <thead className="bg-gray-50">
            <tr>{renderedHeaders}</tr>
          </thead>
          <tbody>{renderedRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
