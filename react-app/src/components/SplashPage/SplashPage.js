import './SplashPage.css';
import { NavLink } from 'react-router-dom';

const SplashPage = () => {
    return (
        <div className='splash-page-container'>
            <div className='splash-page-text-container'>
                <h1 className='splash-page-text-title'>Investing for Everyone</h1>
                <span className='splash-page-text-body'>Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations and fees apply.</span>
                <div className='splash-signup-container'>
                    <NavLink className='splash-signup' to='/signup' exact={true} activeClassName='active'>
                        <span className='splash-signup-span'>Sign Up</span>
                    </NavLink>
                </div>
            </div>
            <div className='splash-page-image-container'>
                <img class="splash-page-img" src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/2x__ff9c36e27d7018cf707b95d8675793a3.png" alt="" />
            </div>
        </div>
    )
}

export default SplashPage
