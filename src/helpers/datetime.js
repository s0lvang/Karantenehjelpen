import formatDistanceToNow from "date-fns/formatDistanceToNow";
import nb from "date-fns/locale/nb";

export default function formatDateTime(date) {
  return `${formatDistanceToNow(date, { locale: nb }).replace(
    "omtrent",
    ""
  )} siden`;
}
