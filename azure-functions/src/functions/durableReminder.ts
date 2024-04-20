import {
  app,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  InvocationContext,
} from "@azure/functions";
import * as df from "durable-functions";
import {
  ActivityHandler,
  OrchestrationContext,
  OrchestrationHandler,
} from "durable-functions";
import { transporter, baseMailOptions } from "../utils/mailer";
import { formatExpireDate } from "../utils/utils";

type ReminderData = {
  name: string;
  description: string;
  expirationTime: string;
  reminderTime: string;
  startTime: string;
  endTime: string;
};

const activityName = "durableReminder";

const durableReminderOrchestrator: OrchestrationHandler = function* (
  context: OrchestrationContext
) {
  const outputs = [];
  //get the input of the current orchestrator function
  const reminderData = context.df.getInput() as ReminderData;

  //calculate the time to wait before sending the reminder
  //startTime + (expirationTime - reminderTime)
  const remindDate = new Date(
    parseInt(reminderData.startTime) +
      (parseInt(reminderData.expirationTime as string) -
        parseInt(reminderData.reminderTime as string)) *
        1000 *
        60
  );

  //create a timer to wait until the reminder time
  yield context.df.createTimer(remindDate);

  //call the activity function to send the reminder
  outputs.push(yield context.df.callActivity(activityName, reminderData));

  return outputs;
};
df.app.orchestration(
  "durableReminderOrchestrator",
  durableReminderOrchestrator
);

const durableReminder: ActivityHandler = (
  reminderData: ReminderData
): string => {
  const endDate = new Date(parseInt(reminderData.endTime));

  const mailOptions = {
    subject: `Moneo Reminder: ${reminderData.name}`,
    html: `<h1>Reminder for ${reminderData.name}</h1>
            <p>Description: ${reminderData.description}<p>
            <p>Expires at: ${formatExpireDate(endDate)}</p>`,
    ...baseMailOptions,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return `Reminder sent for ${reminderData.name} at ${formatExpireDate(
    new Date()
  )}`;
};
df.app.activity(activityName, { handler: durableReminder });

const durableReminderHttpStart: HttpHandler = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponse> => {
  const client = df.getClient(context);

  //Parse the incoming request body
  const formData = await request.formData();
  const reminderData = Object.fromEntries(formData);


  const instanceId: string = await client.startNew(
    request.params.orchestratorName,
    { input: reminderData }
  );

  context.log(`Started orchestration with ID = '${instanceId}'.`);

  return client.createCheckStatusResponse(request, instanceId);
};

app.http("durableReminderHttpStart", {
  route: "orchestrators/{orchestratorName}",
  extraInputs: [df.input.durableClient()],
  handler: durableReminderHttpStart,
});
