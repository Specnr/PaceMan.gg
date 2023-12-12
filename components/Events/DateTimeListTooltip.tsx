import dayjs from "dayjs";
import { Tooltip } from "@nextui-org/react";

const dateToTimeFormat = (date: dayjs.Dayjs) => {
  return date.format("MM/DD HH:mm");
};

export default function DateTimeListTooltip(props: {
  starts: number[];
  ends: number[];
  children: React.ReactNode;
}) {
  return (
    <Tooltip
      showArrow
      content={
        <>
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
        </>
      }
    >
      {props.children}
    </Tooltip>
  );
}
