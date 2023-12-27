import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';


const TableSelector = () => {
  const [tableNames, setTableNames] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    // Fetch table names from Flask backend when the component mounts

  }, []);

  const fetchTableNames = async () => {
    try {
        // setTableNames(["Table1", "Table2", "Table3","Table123", "Table2453", "Table3w","Tablewerwe1", "Tableadsa2", "Table325","Tabqwqle1", "Table2q423", "Tab423qdale3","Tab4232le1", "Tabasdadle2", "Table3","Table1", "Table2", "Table3","Table1", "Table2", "Table3","Table1", "Table2", "Table3"]);
      console.log('Fetching table names...');
      const response = await axios.get('http://127.0.0.1:5000/tables');
      console.log('Table names response:', response.data);
      setTableNames(response.data.tables || []);
    } catch (error) {
      console.error('Error fetching table names:', error);
    }
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTableClick = (table) => {
    setSelectedTables((prevSelectedTables) => {
       
      if (prevSelectedTables.includes(table)) {
        // If the table is already selected, remove it
        return prevSelectedTables.filter((selectedTable) => selectedTable !== table);
      } else {
        // If the table is not selected, add it
        return [...prevSelectedTables, table];

      }
      
    });
  };


  const handleConfirmTables = () => {
    // Replace this with the logic to send the selected tables to the backend
    console.log('Tables confirmed:', selectedTables);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
    <label className="label" onClick={handleToggleDropdown}>
      Select Tables
    </label>
    {isOpen && (
      <div className="dropdown-list">
{tableNames.map((table) => (
  <div key={table} className="table-item" onClick={() => handleTableClick(table)}>
    <input
      type="checkbox"
      checked={selectedTables.includes(table)} // Ensure selectedTables is defined
      onChange={() => {}}
      className="checkbox"
    />
    {table}
  </div>
))}

      </div>
    )}

    <button className="confirm-button" onClick={handleConfirmTables}>
      Confirm
    </button>
  </div>

  );
};

export default TableSelector;
