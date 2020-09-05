import React from 'react'

import './table.css'

function Table({ countries }) {
  return (
    <div className='table'>
      <table>
        <tbody>
          {countries.map(({ country, cases }) => (
            <tr key={`${country}-${cases}`}>
              <td>{country}</td>
              <td>
                <strong>{cases}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table
