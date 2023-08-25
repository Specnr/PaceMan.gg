import Link from "@/components/Link";

export default function ErrorPage() {
  return (
    <div>
      <p>
        Something went wrong. Please try again later
      </p>
      <p>
        <Link stay link={process.env.NEXT_PUBLIC_BASE_URL || "https://paceman.gg/"}>Click here</Link> to get back to PaceMan.
      </p>
    </div>
  );
}