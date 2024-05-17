import SpinLoadingPage from "react-loading";

function LoadingPage() {
  return (
    <div className="popup-content">
      <h3>Loading the questions, please wait...</h3>
      <SpinLoadingPage type="spin" color="#d98b88" height={200} width={100} />
    </div>
  );
}

export default LoadingPage;
