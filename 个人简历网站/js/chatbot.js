class Chatbot {
    constructor() {
        this.apiKey = ''; 
        this.apiEndpoint = '';
        this.messages = [];
        this.init();
    }

    init() {
        
        this.createChatInterface();
        
        this.addEventListeners();
        
        this.addBotMessage('你好！我是DeepSeek AI助手，有什么我可以帮你的吗？');
    }

    createChatInterface() {
        
        const button = document.createElement('div');
        button.className = 'chatbot-button';
        button.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
        `;

        
        const window = document.createElement('div');
        window.className = 'chatbot-window';
        window.innerHTML = `
            <div class="chatbot-header">
                <h3>DeepSeek AI助手</h3>
                <button class="chatbot-close">×</button>
            </div>
            <div class="chatbot-messages"></div>
            <div class="chatbot-input">
                <input type="text" placeholder="输入消息...">
                <button>发送</button>
            </div>
        `;

        
        const container = document.createElement('div');
        container.className = 'chatbot-container';
        container.appendChild(button);
        container.appendChild(window);

        document.body.appendChild(container);

        
        this.button = button;
        this.window = window;
        this.messagesContainer = window.querySelector('.chatbot-messages');
        this.input = window.querySelector('input');
        this.sendButton = window.querySelector('button');
    }

    addEventListeners() {
        
        this.button.addEventListener('click', () => {
            this.window.classList.toggle('active');
        });

        this.window.querySelector('.chatbot-close').addEventListener('click', () => {
            this.window.classList.remove('active');
        });

        
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        
        this.addUserMessage(message);
        this.input.value = '';

        try {
            
            const response = await this.callDeepSeek(message);
            
            this.addBotMessage(response);
        } catch (error) {
            console.error('Error:', error);
            this.addBotMessage('抱歉，我遇到了一些问题，请稍后再试。');
        }
    }

    async callDeepSeek(message) {
        
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-v3-250324",
                messages: [
                    ...this.messages,
                    { role: "user", content: message }
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            throw new Error('API请求失败');
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        
        this.messages.push(
            { role: "user", content: message },
            { role: "assistant", content: aiResponse }
        );

        return aiResponse;
    }

    addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user';
        messageElement.textContent = message;
        this.messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot';
        messageElement.textContent = message;
        this.messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
}); 