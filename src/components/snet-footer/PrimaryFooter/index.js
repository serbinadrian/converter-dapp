import propTypes from 'prop-types';
import WhiteSnetLogo from '../../../assets/images/WhiteLogo.svg';
import FooterLinks from './FooterLinks';
import FooterLink from '../FooterLink';
import { useStyles } from './styles';

const PrimaryFooter = ({ leftData, mainData }) => {
  const classes = useStyles();
  return (
    <div className={classes.PrimaryFooter}>
      <div className={classes.LeftData}>
        <div className={classes.FooterLogo}>
          <h1>
            <a href="/" title="SingularityNET">
              <img src={WhiteSnetLogo} alt="SingularityNET" />
            </a>
          </h1>
        </div>
        <ul className={classes.footerLogoSection}>
          {leftData.map((item) => (
            <FooterLink key={item.label} image={item.image} link={item.link} label={item.label} internalLink={item.internalLink} />
          ))}
        </ul>
      </div>
      <FooterLinks data={mainData} />
    </div>
  );
};

PrimaryFooter.propTypes = {
  leftData: propTypes.array.isRequired,
  mainData: propTypes.array.isRequired
};

export default PrimaryFooter;
