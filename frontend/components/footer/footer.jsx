import React from "react";
import { Link } from 'react-router-dom';
const Footer = () => {

return(<div className="footer">
<div className="hr"></div>
<div className="footer-made-in-section"> Made with&nbsp;<img style={{width:"20px",height:"20px"}} src={window.heartyellow2}/>&nbsp;in San Francisco</div>
<div className="footer-legal-section">
  <div>Developed by Maxim Grebennikov &nbsp; |&nbsp; Fremont, CA &nbsp; |&nbsp; SF Bay Area &nbsp;| &nbsp;Phone: 510-497-4142​ &nbsp;|&nbsp; <a href="https://github.com/clustermass" target="blank">Git</a> &nbsp;| &nbsp;<a href="https://www.linkedin.com/in/maxim-grebennikov/" target="blank">LinkedIn</a></div>
  <div>This website is inspired by the original &nbsp;<a href="https://www.kitchenstories.com" target="blank" >Kitchen Stories</a> </div>



</div>
</div>)
}

export default Footer
