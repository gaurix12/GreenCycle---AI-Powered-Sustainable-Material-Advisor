import React from 'react';
import { Link} from 'react-router-dom';

function Navbar(){
    return(
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/chatbot'>Chatbot</Link>
        <Link to='/image-detection'>Detect Trash Image</Link>
    </nav>
    );
}
export default Navbar;