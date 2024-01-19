const twilio = require("twilio");

// Twilio credentials
const accountSid = "YOUR TWILIO SID";
const authToken = "YOUR TWILIO AUTHTOKEN";
const twilioNumber = "YOUR TWILIO NUMBER";

const client = twilio(accountSid, authToken);

// Function to fetch a quote from an API
async function fetchQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const quoteData = await response.json();
    console.log(quoteData.content);
    return quoteData.content;
  } catch (error) {
    console.error("Error fetching quote:", error.message);
    return "An error occurred while fetching the quote.";
  }
}

// Function to send a quote to a number
async function sendQuote(to, quote) {
  try {
    await client.messages.create({
      body: quote,
      from: twilioNumber,
      to: to,
    });
    console.log("Quote sent successfully!");
  } catch (error) {
    console.error("Error sending quote:", error.message);
  }
}

// Function to run the script every 10 seconds
async function runScript() {
  const recipientNumber = "RECIPIENT NUMBER"; // Include the country code, e.g., +1234567890

  const quoteToSend = await fetchQuote();

  // Send the fetched quote to the specified WhatsApp number
  sendQuote(recipientNumber, quoteToSend);
}

runScript();

setInterval(runScript, 10000);
