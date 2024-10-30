const readline = require('readline');

// Create an interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askUserForCondition(callback) {
    rl.question("Please enter your condition: ", (userPrompt) => {
        callback(userPrompt);
    });
}

function closeInterface() {
    rl.close();
}

module.exports = { askUserForCondition, closeInterface };
