import './ChatButtons.css';
import chatBot from '../../assets/img/chatBot.svg';
import whatsapp from '../../assets/img/whatsapp.svg';

function ChatButtons(){
    
    return(<>
    <div className='containerButton'>
        <div className='ChatBotButton'>
            <img src= {chatBot}/>
        </div>
        <div className='WhatsappButtonMobile'>
            <img src= {whatsapp}/>
        </div>        
    </div>

    </>);
}

export default ChatButtons;