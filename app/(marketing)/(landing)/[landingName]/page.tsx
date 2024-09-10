import InquiryForm from "@/components/shared/inquiry-form";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
import { landing } from "@/config/data/landing";

type Props = {
  params: { landingName: string };
  // searchParams: { [key: string]: string | string[] | undefined }
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
 

  // fetch data
  // const landingData = await fetch(`http://localhost:3000/api/marketing/${params.landingName}`).then((res) => res.json());

   // map data
   const landingData = landing.find((item) => item.slug === params.landingName);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: landingData?.title,
    description: landingData?.description,
    keywords: landingData?.tags?.join(", "),
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

export default async  function LandingPage({ params }: Props) {
  
  const landingData = landing.find((item) => item.slug === params.landingName);
  // const landingDatas = fetch(`http://localhost:3000/api/marketing/${params.landingName}`).then((res) => res.json());
  // let data = await fetch(`http://localhost:3000/api/marketing/${params.landingName}`)
  // let posts = await data.json()
  // console.log(posts);
  return (
    <header>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid items-center gap-8 sm:gap-20 lg:grid-cols-2 rbg-red-500">
          <div className="max-w-3xl lg:order-1">
            <h1 className="mb-4 text-4xl font-bold md:text-6xl text-pretty">
              {landingData?.heading}
            </h1>
            <p className="mb-6 max-w-2xl text-sm text-gray-500 sm:text-xl md:mb-10 lg:mb-12">
              {landingData?.description}
            </p>

            {/* <div className="mb-6 flex items-center md:mb-10 lg:mb-12">
              <a
                href="#"
                className="mr-6 rounded-md bg-black px-6 py-3 text-center font-semibold text-white lg:mr-8"
              >
                Let's Talk
              </a>
              <a href="#" className="flex flex-row items-center font-bold">
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94bd85e6cf98_ArrowUpRight%20(4).svg"
                  alt=""
                  className="mr-2 inline-block max-h-4 w-5"
                />
                <p className="text-sm sm:text-base">View Showreel</p>
              </a>
            </div> */}

            <div className="flex items-center">
              <p className="text-sm sm:text-base">Follow Us</p>
              {/* Divider */}
              <div className="ml-4 mr-4 w-10 border-t border-black"></div>
              <a href="#">
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94172fe6cf9e_Frame%2047894%20(2).svg"
                  alt=""
                  className="mr-4 inline-block"
                />
              </a>
              <a href="#">
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a941e0ee6cf9d_Frame%2047894.svg"
                  alt=""
                  className="mr-4 inline-block"
                />
              </a>
              <a href="#" className="inline-block max-w-full text-black">
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9452ece6cf9f_Frame%2047894%20(1).svg"
                  alt=""
                  className="mr-4 inline-block"
                />
              </a>
            </div>
          </div>
          <div className="lg:order-2">
            <InquiryForm params={params} />
            {/* <img
              src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
              alt=""
              className="h-full w-full max-w-2xl object-cover"
            /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
