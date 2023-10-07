
import './LandingPage.css';
import {Link} from 'react-router-dom';
import TypeEffect from '../Components/TypeEffect';

function LandingPage() {
  

  return (
        <div>
            <TypeEffect/>
            <div id="buttonWrapper">
                <Link to="/home">
                    <div id="startButton"><p id = "buttonText">Start</p></div>
                </Link>
            </div>
        </div>
  );
}

export default LandingPage;
