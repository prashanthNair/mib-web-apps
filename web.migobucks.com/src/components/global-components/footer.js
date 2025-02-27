import React, { Component } from "react";
import { Link } from "react-router-dom";
import footerdata from "../../data/footerdata.json";
import Typography from "@mui/material/Typography";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone'; 

class Footer extends Component {
  componentDidMount() {
    let publicUrl = process.env.PUBLIC_URL + "/";

    const minscript = document.createElement("script");
    minscript.async = true;
    minscript.src = publicUrl + "assets/js/main.js";

    document.body.appendChild(minscript);
  }

  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imgAlt = "footer logo";

    return (
      <div>
        <footer className="footer-area footer-area-2">
          <div className="container">
            <div className="footer-widget-area mg-top-120">
              <div className="row">
                <div className="col-lg-4">
                  <div className="footer-widget widget">
                    <div className="about_us_widget">
                      <a href="/" className="footer-logo">
                        <img
                          src={publicUrl + footerdata.footerlogo}
                          alt={imgAlt}
                        />
                      </a>
                    <div> 
                      {/* <div> <LocationOnIcon></LocationOnIcon></div> */}
                      <p className="address">
                        {footerdata.contactwidget.address} 
                      </p>
                      <div>
                    <p className="address"> {footerdata.contactwidget.city}{footerdata.contactwidget.state}</p> 
                      </div>  
                      <div style={{marginTop:40}}>
                      <Typography mb={2}>
                        Follow us
                      </Typography>
                      <ul className="social-icon">
                        {footerdata.socialicon.map((item, i) => (
                          <li key={i}>
                            <a
                              className="facebook"
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {/* <i className={item.icon} ></i> */}
                              <img src={publicUrl+item.iconUrl} alt="twitter"></img>
                            </a>
                          </li>
                        ))}
                      </ul>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="footer-widget widget ">
                    <label className="widget-title">
                      {footerdata.contactwidget.title}
                    </label>
                    <div className="contact_info_list"> 
                      <p>
                     <PhoneIcon sx={{marginRight:2,color:"#000000"}}></PhoneIcon>  {footerdata.contactwidget.contact}
                      </p>
                      <p>
                      <EmailIcon sx={{marginRight:2,color:"#000000"}}></EmailIcon>{footerdata.contactwidget.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="footer-widget widget widget_nav_menu">
                    <h4 className="widget-title">
                      {footerdata.quicklink.title}
                    </h4>
                    <ul className="riyaqas-nav">
                      {footerdata.quicklink.links.map((item, i) => (
                        <li key={i}>
                          <Link to={item.url}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="footer-widget widget widget_nav_menu">
                    <h4 className="widget-title">
                      {footerdata.needhelp.title}
                    </h4>
                    <ul className="riyaqas-nav">
                      {footerdata.needhelp.links.map((item, i) => (
                        <li key={i}>
                          <Link to={item.url}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* <div className="col-lg-3">
                  <div className="footer-widget widget">
                    <h4 className="widget-title">
                      {footerdata.latestnews.title}
                    </h4>
                    <div className="about_recent_post">
                      {footerdata.latestnews.items.map((item, i) => (
                        <div key={i} className="media">
                          <img src={publicUrl + item.image_url} alt={imgAlt} />
                          <div className="media-body">
                            <h6 className="riyaqas-nav">
                              <Link to={item.url}>{item.title}</Link>
                            </h6>
                            <span>{item.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="copyright-inner">
            <div
              className="copyright-text"
              dangerouslySetInnerHTML={{ __html: footerdata.copyrighttext }}
            ></div>
          </div>
        </footer>
        <div className="back-to-top">
          <span className="back-top">
            <i className="fa fa-angle-up"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default Footer;
