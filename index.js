var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write('Yo!');
    res.end();
}).listen(process.env.PORT || 3000);

const fetchTimeout = (url, ms) => {
    const controller = new AbortController();
    const promise = fetch(url, { signal: controller.signal});
    console.log("Started pinging...")
    if (signal) signal.addEventListener("abort", () => controller.abort());
    const timeout = setTimeout(() => controller.abort(), ms);
    return promise.finally(() => { 
        console.log("It's done!")
        clearTimeout(timeout)
    });
};

setInterval(() => {
    console.log("Checking if bot is alive...");
    fetchTimeout("https://discord-bot-1ozw.onrender.com", 60000)
        .then(res => res.text())
        .then(data => console.log("Website is up!: " + data))
        .catch(err => console.log("Website is down!: " + err));
}, 300000);
