$(document).ready(function() {
    const chatInput = $(".chat-input textarea");
    const sendChatBtn = $(".chat-input span");
    const chatbox = $(".chatbox");
    const chatbotToggler = $('.chatbot-toggler');
    const closeChat = $('.close-btn');
   

    let userMessage;
    const API_KEY = "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";
   
    //WlulfAK8FNohdu1mY5D6T3BlbkFJGBnJvMBFLbZt4uru1ttM
    const createChatLi = (message, className) => {
        const chatLi = $("<li>").addClass("chat " + className);

        let chatContent;
        if (className === "outgoing") 
        {
            chatContent = `<p></p>`;
        } else {
            chatContent = `<span class="material-symbols-outlined"><img src="https://sarfarazsingh.in/chatbot/logo.jpg" alt="" height="33px" width="33px"></span><p></p>`;
        }
        chatLi.html(chatContent);
        chatLi.find("p").text(message);
        return chatLi;
    }

    const generateResponse = (userMessage) => {
        console.log(userMessage);
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const messageElement = $(userMessage).find("p");
      
 
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            data: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{ role: "user", content: userMessage }]
            })
        }
    
        return $.ajax({
            url: API_URL,
            type: "POST",
            headers: requestOptions.headers,
            data: requestOptions.data,
            dataType: "json"
        })
        .then(data => {
          
            return data.choices[0].message.content;
           
        })
        .fail(function() {
            "Oops! Something went wrong. Please try again.";
        })
        .always(function() {
            // Any code you want to execute in the 'finally' block
        });
    }
    
    
    

    const handleChat = () => {
       
        userMessage = chatInput.val().trim();
        if (!userMessage) return;

        chatInput.val(""); 

        // Add user message to the chatbox
        chatbox.append(createChatLi(userMessage, "outgoing"));
     

        const messages = [
            "Generating response...",
            "Let me think...",
        ];


        
        // Shuffle the messages
        const shuffledMessages = messages.sort(() => Math.random() - 0.5);
        
        // Select the first message from the shuffled array
        const selectedMessage = shuffledMessages[0];
        setTimeout(() => {
            // Display "Thinking..."
            const incomingChatLi = createChatLi(selectedMessage, "incoming");
            chatbox.append(incomingChatLi);
            


            generateResponse(userMessage)
                .then(response => {
                    // Update the message content
                    incomingChatLi.find("p").text(response);
                });
        }, 600);
    }

   
    sendChatBtn.on("click", handleChat);
    closeChat.on('click', () => $('body').remove('show-chatbot'));
    chatbotToggler.on('click', () => $('body').toggleClass('show-chatbot'));
});
