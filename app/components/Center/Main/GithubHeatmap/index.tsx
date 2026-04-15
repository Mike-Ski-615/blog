import { ActivityCalendar } from "react-activity-calendar";
import { useCallback, useMemo, type ReactElement, type SVGProps } from "react";
import { useIntl } from "react-intl";
import { useLanguage } from "@/provider/language-provider";

const getDateSeed = (date: string) =>
  date.split("").reduce((seed, char) => seed + char.charCodeAt(0), 0);

const getContributionCount = (date: string) => {
  const seed = getDateSeed(date);
  return (seed * 17 + seed ** 2) % 10;
};

type CalendarData = {
  data: Array<{
    date: string;
    count: number;
    level: number;
  }>;
  tooltipByDate: Map<string, string>;
};

function generateData(
  year: number,
  locale: string,
  formatTooltip: (date: string, count: number) => string,
): CalendarData {
  const data = [];
  const tooltipByDate = new Map<string, string>();
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    timeZone: "UTC",
  });
  const start = new Date(Date.UTC(year, 0, 1));
  const end = new Date(Date.UTC(year, 11, 31));

  for (
    let date = new Date(start);
    date <= end;
    date.setUTCDate(date.getUTCDate() + 1)
  ) {
    const currentDate = date.toISOString().slice(0, 10);
    const count = getContributionCount(currentDate);
    const formattedDate = dateFormatter.format(date);

    data.push({
      date: currentDate,
      count,
      level: Math.min(4, Math.floor(count / 2)),
    });
    tooltipByDate.set(currentDate, formatTooltip(formattedDate, count));
  }

  return { data, tooltipByDate };
}

export default function Calendar() {
  const intl = useIntl();
  const { locale } = useLanguage();
  const currentYear = new Date().getUTCFullYear();
  const calendarLocale = locale;
  const { data, tooltipByDate } = useMemo(
    () =>
      generateData(currentYear, calendarLocale, (date, count) =>
        intl.formatMessage(
          { id: "github.activity" },
          {
            date,
            count,
          },
        ),
      ),
    [calendarLocale, currentYear, intl],
  );
  const monthLabels = useMemo(
    () =>
      Array.from({ length: 12 }, (_, monthIndex) =>
        new Date(Date.UTC(currentYear, monthIndex, 1)).toLocaleString(
          calendarLocale,
          {
            month: "short",
            timeZone: "UTC",
          },
        ),
      ),
    [calendarLocale, currentYear],
  );
  const labels = useMemo(
    () => ({
      totalCount: intl.formatMessage(
        { id: "github.total" },
        { count: "{{count}}", year: "{{year}}" },
      ),
      legend: {
        less: intl.formatMessage({ id: "github.less" }),
        more: intl.formatMessage({ id: "github.more" }),
      },
      weekdays: [
        intl.formatMessage({ id: "github.weekday.sun" }),
        intl.formatMessage({ id: "github.weekday.mon" }),
        intl.formatMessage({ id: "github.weekday.tue" }),
        intl.formatMessage({ id: "github.weekday.wed" }),
        intl.formatMessage({ id: "github.weekday.thu" }),
        intl.formatMessage({ id: "github.weekday.fri" }),
        intl.formatMessage({ id: "github.weekday.sat" }),
      ],
      months: monthLabels,
    }),
    [intl, monthLabels],
  );
  const renderBlock = useCallback(
    (
      block: ReactElement<SVGProps<SVGRectElement>>,
      activity: { date: string },
    ) => {
      const tooltipText = tooltipByDate.get(activity.date);

      return (
        <g aria-label={tooltipText}>
          {tooltipText ? <title>{tooltipText}</title> : null}
          {block}
        </g>
      );
    },
    [tooltipByDate],
  );

  return (
    <>
      <div className="px-4 py-2 text-lg font-medium">
        {intl.formatMessage({ id: "github.title" })}
      </div>
      <div className="double-divider" />
      <div className="h-auto px-2 py-2 sm:px-4">
        <ActivityCalendar
          className="!w-full"
          data={data}
          blockMargin={2}
          blockSize={10}
          renderBlock={renderBlock}
          labels={labels}
        />
      </div>
    </>
  );
}
