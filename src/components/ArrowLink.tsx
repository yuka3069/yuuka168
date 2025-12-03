import Link from "next/link";
interface ArrowLinkProps {
  href: string;
  title: string;
  label?: string;
}

function ArrowLink({ href, title, label = "Learn more" }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className="group text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium"
      aria-label={`Link to ${title}`}
    >
      {label}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-3 p-1">
        &rarr;
      </span>
    </Link>
  );
}

export default ArrowLink;
