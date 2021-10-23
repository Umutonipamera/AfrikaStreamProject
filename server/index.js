import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(fileUpload());


const PORT = 4001;

const getRandomDigits = () => {
    return Math.floor(Math.random() * 100000) + 100000
}

const simpleDataBase = {};

const setPhoneCode = (validPhoneNumber) => {
    // Assign the phone number as a key.
    // Assign the random code as a value.

    // Create a new key with a code.
    simpleDataBase[validPhoneNumber] = {};
    simpleDataBase[validPhoneNumber].code = getRandomDigits();
    return simpleDataBase[validPhoneNumber].code;
}

const init = () => {
    console.log('Initalizing Server');
    console.log('Simple Database:', simpleDataBase);
}

const verifyCode = (phoneNumber, codeGuess) => {
    // We want to make sure that the code, the user guesses mathces
    // the code that is stored in the database
    // console.log('PhoneNumber', phoneNumber, 'CodeGuess', codeGuess, simpleDataBase[phoneNumber].toString());
    if (!simpleDataBase[phoneNumber]) {
        return false;
    }
    if (simpleDataBase[phoneNumber].code.toString() === codeGuess) {
        // The codes match, success
        return true;
    } else {
        // The codes do not match
        return false;
    }
}

const addVideo = (phoneNumber, videoName) => {
    // Add video link to the database
    if (!simpleDataBase[phoneNumber]) {
        return false;
    }
    if(!simpleDataBase[phoneNumber].videos){
        simpleDataBase[phoneNumber].videos = [];
    }
    simpleDataBase[phoneNumber].videos.push({name: videoName});
}

app.get('/phone/:phoneNumber',(req, res) => {
    const { phoneNumber } = req.params; //http://localhost:4001/phone/<variable>

    const randomCode = setPhoneCode(phoneNumber);
   
    res.status(200).send(`${randomCode}`);
})

app.get('/verify/:phoneNumber',(req, res) => {
    const { code } = req.query; // ?code='123456'
    const { phoneNumber } = req.params; //http://localhost:4001/phone/<variable>
    // We need to check if the phone number from the
    // simpleDatabase matches the phone and code that are passed in

    const isValid = verifyCode(phoneNumber, code);
    res.status(200).send(`${isValid}`);
});

app.post('/upload/:phoneNumber',(req, res) => {
    const { files = [] } = req;
    const { phoneNumber } = req.params;
    if (!phoneNumber) {
        console.error('Invalid Request');
        res.status(400).send({});
        return null;
    }
    const uFile = files.myFile;
    console.log('Upload file name', uFile.name);
    const uploadPath =
    `${path.resolve()}/uploads/${uFile.name}`;
    uFile.mv(uploadPath, (e) => {
        if (e) {
            console.error(e);
            res.status(400).send(e);
            return null;
        }
        // Set the video
        addVideo(phoneNumber, uFile.name);
        res.status(201).send({newestVideo: uFile.name, videos: simpleDataBase[phoneNumber].videos});
    })
});


/*
* Route to return all of the videos that a user has;
*/
app.get('/videos/:phoneNumber',(req, res) => {
    const videos = simpleDataBase[phoneNumber].videos;
    if(!videos) {
        console.error('No Videos found');
        res.status(400).send([]);
        return null;
    }
    res.status(200).send(simpleDataBase[phoneNumber].videos);
});




app.listen(PORT, () => {
    init();
    console.log(`Port listening on ${PORT}`)
});