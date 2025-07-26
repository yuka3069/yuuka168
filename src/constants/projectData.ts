export type Project = {
  title: string;
  abstract: string;
  href?: string;
  imgSrc?: string;
};

const projectsData: Project[] = [
  {
    title: "A Search Engine",
    abstract: `What if you could look up any information in the world? Webpages, images, videos
    and more. Google has many features to help you find exactly what you're looking
    for.`,
    imgSrc: "/images/google.png",
    href: "https://www.google.com",
  },
  {
    title: "The Time Machine",
    abstract: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: "/images/time-machine.jpg",
    href: "/blog/the-time-machine",
  },
];

export default projectsData;
