import { Fragment } from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { Link } from '@mui/material';
import Divider from '@mui/material/Divider';
import styles from './styles';
import Paths from '../../router/paths';

const HelpLinks = () => {
  const links = [
    { name: 'Bridge Overview', url: Paths.BridgeOverview },
    { name: 'Selecting Networks ', url: Paths.SelectingNetworks },
    { name: 'Choosing Assets', url: Paths.ChoosingAssets },
    { name: 'Initiating Conversion', url: Paths.InitiatingConversions },
    { name: 'Viewing History', url: Paths.ViewingHistory }
  ];

  return (
    <List>
      {links.map((link) => {
        return (
          <Fragment key={link.name}>
            <ListItemText style={styles.listItem}>
              <Link target="_blank" rel="noopener noreferrer" href={link.url} color="inherit" underline="none" style={styles.listItemText}>
                {link.name}
              </Link>
            </ListItemText>
            <Divider style={styles.listDivider} />
          </Fragment>
        );
      })}
    </List>
  );
};

export default HelpLinks;
