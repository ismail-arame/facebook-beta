export default function DisplayAccessibility({
  setVisible,
  setIsKeyboardMenuActive,
}) {
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div className="arrow_back_circle hover3" onClick={() => setVisible(0)}>
          <i className="arrow_back_icon"></i>
        </div>
        Display & Accessibility
      </div>
      <div className="mmenu_main" style={{ paddingLeft: "6px" }}>
        <div
          className="small_circle"
          style={{ width: "67px", alignSelf: "flex-start" }}
        >
          <i className="dark_filled_icon"></i>
        </div>
        <div className="mmenu_col">
          <div className="mmenu_span3">Dark Mode</div>
          <div className="mmenu_span4">
            Adjust the appearence of Facebook to reduce glare and give your eyes
            a break.
          </div>
        </div>
      </div>
      <label htmlFor="darkOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="dark" id="darkOff" />
      </label>
      <label htmlFor="darkOn" className="hover1">
        <span>On</span>
        <input type="radio" name="dark" id="darkOn" />
      </label>

      <div className="mmenu_main" style={{ paddingLeft: "6px" }}>
        <div
          className="small_circle"
          style={{ width: "57px", alignSelf: "flex-start" }}
        >
          <i className="compact_icon"></i>
        </div>
        <div className="mmenu_col">
          <div className="mmenu_span3">Compact Mode</div>
          <div className="mmenu_span4">
            Make your font size smaller so more content can fit on the screen.
          </div>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="compact" id="compactOff" />
      </label>
      <label htmlFor="compactOn" className="hover1">
        <span>On</span>
        <input type="radio" name="compact" id="compactOn" />
      </label>
      <div
        className="mmenu_item hover3"
        onClick={() => {
          setVisible(4);
          setIsKeyboardMenuActive(true);
        }}
      >
        <div className="small_circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>Keyboard</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
}
