import Link from "next/link";
interface ArrowLinkProps {
  href: string;
  title: string;
  label?: string;
  direction?: "left" | "right";
}

function ArrowLink({
  href,
  title,
  label = "Learn more",
  direction = "right",
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className="group text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium"
      aria-label={`Link to ${title}`}
    >
      {label}
      <span
        className={`inline-block transition-transform duration-300 p-1 ${
          direction === "right"
            ? "group-hover:translate-x-3"
            : "group-hover:-translate-x-1.5"
        }`}
      >
        {direction === "right" ? "→" : "←"}
      </span>
    </Link>
  );
}

export default ArrowLink;
