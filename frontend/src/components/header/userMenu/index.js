import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import SettingsPrivacy from "./SettingsPrivacy";
import HelpSupport from "./HelpSupport";
import DisplayAccessibility from "./DisplayAccessibility";
import PrimaryMenu from "./PrimaryMenu";
import KeyboardMenu from "./KeyboardMenu";

export default function UserMenu({ user, setShowUserMenu }) {
  //if (visible === 0) => the first user menu is shown
  //if (visible === 1) => the Settings and privacy menu is shown
  //if (visible === 2) => the Help & support menu is shown
  //if (visible === 3) => the Display & accessibility menu is shown

  const [visible, setVisible] = useState(0);

  const [menuHeight, setMenuHeight] = useState(null);

  const [isKeyboardMenuActive, setIsKeyboardMenuActive] = useState(false);

  const calcHeight = function (el) {
    const height = el.offsetHeight + 20;
    setMenuHeight(height);
  };

  return (
    <div className="mmenu" style={{ height: menuHeight }}>
      <CSSTransition
        in={visible === 0}
        unmountOnExit
        timeout={300}
        onEnter={calcHeight}
        classNames="menu-primary"
      >
        <PrimaryMenu user={user} setVisible={setVisible} />
      </CSSTransition>

      <CSSTransition
        in={visible === 1}
        unmountOnExit
        timeout={300}
        classNames="menu-settings-privacy"
        onEnter={calcHeight}
      >
        <SettingsPrivacy setVisible={setVisible} />
      </CSSTransition>

      <CSSTransition
        in={visible === 2}
        unmountOnExit
        timeout={300}
        classNames="menu-help-support"
        onEnter={calcHeight}
      >
        <HelpSupport setVisible={setVisible} />
      </CSSTransition>

      <CSSTransition
        in={visible === 3}
        unmountOnExit
        timeout={6000}
        classNames={
          isKeyboardMenuActive
            ? "menu-display-accessibility-reverse"
            : "menu-display-accessibility"
        }
        onEnter={calcHeight}
        // onExit
      >
        <DisplayAccessibility
          setVisible={setVisible}
          setIsKeyboardMenuActive={setIsKeyboardMenuActive}
        />
      </CSSTransition>
      <CSSTransition
        in={visible === 4}
        unmountOnExit
        timeout={300}
        classNames="menu-keyboard"
        onEnter={calcHeight}
      >
        <KeyboardMenu
          setVisible={setVisible}
          setIsKeyboardMenuActive={setIsKeyboardMenuActive}
        />
      </CSSTransition>
    </div>
  );
}
