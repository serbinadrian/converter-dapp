import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

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
            <>
              <ListItem>
                <ListItemText primary={link.name} />
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
      <Typography variant="caption" marginTop={3}>
        View all help topics
      </Typography>
    </>
  );
};

export default WelcomeBoxLinks;
