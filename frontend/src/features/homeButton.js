import { useNavigate } from 'react-router-dom';
import '../features.css';

const HomeButton = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    /*const buttonStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease'
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
    };*/

    return (
        <div>
            <button className='Home' onClick={handleHomeClick}>Home</button>
        </div>
    );
};


export default HomeButton;