// When used CustomLink, then the tag's links on "separate lines". Maybe need fix css for CustomLink in this case.
import Link from 'next/link'
import kebabCase from "@/lib/kebabCase";

const Tag = ({ text }: { text: string }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-primary-700 hover:text-primary-100 dark:text-primary-100/70 dark:hover:text-primary-100">
        {text.split(" ").join("-")}
      </a>
    </Link>
  );
};

export default Tag;
