// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;



// Get current date and time
const updatedAt = new Date().toLocaleString();

// Font name and size
const FONT_NAME = 'Menlo';
const FONT_SIZE = 9;

// Colors
const COLORS = {
    bg0: '#29323c',
    bg1: '#1c1c1c',
};

const lineColors = ['#5BD2F0', '#9D90FF', '#FDFD97', '#FEB144', '#FF6663', '#7AE7B9', '#5BD2F0', '#9D90FF', '#FDFD97', '#FEB144', '#FF6663', '#7AE7B9'];

const YOURNAME = 'ChangeMe';
const WAKAUSER = 'ChangeMe';

const DATERANGE = 'last_7_days';


const API_KEY = '?api_key=YourAPIKEY'

const WAKA_TODAY_URL = "https://wakatime.com/api/v1/users/current/status_bar/today" + API_KEY;

const WAKA_WEEKLY_URL = "https://wakatime.com/api/v1/users/" + WAKAUSER + "/stats/" + DATERANGE + API_KEY;


// getting data
let data = await fetchJson(WAKA_TODAY_URL);

let timeFrame = 'Today';

if (data.data.languages.length == 0) {
    timeFrame = 'Last 7 days';
    data = await fetchJson(WAKA_WEEKLY_URL);
}

// set up for widget
let widget = new ListWidget();
let bgColor = new LinearGradient();
bgColor.colors = [new Color(COLORS.bg0), new Color(COLORS.bg1)];
bgColor.locations = [0.0, 1.0];
widget.backgroundGradient = bgColor;
widget.backgroundColor = new Color('#ffffff');

let stack = widget.addStack();
stack.layoutVertically();


// populating widget with data
let titleLine = stack.addText(timeFrame);
titleLine.textColor = Color.white();
titleLine.textOpacity = 0.7;
titleLine.font = new Font(FONT_NAME, FONT_SIZE);


for (let i = 0; (i < data.data.languages.length) && (i < 9); i++) {
    let line = stack.addText(`${data.data.languages[i].name}:${data.data.languages[i].percent.toFixed(0)}% ${data.data.languages[i].decimal}`);
    line.textColor = new Color(lineColors[i]);
    line.font = new Font(FONT_NAME, 10);
}

// final to display script
Script.setWidget(widget);
Script.complete();



// data retrieval
async function fetchJson(url, headers) {
    try {
        console.log(`Fetching url: ${url}`);
        const req = new Request(url);
        //console.log(req);
        req.headers = headers;
        const resp = await req.loadJSON();
        console.log(resp);
        return resp;
    } catch (error) {
        console.error(`Error fetching from url: ${url}, error: ${JSON.stringify(error)}`);
    }
}
