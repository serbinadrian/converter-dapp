import propTypes from 'prop-types';
import FooterLink from '../../FooterLink';
import { useStyles } from './styles';

const FooterLinks = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.footerRightSideLinks}>
      {data.map((item) => (
        <ul key={item.title} className={classes.footerLinksList}>
          <span className={classes.footerLinksTitle}>{item.title}</span>;
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
