var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write('Yo!');
    res.end();
}).listen(process.env.PORT || 3000);

const fetchTimeout = (url, ms, { signal, ...options } = {}) => {
    const controller = new AbortController();
    const promise = fetch(url, { signal: controller.signal, ...options });
    if (signal) signal.addEventListener("abort", () => controller.abort());
    const timeout = setTimeout(() => controller.abort(), ms);
    return promise.finally(() => clearTimeout(timeout));
};

setInterval(() => {
    const controller = new AbortController();

    console.log("Checking if bot is alive...");
    fetchTimeout("https://discord-bot-1ozw.onrender.com", 60000, , { signal: controller.signal })
        .then(res => res.text())
        .then(data => console.log("Website is up!: " + data))
        .catch(err => console.log("Website is down!: " + err));
}, 300000);
