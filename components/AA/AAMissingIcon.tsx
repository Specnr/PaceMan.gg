import Image from "next/image";
import { AA_COMPLETED_ICON, missingEnumToText, nameToIcon } from "@/public/functions/aa";
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
      <div className="pr-2">
        <div className="relative w-[28px]">
          {
            props.context.length === 0 && 
              <Image
                className="absolute h-[28px] w-[28px] z-10"
                alt={`${props.icon}-completed-icon`}
                src={AA_COMPLETED_ICON}
                width={28}
                height={28}
                unoptimized
              />
          }
          <Image
            className="absolute h-[28px] w-[28px]"
            alt={`${props.icon}-missing-icon`}
            src={nameToIcon(props.icon)}
            width={28}
            height={28}
            unoptimized
          />
        </div>
      </div>
    </Tooltip>
  );
};