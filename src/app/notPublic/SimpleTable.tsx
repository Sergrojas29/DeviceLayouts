const SimpleTable = ({ headers, rows }) => {
  // Basic styles for a clean look
  const styles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'sans-serif',
      boxShadow: '0 2px 3px rgba(0,0,0,0.1)',
    },
    th: {
      backgroundColor: '#9a2828',
      border: '1px solid #ddd',
      padding: '12px',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    td: {
      border: '1px solid #ddd',
      padding: '12px',
      textAlign: 'left',
    },
    tr: {
      '&:nth-child(even)': {
        backgroundColor: '#f9f9f9',
      },
    }
  };

  // Render a message if no data is provided
  if (!headers || headers.length === 0 || !rows || rows.length === 0) {
    return <p>No data available to display.</p>;
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} style={styles.th}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} style={styles.tr}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} style={styles.td}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimpleTable;