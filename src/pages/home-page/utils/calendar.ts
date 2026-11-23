import { coupleNames, eventStart, invitation } from "@data/invitation";

const title = `Boda ${coupleNames}`;
const location = invitation.venues
  .map((venue) => `${venue.name}, ${venue.place}`)
  .join(" · ");
const details = invitation.venues
  .map(
    (venue) =>
      `${venue.label}: ${venue.name}, ${venue.place}${venue.time ? ` · ${venue.time}` : ""}`,
  )
  .join("\n");

const compactDate = (date: string) => date.replace(/-/g, "");

function toUtcStamp(date: string) {
  return new Date(date).toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
}

function nextDay(date: string) {
  const day = new Date(`${date}T12:00:00Z`);
  day.setUTCDate(day.getUTCDate() + 1);
  return day.toISOString().slice(0, 10);
}

/**
 * While the ceremony time is pending the event is saved as all-day; once
 * `invitation.time` is set it becomes a timed event lasting 10 hours.
 */
const timed = Boolean(invitation.time);
const start = timed ? toUtcStamp(eventStart) : compactDate(invitation.date);
const end = timed
  ? toUtcStamp(
      new Date(new Date(eventStart).getTime() + 10 * 3600_000).toISOString(),
    )
  : compactDate(nextDay(invitation.date));

export const googleCalendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams(
  {
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    details,
    location,
  },
)}`;

/** Downloads an .ics file, which opens the native calendar on iOS and desktop. */
export function downloadIcs() {
  const escape = (value: string) =>
    value.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  const dateField = (name: string, value: string) =>
    timed ? `${name}:${value}` : `${name};VALUE=DATE:${value}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Viry y Angel//Invitacion//ES",
    "BEGIN:VEVENT",
    `UID:boda-viry-angel-${start}`,
    `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
    dateField("DTSTART", start),
    dateField("DTEND", end),
    `SUMMARY:${escape(title)}`,
    `DESCRIPTION:${escape(details)}`,
    `LOCATION:${escape(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(
    new Blob([ics], { type: "text/calendar;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "boda-viry-y-angel.ics";
  link.click();
  URL.revokeObjectURL(url);
}
