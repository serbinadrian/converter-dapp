import propTypes from 'prop-types';
import FooterLink from '../../FooterLink';

const FooterLinks = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <ul key={item.title}>
          <span>{item.title}</span>;
          {item.children.map((child) => (
            <FooterLink key={child.label} image={child.image} link={child.link} label={child.label} internalLink={child.internalLink} />
          ))}
        </ul>
      ))}
    </div>
  );
};

FooterLinks.propTypes = { data: propTypes.array.isRequired };

export default FooterLinks;
