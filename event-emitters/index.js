const EventEmitter = require("events");

const commandHandler = new EventEmitter();

// observer
commandHandler.on("myEvent", (myCallbackValue) => {
    console.log("Log Here: ", myCallbackValue);
})

// producer
setTimeout(() =>
    commandHandler.emit("myEvent", "myCallbackValue"), 2000)

