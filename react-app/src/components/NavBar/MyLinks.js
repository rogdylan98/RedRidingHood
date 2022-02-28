import './MyLinks.css';

const MyLinks = () => {

    const goToLinkedIn = e => {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/roger-s-59133b107/');
    }

    const goToGithub = e => {
        e.preventDefault();
        window.open('https://github.com/rogdylan98/RedRidingHood');
    }

    return (
        <div className='my_links'>
            <button
                className='navbar_buttons'
                type='button'
                onClick={goToLinkedIn}>Linkedin
            </button>
            <button
                className='navbar_buttons'
                type='button'
                onClick={goToGithub}>Github
            </button>
        </div>
    )
}

export default MyLinks
