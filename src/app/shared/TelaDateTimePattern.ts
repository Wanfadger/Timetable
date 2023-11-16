import { DateTimeFormatter } from "@js-joda/core";

export const TelaDatePattern:DateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
export const TelaDateTimePattern:DateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm:ss");
export const TelaDateTimePattern24 = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
export const TelaReportDateTimePattern:DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
export const TelaTimetablePattern:DateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm");

