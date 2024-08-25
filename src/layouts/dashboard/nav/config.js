import {Home as HomeIcon} from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import QuizIcon from '@mui/icons-material/Quiz';
// component
import SvgColor from '../../../components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Reports',
    path: '/',
    icon: <HomeIcon />,
    children : [
      {
        title: 'Report 1',
        // path: '/',
        // icon: <HomeIcon />,
      },
      {
        title: 'Report 2',
        // path: 'test',
        // icon: <HomeIcon />,
      }
    ]
  }
  // ,
  // {
  //   title: 'Settings',
  //   path: '/',
  //   icon: <SettingsIcon />,
  // },
  // {
  //   title: 'Help',
  //   path: '/',
  //   icon: <QuizIcon />,
  // }
];

export default navConfig;
