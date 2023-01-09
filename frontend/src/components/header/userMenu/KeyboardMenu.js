export default function KeyboardMenu({ setVisible, setIsKeyboardMenuActive }) {
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="arrow_back_circle hover3"
          onClick={() => {
            setVisible(3);
            setTimeout(() => {
              setIsKeyboardMenuActive(false);
            }, 300);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Keyboard
      </div>

      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>See all keyboard shortcuts</span>
      </div>

      <div className="mmenu_main" style={{ paddingLeft: "6px" }}>
        <div
          className="small_circle"
          style={{ width: "50px", alignSelf: "flex-start" }}
        >
          <i className="star_icon"></i>
        </div>
        <div className="mmenu_col">
          <div className="mmenu_span3">
            Use single-character keyboard shortcuts
          </div>
          <div className="mmenu_span4">
            Use single-character shortcuts to perform common actions.
          </div>
        </div>
      </div>
      <label htmlFor="keyboardShortcutsOff" className="hover1">
        <span>Off</span>
        <input
          type="radio"
          name="keyboardShortcuts"
          id="keyboardShortcutsOff"
        />
      </label>
      <label htmlFor="keyboardShortcutsOn" className="hover1">
        <span>On</span>
        <input type="radio" name="keyboardShortcuts" id="keyboardShortcutsOn" />
      </label>
    </div>
  );
}
