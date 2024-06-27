import {
  FaFacebookSquare,
  FaLinkedin,
  FaGithubSquare,
  FaTwitterSquare,
} from "react-icons/fa";

import { SiUpwork } from "react-icons/si";

const data = [
  {
    id: 3,
    icon: <FaGithubSquare className="social-icon" />,
    url: "https://github.com/emontes",
  },
  {
    id: 4,
    icon: <SiUpwork className="social-icon" />,
    url: "https://www.upwork.com/freelancers/~011b1de3cb73e46439",
  },
  {
    id: 2,
    icon: <FaLinkedin className="social-icon" />,
    url: "https://www.linkedin.com/in/enrique-montes-araujo/",
  },
  // {
  //   id: 1,
  //   icon: <FaFacebookSquare className="social-icon"></FaFacebookSquare>,
  //   url: "https://www.facebook.com/enriqueadelino",
  // },

  // {
  //   id: 5,
  //   icon: <FaTwitterSquare className="social-icon"></FaTwitterSquare>,
  //   url: "https://twitter.com/el_ade",
  // },
];

export default data;
