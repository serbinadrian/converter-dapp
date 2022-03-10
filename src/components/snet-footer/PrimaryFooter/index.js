import propTypes from 'prop-types';
import WhiteSnetLogo from '../../../assets/images/WhiteLogo.svg';
import FooterLinks from './FooterLinks';
import FooterLink from '../FooterLink';

const PrimaryFooter = ({ leftData, mainData }) => {
  return (
    <div>
      <div>
        <div>
          <h1>
            <a href="/" title="SingularityNET">
              <img src={WhiteSnetLogo} alt="SingularityNET" />
            </a>
          </h1>
        </div>
        <ul>
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
