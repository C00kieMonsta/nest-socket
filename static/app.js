// creating Vue component
Vue.component('alerts-component', VueSimpleNotify.VueSimpleNotify);

// Vue app instance
var app = new Vue({
    el: '#v-app',
    data: {
        usernameInput: '',
        username: '',
        message: '',
        messages: {
            general: [],
            funnyThings: []
        },
        alerts: [],
        activeRoom: 'general',
        rooms: {
            general: false,
            funnyThings: false,
        },
        socket: {
            chat: null,
            alerts: null
        }
    },
    methods: {

        sendChatMessage() {
            if (this.message === '' ) return;
            if (this.isMemberOfActiveRoom) {
                this.socket.chat.emit('chatToServer', { sender: this.username, room: this.activeRoom, message: this.message });
                this.message = "";
            } else {
                alert('You must join the room before sending messages!');
            }
        },
        receiveChatMessage(msg) {
            this.messages[msg.room].push(msg);
        },
        receiveAlertMessage(msg) {
            this.alerts.push(msg);
        },
        changeUsername() {
            this.username = this.usernameInput;
            this.usernameInput = '';
        },
        toggleRoomMembership() {
            if (this.isMemberOfActiveRoom) {
                this.socket.chat.emit('leaveRoom', this.activeRoom);
            } else {
                this.socket.chat.emit('joinRoom', this.activeRoom);
            }
        }
    },
    computed: {
        isMemberOfActiveRoom() {
            return this.rooms[this.activeRoom];
        }
    },
    created() { // Vue JS Hook

        this.username = prompt('Enter your username');

        this.socket.chat = io('http://localhost:3000/chat'); // create socket io client for chats
        this.socket.chat.on('chatToClient', (msg) => { // listener on chatToClient event
            this.receiveChatMessage(msg);
        });
        this.socket.chat.on('connect', () => {
            this.toggleRoomMembership();
        });
        this.socket.chat.on('joinedRoom', (room) => {
            this.rooms[room] = true;
        });
        this.socket.chat.on('leftRoom', (room) => {
            this.rooms[room] = false;
        });

        this.socket.alerts = io('http://localhost:3000/alert'); // create socket io client for alerts
        this.socket.alerts.on('alertToClient', (msg) => { // listener on alertToClient event
            this.receiveAlertMessage(msg);
        });
    }
});