// When used CustomLink, then the tag's links on "separate lines". Maybe need fix css for CustomLink in this case.
import Link from 'next/link'
import kebabCase from "@/lib/kebabCase";

const Tag = ({ text }: { text: string }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200">
        {text.split(" ").join("-")}
      </a>
    </Link>
  );
};

export default Tag;
