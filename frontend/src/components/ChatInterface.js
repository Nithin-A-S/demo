// frontend/src/components/ChatInterface.js
import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import '/Users/nithin/Desktop/NLPusecase/querygpt/gptfront/src/components/style.css'; // Import the CSS file
import userProfilePicUrl from '/Users/nithin/Desktop/NLPusecase/querygpt/gptfront/src/user-profile-pic.png'
import systemProfilePicUrl from '/Users/nithin/Desktop/NLPusecase/querygpt/gptfront/src/system-profile-pic.png';

const ChatInterface = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [userPrompt, setUserPrompt] = useState('');
  const [isPromptMode, setIsPromptMode] = useState(false);
  const [isexecuteMode, setIsexecutetMode] = useState(false);
  
  const chatContainerRef = useRef(null);
  useEffect(() => {
    // Fetch available tables on component mount
    fetchAvailableTables();
  }, []);
  useEffect(() => {
    // Scroll to the bottom when chatHistory changes
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    // Scroll the chat container to the bottom
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const fetchAvailableTables = async () => {
    try {

      const response = await axios.get('http://127.0.0.1:5000/tables');
      console.log(response);
      setAvailableTables(response.data);
      console.log(availableTables);
    } catch (error) {
      console.error("Error fetching tables:", error);
      // setAvailableTables([]); // Optionally set an empty array or another default value
    }
  };

  const handleWelcomeButtonClick = () => {
    // Display welcome message and "Get Started" button
     console.log(availableTables);
    const columnsPerRow = 3;

    // Group tables into rows with the specified number of columns
    const tableRows = [];
    for (let i = 0; i < availableTables.length; i += columnsPerRow) {
      const row = availableTables.slice(i, i + columnsPerRow);
      tableRows.push(row);
    }

    setChatHistory([
      
      ...chatHistory,
      { role: 'bot', message: 'Welcome! To get started, please select tables.' },
      { role: 'bot', message: 'Available tables:' },
      {
        role: 'bot',
        message: (
          <div className="table-list">
            {tableRows.map((row, rowIndex) => (
              <div key={rowIndex} className="table-row">
                {row.map((table) => (
                  <div key={table} className="table-selection-container">
                    <input
                      type="checkbox"
                      id={table}
                      value={table}
                      onChange={() => handleCheckboxChange(table)}
                      className="table-item"
                    />
                    <label htmlFor={table}>{table}</label>
                  </div>
                ))}
              </div>
            ))}
            <button onClick={handleSelectTables} className="select-button">Select</button>
          </div>
        ),
      },
    ]);
  };
  

  const handleCheckboxChange = (table) => {
    // Update the selectedTables state based on the checkbox change
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

  const handleSelectTables = async () => {
    // Check if tables are selected
    console.log("Selected Tablesfront:", selectedTables);
    if (selectedTables.length > 0) {
      // Send selected tables to backend API
      try {
        
        const response = await axios.post('http://127.0.0.1:5000/process', { selectedTables });
        setChatHistory([
          ...chatHistory,
          {
            role: 'bot',
            message: (
              <div className="bot-message">
                <img src={systemProfilePicUrl} alt="System Profile" className="profile-pic" />
                Selected tables:
                <pre>{selectedTables.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
</pre>
              </div>
              
            ),
          },
        ]);
        setIsPromptMode(true);
      } catch (error) {
        console.error('Error sending selected tables:', error);
      }
    } else {
      // Inform the user to select tables
      setChatHistory([
        ...chatHistory,
        
      ]);
    }
  };

 
  const handleSelectButtonClick = async () => {

    if (isPromptMode) {
      // Send user prompt to backend
      console.log(inputMessage);
      setUserPrompt(inputMessage)
      try {
        const response = await axios.post('http://127.0.0.1:5000/nlpquery', { userPrompt });
        console.log(userPrompt);
        setChatHistory([
          ...chatHistory,
          {
            role: 'bot',
            message: (
              setIsexecutetMode(true),
             
              <div className="bot-message">
                <img src={systemProfilePicUrl} alt="System Profile" className="profile-pic" />
                Your NlP Query 
                <pre>{response.data}</pre>
                
              </div>

            ),
          },
        ]);
      } catch (error) {
        console.error('Error sending user prompt:', error);
      }
    } else {
      // Handle other actions if needed
    }
  };

  const handleUserMessageSubmit = async (e) => {
    e.preventDefault();
    if (isPromptMode) {
      setUserPrompt(inputMessage);
    }
    setChatHistory([
      ...chatHistory,
      {
        role: 'user',
        message: (
          <div className="user-message">
             {inputMessage}
            <img src={userProfilePicUrl} alt="User Profile" className="profile-pic" />
           
          </div>
        ),
      },
    ]);
    setInputMessage('');
  };

  const handleViewTableButtonClick = async () => {
    try {
      // Make a GET request to fetch table values from Flask API
      const response = await axios.get('http://127.0.0.1:5000/displaytables');
  
      // Display the table values in the chat history
      setChatHistory([
        ...chatHistory,
        {
          role: 'bot',
          message: (
            <div className="bot-message">
              <img src={systemProfilePicUrl} alt="System Profile" className="profile-pic" />
              Table Values:
              <table>
                <thead>
                  <tr>
                    <th>MANDT</th>
                    <th>VBELN</th>
                    <th>POSNR</th>

                    <th>MATKL</th>
                    <th>ARKTX</th>
                    <th>PSTYV</th>
                    <th>FKREL</th>
                    <th>UEPOS</th>
                    <th>GRPOS</th>
                    <th>ZIEME</th>
                    <th>MEINS</th>
                  </tr>
                </thead>
                <tbody>
                  {response.data.tables.map((row) => (
                    <tr key={row.VBELN}>
                      <td>{row.MANDT}</td>
                      <td>{row.VBELN}</td>
                      <td>{row.POSNR}</td>

                      <td>{row.MATKL}</td>
                      <td>{row.ARKTX}</td>
                      <td>{row.PSTYV}</td>
                      <td>{row.FKREL}</td>
                      <td>{row.UEPOS}</td>
                      <td>{row.GRPOS}</td>
                      <td>{row.ZIEME}</td>
                      <td>{row.MEINS}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
      ]);
    } catch (error) {
      console.error('Error fetching table values:', error);
    }
  };
  return (
    <div className="chat-interface">
      <div className="chat-history" ref={chatContainerRef}>
        {chatHistory.map((chat, index) => (
          <div key={index} className={chat.role}>
            {chat.message}
          </div>
        ))}
      </div>
      <div className="container">
      {selectedTables.length > 0 && (
        <div className="selected-tables">
          Selected Tables: {selectedTables.join(', ')}
        </div>
      )}
      <form onSubmit={handleUserMessageSubmit} className="user-input">
        <input
          type="text"
          placeholder={isPromptMode ? 'Enter your prompt...' : 'Type your message...'}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      
      <div className="action-buttons">
        <button onClick={handleWelcomeButtonClick}>Get Started</button>
        {isPromptMode && (
        
          <button className="system-execute-button" onClick={handleSelectButtonClick}>
            Execute
          </button>

        )}
        
        {isexecuteMode && (
        
        <button onClick={handleViewTableButtonClick} className="view-table-button">
        View Table
      </button>

        )}


        </div>
      </div>

    </div>
  );
};

export default ChatInterface;
