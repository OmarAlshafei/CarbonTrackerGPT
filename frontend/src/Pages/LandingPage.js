
import './LandingPage.css';
import {Link} from 'react-router-dom';
import TypeEffect from '../Components/TypeEffect';

function LandingPage() {
  

  return (
        <div>
            <TypeEffect/>
            <div id="buttonWrapper">
                
                    <div id="startButton"><Link to="/home" id="LinktoHome"><p id = "buttonText">Start</p></Link></div>
                
            </div>
        </div>
  );
}

export default LandingPage;
