import React from 'react'

const App = () => {
  return (
    <div className='flex flex-row '>
      <button className='border rounded px-3 py-1 bg-green-600 text-white font-serif text-md'>Add Reconded</button>
      <table className='text-center'>
        <thead>
          <tr>
            <th className='border px-2 py-1 bg-gray-300 '>So. No</th>
            <th className='border px-2 py-1 bg-gray-300 '>Reg Number</th>
            <th className='border px-2 py-1 bg-gray-300 '>Name</th>
            <th className='border px-2 py-1 bg-gray-300 '>Course</th>
            <th className='border px-2 py-1 bg-gray-300 '>Department</th>
            <th className='border px-2 py-1 bg-gray-300 '>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border px-2 py-1'>1</td>
            <td className='border px-2 py-1'>101</td>
            <td className='border px-2 py-1'>PrakashS</td>
            <td className='border px-2 py-1'>M.sc</td>
            <td className='border px-2 py-1'>Computer Science</td>
            <td className='border px-2 py-1'>
              <button className='border px-2 py-1 mx-2 rounded  '>Edit</button>
              <button className='border px-2 py-1 mx-2 rounded  '>Delect</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App