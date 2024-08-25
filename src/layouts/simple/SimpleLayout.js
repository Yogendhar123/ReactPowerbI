import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// components
// import Logo from '../../components/logo';
// ----------------------------------------------------------------------

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));
const logo = (
  <Box
    component="img"
    src="/assets/homeLogo.png" alt="logo" loading='lazy'
    sx={{ width: 40, height: 40 }}
  />
);
// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <StyledHeader>
        {/* <Logo /> */}
        {logo}
      </StyledHeader>

      <Outlet />
    </>
  );
}
