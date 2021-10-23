// React and Node Js/


// Check if a phone number is valid

// should not have any letters (Should be all numbers)

// has to be 10 digits plus 2.

// If the digits are valid, send to server

// When server receives digits, generate random code.

// Find a way to link code with the phone number.

// Tell the client (React) that we are done with the code, please enter a new code.

// If the code is correct, success, else, please try again.

// Check if the input is valid.

const isPhoneValid = (phoneNumber = '') => {
    if (phoneNumber.length = 0) {
        // The phone is empty
        return false;
    } else if (phoneNumber.length < 12) {
        // The phone is too short
        return false;
    } else if (phoneNumber.length >12) {
        // The phone is too long
        return false;
    }
    return true;
}

const getRandomDigits = () => {
    return Math.floor(Math.random() * 100000) + 100000
}

// Ex: 25 012 3456 6789 => 123456
const sendToServer = (validPhoneNumber, simpleDataBase) => {
    // Generate a code that is random
    // const randomCode = getRandomDigits();
    const randomCode = 546436;
    console.log(randomCode);

    // Assume that the phone number works, we are going to store the phone
    // and the code at the same time
    simpleDataBase[validPhoneNumber] = randomCode;
    console.log(simpleDataBase)

    // Let the client (React) know that the code is generated
    // We are returning this just for testing purposes
    return randomCode;
}

const verifyCode = (phoneNumber, codeGuess, simpleDataBase) => {
    // We want to make sure that the code, the user guesses mathces
    // the code that is stored in the database
    if (simpleDataBase[phoneNumber] === codeGuess) {
        // The codes match, success
        return true;
    } else {
        // The codes do not match
        return false;
    }
}



/// Test run
const testPhone1 = '123456783334';

console.log(isPhoneValid(testPhone1));
//  {"250123456789": "234567"}

const simpleDataBase = {};
const secretCodeFromServer = sendToServer(testPhone1, simpleDataBase)
console.log(secretCodeFromServer);
const guess = 546436
console.log(verifyCode(testPhone1,guess, simpleDataBase))
