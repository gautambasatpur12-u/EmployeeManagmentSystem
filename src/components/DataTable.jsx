export default function DataTable({ headers, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.length ? rows.map((row, i) =>
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ) : <tr><td colSpan={headers.length} className="muted">No records found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
