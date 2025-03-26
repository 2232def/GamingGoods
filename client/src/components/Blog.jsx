import React from "react";

const posts = [
  {
    id: 1,
    title: "Top 10 Must-Have Gaming Accessories for Ultimate Performance",
    description:
      "In the ever-evolving world of gaming, having the right accessories can significantly enhance your overall experience and performance. From improving comfort during long sessions to boosting responsiveness in competitive play, selecting the right gear is pivotal.",
    date: "Oct 8, 2024",
    datetime: "2024-10-8",
    category: { title: "Gaming", href: "#" },
    imageUrl:"https://powder.gg/blog/content/images/size/w1200/2024/10/9.png",
    author: {
      name: "Geoff O'Donoghue",
      role: "Bloger",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "GameStop Hosting Buy 2, Get 1 Free Sale",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Nov 30, 2024",
    datetime: "2024-11-30",
    category: { title: "Gaming", href: "#" },
    imageUrl:"https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/11/gamestop-black-and-red-logo.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
    author: {
      name: "Dalton Cooper",
      role: "Bloger",
      imageUrl:
        "https://static0.gamerantimages.com/wordpress%2Fwp-content%2Fauthors%2F66a3d7d899eb0-dalton%20cooper%20game%20rant%20profile%20picture.jpg?fit=crop&w=90&h=90",
    },
  },
  {
    id: 3,
    title: "All Black Myth Wukong secrets and hidden details",
    description:
      "Want to find all of the dozens of Black Myth: Wukong secrets hidden across all 6 Chapters? Soulslikes are known for their hidden passageways, obscure questlines, and secret bosses, but Black Myth: Wukong has still surprised its playerbase with both the quality and the sheer opaqueness of certain secrets dotted about its six Chapters. There are extremely important items hidden behind walls; numerous secret ",
    date: "Sept 27, 2024",
    datetime: "2020-09-27",
    category: { title: "Gaming", href: "#" },
    imageUrl:"https://assetsio.gnwcdn.com/black-myth-wukong-stealing-gourd.jpg?width=690&quality=80&format=jpg&auto=webp",
    author: {
      name: " Ollie Toms",
      role: "Bloger",
      imageUrl:
        "https://assetsio.gnwcdn.com/ollie-toms-profile-pic.jpg?width=70&height=70&fit=crop&quality=60&format=png&auto=webp",
    },
  },
];

function Blog() {
  return (
    <div className="w-full h-screen bg-white md:mt-[6rem] pt-3 md:mb-[14rem]">
      <h1 className="bg-red-500 text-6xl text-center ">Check Blog Post </h1>
      <div className="bg-white py-24 sm:py-0 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-10 grid max-w-2xl gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between md:pb-[9rem]"
              >
                <div className="h-64 w-full bg-red-500 rounded-md ">
                  <img src={post.imageUrl} alt="" className="object-cover h-full rounded-md" />
                </div>

                <div className="flex sm:py-3 items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                    {post.description}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    alt=""
                    src={post.author.imageUrl}
                    className="size-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="btn flex bg-white ">
            <a href="" className="">
              See all post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
