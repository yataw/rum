const express = require('express');
const fs = require('fs');
const cors = require('cors');
const port = 9001;
const app = express()
    .use(cors({credentials: true, origin: true}))
    .use(express.json());

// от клиента ждем headers: { 'Content-Type': 'application/json' }
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;

function defAnswer(res)
{
    res.status(200).json({status:"ok"});
}

function writeToFile(str)
{
    const date = new Date();
    const dateStr = `${date.getMinutes()}:${date.getSeconds()}`;

    fs.appendFile(`${desktopDir}/timings.json`, str, () => console.log(dateStr + ' data OK'));
}

app.post('/sendBeacon', (req, res) => {
    const data = req.body;
    const serialized = JSON.stringify(data) + '\n';

    writeToFile(serialized);
    defAnswer(res);
});

app.all('/', (req, res) => {
    defAnswer(res);
});

app.all('/start', (req, res) => {
    setTimeout(() => defAnswer(res), Math.random() * 5);
});

app.listen(port, () => {
    console.log(`Express intro running on port ${port}`);
});

const json = {a: 1, b: {c: [{d: false}]}};
const callback = () => {}

