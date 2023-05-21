import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useClickOutside from "../../helpers/clickOutside";

export default function PostMenu({
  userId,
  postUserId,
  imagesLength,
  setShowPostMenu,
}) {
  //testing if the current logged in user is the owner of the post or not
  //so we can show menu items according to whether the logged in user is the owner of the post or not
  const [test, setTest] = useState(userId === postUserId ? true : false);

  //outside menu click
  const postMenu = useRef(null);
  useClickOutside(postMenu, () => setShowPostMenu((prev) => !prev));
  return (
    <ul className="post_menu post_menu_scrollbar" ref={postMenu}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <MenuItem
        icon="save_icon"
        title="Save Post"
        subtitle="Add this to your saved items."
      />
      <div className="line"></div>
      {test && <MenuItem icon="edit_icon" title="Edit Post" />}
      {imagesLength && <MenuItem icon="download_icon" title="Download" />}
      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {test && <MenuItem img="../../../icons/lock.png" title="Edit Audience" />}
      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {!test && (
        <MenuItem
          icon="turnOnNotifications_icon"
          title="Turn on notifications for this post"
        />
      )}
      {test && (
        <MenuItem
          icon="turnOffTranslations_icon"
          title="Turn off translations"
        />
      )}
      {test && <MenuItem icon="date_icon" title="Edit date" />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      <div className="line"></div>
      {test && <MenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
        <MenuItem
          icon="trash_icon"
          title="Move to trash"
          subtitle="Items in your trash are deleted after 30 days"
        />
      )}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="I'm concerned about this post"
        />
      )}
    </ul>
  );
}
