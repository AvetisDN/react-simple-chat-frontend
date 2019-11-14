window.onload = () => {
   const  chatMessages = document.getElementById('chat-messages');
   const  chatMessagesContainer = document.getElementById('chat-messages-container');
   if(chatMessagesContainer.clientHeight > chatMessages.clientHeight) {
       chatMessages.scrollTo(0, chatMessagesContainer.clientHeight - chatMessages.clientHeight + 30);
   }
};
