const express = require('express');
const storage = require('node-persist');
const bodyParser = require('body-parser');
const cors = require('cors');
const { init } = require('node-persist');

let app = express();
app.use(cors());

let jsonParser = bodyParser.json();
storage.init();
storage.clear;



app.get("/tasklist", async (req, res) => {
    console.log("fetching data..");
    res.send(await storage.values());
    console.log("data sent");
});

app.post("/addtask", jsonParser, async (req, res) => {
    try {
        let tasks = await storage.values();
        const task_id = tasks.length + 1;
        console.log(req.body);
        const { task_value } = req.body;
        await storage.setItem(task_id.toString(), task_value);
        res.send('Task Added!');
    } catch (error) {
        let responseHtml = `<p>Bad Request!</p><p>${error.message}</p>`;
        res.send(responseHtml);
    }

});

app.listen(5000, () => {
    console.log("server running at http://localhost:5000");
});