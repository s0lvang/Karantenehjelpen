/* eslint-disable prettier/prettier */
const twilioAccountSid = process.env.VUE_APP_ACCOUNT_SID;
const twilioAuthToken = process.env.VUE_APP_AUTH_TOKEN;

const encodeFormData = data => (
  Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&")
);

export default async (to, body) => {
  const resp = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
    {
      method: "POST",
      body: encodeFormData({
        Body: body,
        From: "Karanthjelp",
        To: `+47${to}`
      }),
      headers: {
        Authorization: `Basic ${btoa(
          `${twilioAccountSid}:${twilioAuthToken}`
        )}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }
  )

  const data = await resp.json();
  console.info(`SMS sent ${data.date_created} to ${data.to}.`);
};
