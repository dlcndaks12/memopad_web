/**
 * Message Queue
 */
const MessageQueue = function (protocol, host, port) {
    this.debug_mode = false;
    this.is_ie = false;
    this.ping_handler = null;
    this.server_protocol = protocol;
    this.server_host = host;
    this.server_port = port;
    this.server_url = protocol + "://" + host + ":" + port + "/sub";
    this.web_socket = null;
    this.subscribe_callback_list = [];
}

/**
 * Initialize
 *
 * @param host 서버 호스트
 * @param port 서버 포트
 * @param callback 서버 연결시 Callback
 */
MessageQueue.prototype.init = function (callback) {
    if ("WebSocket" in window) {
        try {
            // Define reconnect function
            let reconnect = function () {
                setTimeout(function () {
                    this.log('Connecting...');
                    if (typeof this.web_socket.reconnect === "function") {
                        this.web_socket.reconnect();
                    } else {
                        this.init(callback);
                    }
                }.bind(this), 2000);
            }.bind(this);

            // Init
            this.web_socket = new WebSocket(this.server_url);

            // Check IE
            let trident = navigator.userAgent.match(/Trident\/(\d)/i);
            if (trident !== null) {
                this.log("It's IE : " + navigator.userAgent);
                this.is_ie = true;
            } else {
                this.is_ie = false;
            }

            // On Open
            this.web_socket.onopen = function (event) {
                this.log('Connection is opened');
                callback();
                if (this.is_ie === true) {
                    if (this.ping_handler) {
                        clearInterval(this.ping_handler);
                    }
                    this.ping_handler = setInterval(function () {
                        this.ping();
                    }.bind(this), 58000);
                }
            }.bind(this);

            // On Message
            this.web_socket.onmessage = function (event) {
                if (event) {
                    let data = event.data;
                    if (data === 'PONG') {
                        this.log('Message : ' + data);
                    } else if (data === 'OK') {
                        this.log('Message : ' + data);
                    } else {
                        try {
                            let received_json = JSON.parse(data);
                            if (received_json) {
                                let topic = received_json['TOPIC'];
                                let message = received_json['MESSAGE'];
                                this.subscribe_callback_list[topic](message);
                            }
                        } catch (exception) {
                            this.log('Message error : ' + data);
                        }
                    }
                }
            }.bind(this);

            // On Close
            this.web_socket.onclose = function () {
                this.log('Connection is closed');
                reconnect();
            }.bind(this);

            // On Error
            this.web_socket.onerror = function () {
                this.log('Error occurred');
                if (this.web_socket.connected === false) {
                    reconnect();
                }
            }.bind(this);
        } catch (err) {
            this.log("Failed to connect message queue server : " + err);
        }
    } else {
        this.log("Not supported WebSocket");
    }
};

/**
 * Sub
 *
 * @param topic 구독명
 * @param callback 구독중인 메세지 전달시 Callback
 */
MessageQueue.prototype.sub = function (topic, callback) {
    if (this.web_socket) {
        this.subscribe_callback_list[topic] = callback;
        this.web_socket.send("SUB " + topic);
    }
};

/**
 * Disconnect
 */
MessageQueue.prototype.disconnect = function () {
    if (this.web_socket) {
        this.subscribe_callback_list = [];
        this.web_socket.send("DISCONNECT");
    }
};

/**
 * Ping
 */
MessageQueue.prototype.ping = function () {
    if (this.web_socket) {
        this.web_socket.send("PING");
    }
};

/**
 * Debug
 *
 * @param is_debug 디버그 모드 설정 여부
 */
MessageQueue.prototype.debug = function (is_debug) {
    this.debug_mode = is_debug;
};

/**
 * Log
 *
 * @param msg 로그 메세지
 */
MessageQueue.prototype.log = function (msg) {
    if (this.debug_mode) {
        if (typeof window !== "undefined" && window !== null && window.console !== null) {
            window.console.log(msg);
        }
    }
};

export default MessageQueue;