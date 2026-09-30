import SpinnerSVG from "../../assets/Spinner.svg";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="Spinner">
      <img src={SpinnerSVG} alt="Spinner SVG" />
    </div>
  );
}

export default Spinner;
