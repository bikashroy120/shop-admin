import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component';

const Table = ({columns,data}) => {

    createTheme('solarized', {
        text: {
          primary: 'gray',
          secondary: 'gray',
        },
        background: {
          default: 'transparent',
        },
        context: {
          background: "rgb(243 244 246/1)",
          text: 'black',
        },
        divider: {
          default: 'rgb(229 231 235 /1)',
          height:"1px"
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      }, 'dark');

      const customStyles = {
        rows: {
            style: {
                minHeight: '52px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '20px', // override the cell padding for head cells
                paddingRight: '20px',
                fontSize:"18px",
                background:"rgb(243 244 246/1)",
                fontWeight: "bold", // add bold font weight if desired
                width: 'auto', // ensure auto width, can be customized if needed
            },
        },
        cells: {
            style: {
                padding:"10px 20px ",
                paddingLeft: '20px', // override the cell padding for data cells
                paddingRight: '20px',
                fontWeight: "medium",
                fontSize:"18px",
                
            },
        },
    };

  return (
    <div className=''>
        <DataTable
            columns={columns}
            data={data && data}
            theme="solarized"
            customStyles={customStyles}
        />
    </div>
  )
}

export default Table