import dayjs from "dayjs";
import Tooltip from "../Tooltip";

const dateToTimeFormat = (date: dayjs.Dayjs) => {
  return date.format("MM/DD HH:mm");
};

export default function DateTimeListTooltip(props: {
  starts: number[];
  ends: number[];
}) {
  return (
    <Tooltip>
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
    </Tooltip>
  );
}
