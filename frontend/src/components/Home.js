import { Fade } from "react-awesome-reveal";
import { NavLink } from "react-router-dom";
function Home() {
  return (
    <>
      <Fade direction="up" duration="1200">
        <div className="landing--container">
          <h1 className="landing--title">Hoober</h1>
          <h3 style={{ fontSize: "30px" }}>
            <em>Find UVA rides anywhere and everywhere</em>
          </h3>
        </div>
      </Fade>
      <Fade duration={1500} fraction={0}>
        <div className="about--section">
          <h1>What is Hoober?</h1>
          <p className="about--description">
            During my UVA first year, I realized how hard it was to sometimes
            find rides back home to Northern Virginia, to other in-state cities
            like Richmond or Blacksburg, or even to out-of-state places. This is
            a web app that UVA students can use to connect to other people who
            are offering rides back who might share a hometown, or whose
            hometown might be on the way.
          </p>
        </div>
      </Fade>
      
        <div className="instructions">
          <h1>How It Works</h1>
          <Fade duration={1300}>
          <div className="instructions--components">
            <h2>Create an account first or log in to an existing one </h2>
            <NavLink to="/Loginform">
              <img src="/account.png" />
            </NavLink>
          </div>
          </Fade>
          <Fade duration={1300}>
          <div className="instructions--components">
            <h2>
              Browse the rides and requests pages and make your own offers
            </h2>
            <img style={{ width: "450px", height: "auto" }} src="/rides.png" />
          </div>
          </Fade>
          <Fade duration={1300}>
          <div className="instructions--components">
            <h2>
              Edit rides in your own personalized dashboard, with your contacts
            </h2>
            <img src="/dashboard.png" />
          </div>
          </Fade>
          <Fade duration={1300}>
          <div className="instructions--components">
            <h2>User messaging coming soon...</h2>
            <img src="/messages.png" />
          </div>
          </Fade>
        </div>
    <footer className="footer">Kingsley Kim 2023, All Rights Reserved</footer>

    </>
  );
}
export default Home;
