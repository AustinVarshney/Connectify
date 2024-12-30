import React, {useEffect} from 'react'
import './Body.css'
import {Link} from 'react-router-dom'
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import botImg from '../../assets/botImg.jpg';
import clientImg from '../../assets/clientAvatar.png'

const Body = () => {
  useEffect(() => {
    addResponseMessage('Welcome to this **awesome** chat!');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    const response = 'It is working!';
    addResponseMessage(response);
  };

  return (
    <div className='outerHomeBody1'>
        <div className='innerHomeBody1'>
            <p>Join as Guest</p>
            <Link><button>Join</button></Link>
        </div>
        <div className='innerHomeBody2'>
            <Widget handleNewUserMessage={handleNewUserMessage}
            profileAvatar={botImg} 
            title="Hey Connector!" 
            subtitle="You can ask us anything!"
            senderPlaceHolder="Ask me.."
            profileClientAvatar={clientImg}
            />
        </div>
    </div>
  )
}

export default Body
