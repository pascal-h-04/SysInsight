import "./AboutUsStyle.css";
const AboutUs = ({ isLoggedIn, isAdmin, userID}) => {
  return (
    <div id="about-us">
      <div id="about-us-heading">Unser Team</div>
      <img id="about-us-img" src="./assets/OurTeam.png" alt="About us" />
    </div>
  );
};
export default AboutUs;
