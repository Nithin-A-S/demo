import logo from './logo.svg';
import './App.css';
import './normal.css';
import { useState } from 'react';
import Tables from './components/Tables';
import ChatInterface from './components/ChatInterface';
import settings from'/Users/nithin/Desktop/NLPusecase/querygpt/gptfront/src/settings.png'
import profile from '/Users/nithin/Desktop/NLPusecase/querygpt/gptfront/src/profile.png'
function App() {
 const[input,setInput]=useState("")
 const[chatLog,setChatlog]=useState([{
  user :"gpt",
  message:"how caan i help u"
},{
  user :"me",
  message:"i want to use gpt"
}]);

  async function handelSubmit(e){
    e.preventDefault();
    setChatlog([...chatLog,{user:"me",message:'${input}'}])
    setInput("")
    const response=await fetch("https://loacalhost:3000",{
      method:"POST",
      headers:{
        "content-Type":"applications/json"
      },
      body:JSON.stringify({
        message:chatLog.map((message)=>message.message).join("")
      })

    })
    const data=await response.json();
    console.log(data)
  }



  return (
    <div className="App">
    <aside className="sidemenu">
        <div  className="header">
         Querygpt
        </div>
        <div className="side-menu-button">
          <span>+</span>
          new chat
        </div>
        <div  className="chathistory1">
         chathistory1
        </div>
        <div  className="chathistory2">
         chathistory2
        </div>
        <div  className="profile">
        <img src={profile} alt="profile" className="profile-pic" />
         Profile
       
        </div>
        <div  className="settings">
        <img src={settings} alt="settings" className="settings-pic" />
         Settings
        </div>
 
      </aside>
      <section className="chatbox">
      <ChatInterface/>
     
      </section>
      
    </div>
  );
}
const ChatMessage=({message})=>{
  return(
    <div className={'chat-message ${message.user=="gpt"&& "chatgpt"}'}>
    <div className="chat-message-center">
    <div className={'avatar ${message.user=="gpt"&& "chatgpt"}'}>

    </div>
     <div className="message">
      {message.message}</div>
    </div>
   </div>
  )
}
export default App;
// import logo from './logo.svg';
// import './App.css';
// import './normal.css';
// import { useState, useEffect } from 'react';

// function App() {
//   const [input, setInput] = useState('');
//   const [chatLog, setChatLog] = useState([
//     {
//       user: 'gpt',
//       message: 'how can I help you',
//     },
//     {
//       user: 'me',
//       message: 'I want to use GPT',
//     },
//   ]);

//   const [tables, setTables] = useState([]); // New state for storing table names
//   const [selectedTables, setSelectedTables] = useState([]);

//   useEffect(() => {
//     // Fetch table names from the backend (replace with your actual endpoint)
//     fetch("http://127.0.0.1:5000/tables")
//       .then(response => response.json())
//       .then(data => setTables(data))
//       .catch(error => console.error('Error fetching tables:', error));
//   }, []);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setChatLog([...chatLog, { user: 'me', message: input }]);
//     setInput('');

//     // Send selected tables to the backend (replace with your actual endpoint)
//     const response = await fetch('https://your-backend-api.com/process', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         message: chatLog.map((message) => message.message).join(''),
//         selectedTables: selectedTables,
//       }),
//     });

//     const data = await response.json();
//     console.log(data);
//   }

//   return (
//     <div className="App">
//       <aside className="sidemenu">
//         <div className="side-menu-button">
//           <span>+</span> new chat
//         </div>
//         <div className="tables-checkboxes">
//           <p>Select Tables:</p>
//           {tables.map((table, index) => (
//             <div key={index}>
//               <input
//                 type="checkbox"
//                 id={`table-${index}`}
//                 checked={selectedTables.includes(table)}
//                 onChange={() => handleTableChange(table)}
//               />
//               <label htmlFor={`table-${index}`}>{table}</label>
//             </div>
//           ))}
//         </div>
//         <div className="profile-settings-buttons">
//           <button onClick={handleProfileClick}>Profile</button>
//           <button onClick={handleSettingsClick}>Settings</button>
//         </div>
//       </aside>
//       <section className="chatbox">
//         <div className="chat-log">
//           {chatLog.map((message, index) => (
//             <ChatMessage key={index} message={message} />
//           ))}
//         </div>
//         <div className="chat-input-holder">
//           <form onSubmit={handleSubmit}>
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="chat-input-textarea"
//               rows="1"
//             ></input>
//           </form>
//         </div>
//       </section>
//     </div>
//   );

//   function handleTableChange(tableName) {
//     if (selectedTables.includes(tableName)) {
//       setSelectedTables(selectedTables.filter((table) => table !== tableName));
//     } else {
//       setSelectedTables([...selectedTables, tableName]);
//     }
//   }

//   function handleProfileClick() {
//     // Handle profile button click
//     console.log('Profile button clicked');
//   }

//   function handleSettingsClick() {
//     // Handle settings button click
//     console.log('Settings button clicked');
//   }
// }

// const ChatMessage = ({ message }) => {
//   return (
//     <div className={`chat-message ${message.user === 'gpt' && 'chatgpt'}`}>
//       <div className="chat-message-center">
//         <div className={`avatar ${message.user === 'gpt' && 'chatgpt'}`}></div>
//         <div className="message">{message.message}</div>
//       </div>
//     </div>
//   );
// };

// export default App;
