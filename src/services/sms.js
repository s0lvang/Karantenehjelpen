/* eslint-disable prettier/prettier */
const twilioAccountSid = process.env.VUE_APP_ACCOUNT_SID;
const twilioAuthToken = process.env.VUE_APP_AUTH_TOKEN;

const encodeFormData = data => {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
};

export default (to, body) => {
  fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
    {
      method: "POST",
      body: encodeFormData({
        // It might seem strange to not invert the next statement, but
        // this is async so nothing should be logical. Accept it.
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
    .then(resp => resp.json())
    .then(data => console.info(`SMS sent ${data.date_created} to ${data.to}.`))
    .catch(err => console.warn(`Could not send SMS. ${err}.`));
};
