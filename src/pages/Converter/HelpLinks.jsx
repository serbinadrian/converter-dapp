import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import styles from './styles';

const HelpLinks = () => {
  const links = [
    { name: 'Bridge Overview', url: '' },
    { name: 'Selecting Networks ', url: '' },
    { name: 'Choosing Assets', url: '' },
    { name: 'Initiating Conversion', url: '' },
    { name: 'Viewing History', url: '' }
  ];

  return (
    <>
      <List>
        {links.map((link) => {
          return (
            <>
              <ListItemText style={styles.listItem} primary={link.name} />
              <Divider />
            </>
          );
        })}
      </List>
      <Typography variant="caption" color="white.main" marginTop={3}>
        View all help topics
      </Typography>
    </>
  );
};

export default HelpLinks;
