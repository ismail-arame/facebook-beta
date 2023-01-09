import { ArrowRight, Plus } from "../../../svg";
import "./style.css";
import { stories } from "../../../data/home";
import Story from "./Story";
import { useMediaQuery } from "react-responsive";

export default function Stories({ user }) {
  const isLaptop = useMediaQuery({
    query: "(max-width: 1366px)",
  });

  const query1150px = useMediaQuery({
    query: "(max-width: 1150px)",
  });
  const query1020px = useMediaQuery({
    query: "(max-width: 1020px)",
  });
  const query900px = useMediaQuery({
    query: "(max-width: 900px)",
  });
  const query735px = useMediaQuery({
    query: "(max-width: 735px)",
  });
  const query600px = useMediaQuery({
    query: "(max-width: 600px)",
  });
  const query450px = useMediaQuery({
    query: "(max-width: 450px)",
  });
  const query360px = useMediaQuery({
    query: "(max-width: 360px)",
  });

  const maxStories = query360px
    ? 2
    : query450px
    ? 3
    : query735px
    ? 4
    : query900px
    ? 5
    : query1020px
    ? 4
    : query1150px
    ? 5
    : isLaptop
    ? 4
    : 5;

  console.log("maxStories : ", maxStories);

  return (
    <div
      className={`stories ${
        query360px
          ? "mobile_360px_stories"
          : query450px
          ? "mobile_450px_stories"
          : query600px
          ? "mobile_600px_stories"
          : query735px
          ? "mobile_stories"
          : query900px
          ? "desktop_stories"
          : query1020px
          ? "laptop_stories"
          : query1150px
          ? "desktop_stories"
          : isLaptop
          ? "laptop_stories"
          : "desktop_stories"
      }`}
    >
      <div className="create_story_card">
        <img
          src={user.picture}
          alt="profile img"
          className="create_story_img"
        />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="create_story_text">Create Story</div>
      </div>
      {isLaptop
        ? stories
            .slice(0, maxStories)
            .map((story, i) => <Story story={story} key={i} />)
        : stories
            .slice(0, maxStories)
            .map((story, i) => <Story story={story} key={i} />)}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
}
