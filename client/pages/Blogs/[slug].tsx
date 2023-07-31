import type { NextPage } from "next";
import { Navbar } from "@/components";
import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import UserIcon from "remixicon-react/User3LineIcon";
import Heart from "remixicon-react/Heart3LineIcon";

export async function getStaticPaths() {
  const files = fs.readdirSync("example_blog");

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  const fileName = fs.readFileSync(`example_blog/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

const LoginPage: NextPage = ({ frontmatter, content }: any) => {
  return (
    <div className="w-full">
      <Head>
        <title>{frontmatter.metaTitle}</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Navbar />
      <div className="flex-col justify-center py-10">
        <div className="flex justify-center">
          <div className="prose prose-invert px-4 overflow-auto max-w-[86ch] xl:mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl">{frontmatter.title}</h1>
              <div className="text-2xl sm:text-3xl">{frontmatter.tagline}</div>
              <div className="flex justify-center text-lg m-1">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex px-2 justify-center items-center text-2xl sm:text-lg">
                    <UserIcon className="pr-1 w-fit" />
                    {frontmatter.username}
                  </div>
                  <div className="flex justify-center items-center text-base sm:text-lg">
                    <div className="px-2 ">{frontmatter.date}</div>
                    <div className="flex px-2">
                      <Heart className="pr-1 w-fit" />
                      {frontmatter.likeCount}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div
                  dangerouslySetInnerHTML={{ __html: md().render(content) }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
