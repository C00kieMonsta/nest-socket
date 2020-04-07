// creating Vue component
Vue.component('alerts-component', VueSimpleNotify.VueSimpleNotify);

// Vue app instance
var app = new Vue({
    el: '#v-app',
    data: {
        usernameInput: '',
        username: '',
        message: '',
        messages: [],
        alerts: [],
        socket: {
            chat: null,
            alerts: null
        }
    },
    methods: {
        sendChatMessage() {
            if (this.message === '' ) return;
            console.log(`sent: ${this.message}`);
            this.socket.chat.emit('chatToServer', { sender: this.username, message: this.message });
            this.message = '';
        },
        receiveChatMessage(msg) {
            console.log(`received: ${msg}`);
            this.messages.push(msg);
        },
        receiveAlertMessage(msg) {
            this.alerts.push(msg);
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
        this.socket.chat.on('chatToClient', (msg) => { // listener on chatToClient event
            this.receiveChatMessage(msg);
        });

        this.socket.alerts = io('http://localhost:3000/alert'); // create socket io client for alerts
        this.socket.alerts.on('alertToClient', (msg) => { // listener on alertToClient event
            this.receiveAlertMessage(msg);
        });
    }
});