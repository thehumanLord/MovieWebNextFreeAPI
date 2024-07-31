import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFireAlt,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ChapterList = ({ chaptersData, id }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGrid, setIsGrid] = useState(false);
  const filteredChapters =
    chaptersData &&
    chaptersData.filter((chapter) => chapter.name.includes(searchTerm));
  const strippedChapterNames = chaptersData.map((chapter) =>
    chapter.name.length < 13
      ? chapter.name
      : chapter.name.substring(0, 13) + "..."
  );
  console.log(strippedChapterNames);

  return (
    <div className="flex flex-col bg-neutral-700/30 min-h-[70vh] p-5 rounded-md">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl">Chapters</h1>
        <div className="flex flex-row justify-end items-center gap-3 w-[40%] max-md:w-[60%]">
          <Input
            value={searchTerm}
            onChange={() => setSearchTerm(event.target.value)}
            className="w-[90%] bg-input rounded-md"
            placeholder="Search"
          />
          <Button onClick={() => setIsGrid(!isGrid)}>
            <FontAwesomeIcon icon={isGrid ? faBars : faTableCells} />{" "}
          </Button>
        </div>
      </div>
      <div
        className={` ${
          isGrid
            ? "grid grid-cols-10 grid-rows-auto place-items-center max-md:grid-cols-2"
            : "flex flex-col"
        } gap-3 mt-5`}
      >
        {filteredChapters.map((chapter, index) =>
          !isGrid ? (
            <Link
              href={`/pages/Manga/read/${id}/${chapter.id}/`}
              className="flex flex-row justify-between items-center p-3 rounded-md bg-input animated"
            >
              <h1 className="flex flex-col gap-2">
                {chapter.name}
                <p className="text-primary/50">{chapter.createdAt}</p>
              </h1>
              <div className="flex flex-row gap-2">
                <Button className="flex flex-row gap-2" variant={"outline"}>
                  <FontAwesomeIcon icon={faFireAlt} /> {chapter.view}
                </Button>
                <Link href={`/pages/Manga/read/${id}/${chapter.id}`}>
                  <Button>Read</Button>
                </Link>
              </div>
            </Link>
          ) : (
            <Link
              href={`/pages/Manga/read/${id}/${chapter.id}`}
              className="flex justify-center items-center w-[150px] h-[50px] rounded-md bg-input hover:bg-white hover:text-black animated transition-colors duration-200"
            >
              <h1>
                {strippedChapterNames[index]}
              </h1>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default ChapterList;