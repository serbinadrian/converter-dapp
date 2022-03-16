import propTypes from 'prop-types';

const FooterLink = ({ label, link, internalLink }) => {
  return (
    <li>
      <a href={link} title={label} target={internalLink ? '_self' : '_blank'} rel="noopener noreferrer">
        {label}
      </a>
    </li>
  );
};

FooterLink.propTypes = {
  label: propTypes.string.isRequired,
  link: propTypes.string.isRequired,
  internalLink: propTypes.bool.isRequired
};

export default FooterLink;
