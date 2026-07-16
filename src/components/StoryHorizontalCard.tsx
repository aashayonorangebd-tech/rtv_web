"use client";

import Image from "next/image";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";

type Props = {
  story: StoryModel;
};

export default function StoryHorizontalCard({ story }: Props) {
  return (
    <a
      href={storyPath(story)}
      className="grid grid-cols-3 group gap-2.5"
    >
      <div className="col-span-1">
        <div className="relative">
          <Image
            src={story.fileName || "/Images/rtv-logo.svg"}
            alt={story.mainTitle}
            width={400}
            height={225}
            className="object-cover object-center max-w-full aspect-video"
            sizes="400px"
            loading="lazy"
          />
        </div>
      </div>
      <div className="col-span-2 flex flex-col justify-start">
        <h3 className="main-title-post dark:text-foreground group-hover:text-blue-800 group-hover:dark:text-blue-300">
          {story.mainTitle}
        </h3>
        <small className="text-[#807d7d]">{story.banglaDate || story.passedTime}</small>
      </div>
    </a>
  );
}
