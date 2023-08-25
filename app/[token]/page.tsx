import Link from "@/components/Link";

export default function TokenPage({ params }: { params: { token: string } }) {
  return (
    <div>
      <p>
        Here is your access token for PaceMan, please keep it a secret!
      </p>
      <p className="py-4 text-3xl">{ params.token }</p>
      <p>
        <Link stay link={process.env.NEXT_PUBLIC_BASE_URL || "https://paceman.gg/"}>Click here</Link> to get back to PaceMan.
      </p>
    </div>
  );
};