import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component';

const Table = ({columns,data}) => {

    createTheme('solarized', {
        text: {
          primary: '#ffffff',
          secondary: '#fff',
        },
        background: {
          default: 'transparent',
        },
        context: {
          background: '#cb4b16',
          text: '#FFFFFF',
        },
        divider: {
          default: '#808191',
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
            },
        },
        cells: {
            style: {
                padding:"10px 20px ",
                paddingLeft: '20px', // override the cell padding for data cells
                paddingRight: '20px',
                fontSize:"16px",
                
            },
        },
    };

  return (
    <div className=' bg-primary text-white rounded-lg overflow-hidden border border-[#808191]'>
        <DataTable
            columns={columns}
            data={data && data}
            theme="solarized"
            customStyles={customStyles}
            pagination
        />
    </div>
  )
}

export default Table