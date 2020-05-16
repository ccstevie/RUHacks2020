const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://highbot-dcacf.firebaseio.com"
});

const { SessionsClient } = require('dialogflow');

exports.dialogflowGateway = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const { queryInput, sessionId } = request.body;

        const SessionsClient = new SessionsClient({ credentials: serviceAccount });
        const session = sessionClient.sessionPath('highbot-dcacf', sessionId);

        const responses = await sessionClient.detectIntent({ session, queryInput });

        const result = responses[0].queryResult;

        response.send(result);

    });
});


const { WebhookClient } = require('dialogflow-fulfillment');

exports.dialogflowWebhook = functions.https.onRequest(async (request, response) => {
    const agent = new WebhookClient({ request, response });

    console.log(JSON.stringify(request.body));

    const result = request.body.queryResult;

    function welcome(agent) {
        agent.add('Welcome to my agent!');
    }

    function fallback(agent) {
        agent.add('Sorry, can you try again?');
    }

    async function userOnboardingHandler(agent) {

        // backend
        const db = admin.firestore();
        const profile = db.collection('users').listDocuments('jeffd23');

        const { name, color } = result.parameters;

        await profile.set({ name, color });
        agent.add('Welcome aboard my friend!');
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('UserOnboarding', userOnboardingHandler);
})