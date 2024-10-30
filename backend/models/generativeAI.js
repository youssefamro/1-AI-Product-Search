
const {delay} = require ('../utils/delay');
// Use require instead of import for dotenv and other modules
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();
// Use require for GoogleGenerativeAI if you were planning to use it
const { GoogleGenerativeAI } = require('@google/generative-ai');
// Initialize the GoogleGenerativeAI client with your API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


//generating the first response
async function generateResponse(prompt) {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        throw new Error('Error generating content: ' + error.message);
    }
}

//verifying the products
async function verifyProductTitles(productList, userCondition, userCategory) {
    const verificationResults = [];

    for (const product of productList) {
        const verificationPrompt = `Is '${product.title}' a '${userCategory}' ?. Respond with only and nothing more than 'yes' or 'no'.`;
        let attempts = 0;
        const maxAttempts = 3; // Number of attempts before giving up

        while (attempts < maxAttempts) {
            try {
                const verificationResult = await model.generateContent(verificationPrompt);
                console.log('verificationResult is here for youuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
                console.log(product.title)
                console.log(verificationResult.response.text())
                const isRelated = verificationResult.response.text().trim().toLowerCase() === 'yes';

                verificationResults.push({
                    title: product.title,
                    related: true,//isRelated,
                    price: product.price,
                    link: product.link
                });
                break; // Break if successful
            } catch (error) {
                console.error(`Error verifying product title '${product.title}':`, error);

                if (error.status === 429) {
                    attempts++;
                    //console.log(`Rate limit exceeded. Retrying... (${attempts}/${maxAttempts})`);
                    await delay(6000); // Wait before retrying
                } else {
                    verificationResults.push({
                        title: product.title,
                        related: false,
                        price: product.price,
                        link: product.link,
                        //error: error.message // Log other errors
                    });
                    break; // Break on non-429 errors
                }
            }
        }
    }

    return verificationResults;
}




module.exports = { generateResponse,verifyProductTitles };