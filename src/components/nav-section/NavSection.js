// import PropTypes from 'prop-types';
// import { NavLink as RouterLink } from 'react-router-dom';
// // @mui
// import { Box, List, ListItemText } from '@mui/material';
// //
// import { StyledNavItem, StyledNavItemIcon } from './styles';

// // ----------------------------------------------------------------------

// NavSection.propTypes = {
//   data: PropTypes.array,
// };

// export default function NavSection({ data = [], ...other }) {
//   return (
//     <Box {...other}>
//       <List disablePadding sx={{ p: 1 }}>
//         {data.map((item, index )=> (
//           <NavItem key={item.title} item={item} />
//         ))}
//       </List>
//     </Box>
//   );
// }

// // ----------------------------------------------------------------------

// NavItem.propTypes = {
//   item: PropTypes.object,
// };

// function NavItem({ item }) {
//   const { title, path, icon, info } = item;

//   return (
//     <StyledNavItem
//       component={RouterLink}
//       to={path}
//       sx={{
//         '&.active': {
//           color: 'text.primary',
//           bgcolor: 'action.selected',
//           fontWeight: 'fontWeightBold',
//         },
//       }}
//     >
//       <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

//       <ListItemText disableTypography primary={title} />

//       {info && info}
//     </StyledNavItem>
//   );
// }

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, ListItem, Collapse, ListItemButton } from '@mui/material';

//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
// import { userData } from '../../../common/spinLoader';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};



export default function NavSection({ data = [], ...other }) {
  return (
       <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item, index )=> (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { title, path, icon, info, children, show } = item;
  
    return (
      <List>
        <StyledNavItem
          component={RouterLink}
          onClick={handleClick}
          sx={{
            '&:hover': {
              color: 'text.primary',
              bgcolor: 'rgba(255,255,255, 0.01)',
              fontWeight: 'fontWeightBold',
            },
          }}
        >
          <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
          <ListItemText disableTypography primary={title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </StyledNavItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((subData) =>
              <StyledNavItem
                component={RouterLink}
                to={subData.path}
                sx={{
                  '&.active': {
                    color: 'text.primary',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'common.black' : 'common.white',
                    fontWeight: 'fontWeightBold',
                  },
                  '&:hover': {
                    color: 'text.primary',
                    bgcolor: 'rgba(255,255,255, 0.01)',
                    fontWeight: 'fontWeightBold',
                  },
                }}
              >

                <ListItemButton>
                  <ListItemText disableTypography primary={subData.title} />
                </ListItemButton>
              </StyledNavItem>
            )}

          </List>
        </Collapse>
      </List>
    )

  // } else {
  //   return (
  //     <StyledNavItem
  //       component={RouterLink}
  //       to={path}
  //       sx={{
  //         '&.active': {
  //           color: 'text.primary',
  //           bgcolor: (theme) =>
  //             theme.palette.mode === 'dark' ? 'common.black' : 'common.white',
  //           fontWeight: 'fontWeightBold',
  //         },
  //         '&:hover': {
  //           color: 'text.primary',
  //           bgcolor: 'rgba(255,255,255, 0.01)',
  //           fontWeight: 'fontWeightBold',
  //         },
  //       }}
  //     >
  //       <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

  //       <ListItemText disableTypography primary={title} />

  //       {info && info}
  //     </StyledNavItem>
  //   );
  // }


}

