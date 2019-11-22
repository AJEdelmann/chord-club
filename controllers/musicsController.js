const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync('data/db.json');
const db = low(adapter);
const puppeteer = require("puppeteer");
const url = "https://tabs.ultimate-guitar.com/tab/led_zeppelin/stairway_to_heaven_tabs_9488";

// PUPPETEER FUNCTION
addChord = async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();


    await page.goto(url, {
        waitUntil: "networkidle0"
    });

    let data = await page.evaluate(() => {
        let title = Array.from(document.querySelectorAll("h1"))
            .map(el => (el = el.innerHTML))
            .join("");
        let artist = Array.from(document.querySelectorAll("header span a._3PI6I"))
            .map(el => el.innerHTML)
            .join("");
        let chords = Array.from(document.querySelectorAll("pre"))
            .map(el => el.innerHTML)
            .join("");
        return {
            title,
            artist,
            chords
        };
    });

    return data;
};

exports.getMusics = (req, res, next) => {
    const musics = db.get('musics').value();
    res.status(200).send(musics);

};


exports.addMusic = async (req, res, next) => {
    const data = await addChord(); // here is where I am calling puppeteer()
    const newSong = {
        id: Date.now().toString(),
        ...data
    };
    db.get("musics")
        .push(newSong)
        .last()
        .assign({
            id: Date.now().toString()
        })
        .write();

    res.status(200).send(newSong);
};

// musics/:id
exports.getMusic = (req, res, next) => {
    const {
        id
    } = req.params;
    const music = db
        .get('musics')
        .find({
            id
        })
        .value();

    res.status(200).send(music);
};

exports.deleteMusic = (req, res, next) => {
    const {
        id
    } = req.params;
    const music = db.get('musics').remove({
        id
    }).write();

    res.status(200).send(music);
}

exports.updateMusic = (req, res, next) => {
    const {
        id
    } = req.params;
    const data = req.body;
    const music = db
        .get('musics')
        .find({
            id
        })
        .assign(data)
        .value();

    res.status(200).send(music);
}