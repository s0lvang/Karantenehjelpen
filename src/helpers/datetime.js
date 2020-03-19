import moment from "moment";

const LOCALE = "nb";

moment.locale(LOCALE);

moment.updateLocale(LOCALE, {
  relativeTime: {
    future: "om %s",
    past: "%s siden",
    s: "et par sekunder",
    ss: "%d sekunder",
    m: "ett minutt",
    mm: "%d minutter",
    h: "en time",
    hh: "%d timer",
    d: "en dag",
    dd: "%d dager",
    M: "en måned",
    MM: "%d måneder",
    y: "et år",
    yy: "%d år"
  }
});

export default function formatDateTime(date) {
  return moment(date).fromNow();
}
