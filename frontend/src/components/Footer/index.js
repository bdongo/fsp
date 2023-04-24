import './Footer.css';
import linkedinLogo from '../../assets/LI-In-Bug.png'
import githubLogo from '../../assets/github-mark.png'

const Footer = () => {
    return (
        <footer>
            <a href="https://github.com/bdongo" target="_blank">
                <img src={githubLogo} />
            </a>
            <a href="https://www.linkedin.com/in/brandon-l/" target="_blank">
                <img src={linkedinLogo}/>
            </a>   
        </footer>
    )
       
}

export default Footer;
