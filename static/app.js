var app = new Vue({
    el: '#v-app',
    data: {
        usernameInput: '',
        username: '',
        message: '',
        messages: [],
        socket: {
            chat: null,
            alerts: null
        }
    },
    methods: {
        sendChatMessage() {
            if (this.text === '' ) return;
            console.log(`sent: ${this.text}`);
            this.socket.chat.emit('chatToServer', this.text);
            this.text = '';
        },
        receiveChatMessage(msg) {
            console.log(`received: ${msg}`);
            this.messages.push(msg);
        },
        changeUsername() {
            this.username = this.usernameInput;
            this.usernameInput = '';
        }
    },
    created() { // Vue JS Hook

        this.username = prompt('Enter your username');

        this.messages.push({
            sender: this.username,
            message: `Session opened at ${new Date().toLocaleDateString()}`
        })

        this.socket.chat = io('http://localhost:3000/chat'); // create socket io client for chats
        this.socket.chat.on('chatToClient', (msg) => { // listener on messageToClient event
            this.receiveChatMessage(msg);
        });

        this.socket.alerts = io('http://localhost:3000/alerts'); // create socket io client for alerts
    }
});