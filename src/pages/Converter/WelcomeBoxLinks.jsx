import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import styles from './styles';

const WelcomeBoxLinks = () => {
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
            <ListItem divider>
              <ListItemText style={styles.listItem} primary={link.name} />
            </ListItem>
          );
        })}
      </List>
      <Typography variant="caption" color="white.main" marginTop={3}>
        View all help topics
      </Typography>
    </>
  );
};

export default WelcomeBoxLinks;
