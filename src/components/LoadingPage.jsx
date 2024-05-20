import SpinLoadingPage from "react-loading";
import LandingPageCSS from "../styles/landingpage.module.css";
function LoadingPage() {
  return (
    <div className={LandingPageCSS.landingContainer}>
      <div className={LandingPageCSS.popupContent}>
        <h3 className={LandingPageCSS.waitLetter}>
          Loading the questions, please wait...
        </h3>
        <SpinLoadingPage
          className={LandingPageCSS.spin}
          type="spin"
          color="#d98b88"
          height={200}
          width={100}
        />
      </div>
    </div>
  );
}

export default LoadingPage;
