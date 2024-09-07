import Image from "next/image";
import { missingEnumToText, nameToIcon } from "@/public/functions/aa";
import { Tooltip } from "@nextui-org/react";

interface Props {
  icon: string;
  context: number[];
};

const AAMissingIconTooltipContent = (context: number[], category: string) => {
  return (
    <ul className="text-left">
      {
        context.map(n => (
          <li key={`${category}-${n}`}>{missingEnumToText(n, category)}</li>
        ))
      }
    </ul>
  );
};

export const AAMissingIcon = (props: Props) => {
  return (
    <Tooltip
      showArrow
      hidden={props.context.length === 0}
      content={AAMissingIconTooltipContent(props.context, props.icon)}
    >
      <Image
        className="pr-1"
        alt={`${props.icon}-missing-icon`}
        src={nameToIcon(props.icon)}
        width={32}
        height={32}
        unoptimized
      />
    </Tooltip>
  );
};