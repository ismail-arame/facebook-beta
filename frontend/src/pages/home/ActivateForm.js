// https://www.npmjs.com/package/react-spinners
import PropagateLoader from "react-spinners/PropagateLoader";
import { useMediaQuery } from "react-responsive";

export default function ActivateForm({ type, header, text, loading }) {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const isSmallMobile = useMediaQuery({
    query: "(max-width: 350px)",
  });
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup_header ${
            type === "success" ? "success_text" : "error_text"
          }`}
        >
          {header}
        </div>
        <div className="popup_message">{text}</div>
        <div className="activateForm_loader">
          <PropagateLoader
            color="#1876f2"
            loading={loading}
            size={isSmallMobile ? 24 : isMobile ? 27 : 30}
          />
        </div>
      </div>
    </div>
  );
}
