import { Tooltip } from "@nextui-org/react";
import { dateToTimeFormat } from "@/public/functions/frontendConverters";


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
            return (
              <p key={i}>
                {dateToTimeFormat(start)}
                {" - "}
                {dateToTimeFormat(props.ends[i])}
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
