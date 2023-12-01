import dayjs from "dayjs";

const dateToTimeFormat = (date: dayjs.Dayjs) => {
  return date.format("MM/DD HH:mm");
};

export default function DateTimeListTooltip(props: {
  starts: number[];
  ends: number[];
}) {
  return (
    <span className="absolute transition-all top-0 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
      {props.starts.map((start, i) => {
        const startDate = dayjs(start * 1000);
        const endDate = dayjs(props.ends[i] * 1000);
        return (
          <p key={i}>
            {dateToTimeFormat(startDate)}
            {" - "}
            {dateToTimeFormat(endDate)}
          </p>
        );
      })}
    </span>
  );
}
