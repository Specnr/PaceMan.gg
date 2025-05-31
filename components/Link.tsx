import { ReactNode } from "react";

interface Props {
  link: string;
  children: string | ReactNode;
  stay?: boolean;
  className?: string;
  variant?: 'default' | 'subtle' | 'button';
}

export default function Link(props: Props) {
  const { variant = 'default' } = props;
  
  const baseStyles = "transition-all duration-200";
  
  const variantStyles = {
    default: "text-purple-400 hover:text-purple-300 underline-offset-2 hover:underline",
    subtle: "text-gray-300 hover:text-white",
    button: "inline-flex items-center justify-center px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-sm hover:shadow-purple-500/20"
  };
  
  return (
    <a
      className={`${baseStyles} ${variantStyles[variant]} ${props.className || ""}`}
      target={!props.stay ? "_blank" : "_self"}
      href={props.link}
      rel={!props.stay ? "noopener noreferrer" : undefined}
    >
      {props.children}
    </a>
  );
}
