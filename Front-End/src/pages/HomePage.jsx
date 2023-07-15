import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link , Route, Routes} from 'react-router-dom';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountIcon from '@mui/icons-material/AccountCircle';
import PrivacyIcon from '@mui/icons-material/PrivacyTip';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FAQIcon from '@mui/icons-material/Help';
import TaskDependenciesIcon from '@mui/icons-material/DeviceHub';
import TaskLabelsIcon from '@mui/icons-material/Label';
import TaskAttachmentsIcon from '@mui/icons-material/AttachFile';
import TaskRemindersIcon from '@mui/icons-material/AccessTime';
import TaskAnalyticsIcon from '@mui/icons-material/Assessment';
import Logo from '../assets/puppycup.jpg';
import NewProject from './NewProject';
import ExistingProjects from './ExistingProjects';
import Dashboard from './Dashboard';
import Account from './Account';
import './homepage.css';
import { useNavigate } from "react-router-dom";
import { logOutuser } from "../redux/apiCall";
import { useSelector,useDispatch } from 'react-redux';




function HomePage() {
  const dispatch = useDispatch();
    console.log(useSelector((state)=>state.user.user));
    const username = useSelector((state)=>state.user?.user?.username)
  
    const navigate = useNavigate();

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuClick = (label) => {
    if (openSubMenu === label) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(label);
    }
  };

  const [collapsed, setCollapsed] = useState(false);

  const handleWindowResize = () => {
    setCollapsed(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleLogout = () => {
    console.log('logging out');
    logOutuser(dispatch);
     navigate("/login");
};

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'stretch' }}>
      <Sidebar className='app' style={{ width: '10vw !important' }} collapsed={collapsed} transitionDuration={800}>
        <Menu>
          <MenuItem className='menu1' title='collapse sidebar' icon={<MenuRoundedIcon onClick={() => setCollapsed(!collapsed)} />}>
            <h2>TaskPro</h2>
          </MenuItem>

          <img src={Logo} style={{ height: '14vh', width: '7vw', marginLeft: '55px', marginTop: '10px', borderRadius: '50%' }} alt="logo-TaskPro" />

          <MenuItem icon={<DashboardIcon />} title="Dashboard" component={<Link to='dashboard' />}>Dashboard</MenuItem>

          <SubMenu icon={<FolderOpenIcon />} title="Projects" label="Projects" onClick={() => handleSubMenuClick("Projects")}>
            <MenuItem className='new-project' icon={<AddIcon />} component={<Link to='newProject' />}>New project</MenuItem>
            <MenuItem icon={<FolderIcon />} component={<Link to='existingProjects' />}>Existing projects</MenuItem>
          </SubMenu>

          <SubMenu title="Settings" label="Settings" icon={<SettingsIcon />} open={openSubMenu === "Settings"} onClick={() => handleSubMenuClick("Settings")}>
            <MenuItem icon={<AccountIcon />} component={<Link to='account' />}>Account</MenuItem>
            <MenuItem icon={<PrivacyIcon />} component={<Link to='privacy' />}>Privacy</MenuItem>
            <MenuItem icon={<NotificationsIcon />} component={<Link to='notifications' />}>Notifications</MenuItem>
          </SubMenu>

          <MenuItem title="Logout" onClick={handleLogout} icon={<LogoutRoundedIcon />} >Logout</MenuItem>

          <MenuItem title="FAQ" icon={<FAQIcon />} component={<Link to='FAQ' />} >FAQ</MenuItem>

         
          <SubMenu title="Additional Features" label="Additional Features" open={openSubMenu === "AdditionalFeatures"} onClick={() => handleSubMenuClick("AdditionalFeatures")}>
            <MenuItem icon={<TaskDependenciesIcon />} component={<Link to='taskDependencies' />}>Task Dependencies</MenuItem>
            <MenuItem icon={<TaskLabelsIcon />} component={<Link to='taskLabels' />}>Task Labels and Tags</MenuItem>
            <MenuItem icon={<TaskAttachmentsIcon />} component={<Link to='taskAttachments' />}>Task Attachments</MenuItem>
            <MenuItem icon={<TaskRemindersIcon />} component={<Link to='taskReminders' />}>Task Reminders</MenuItem>
            <MenuItem icon={<TaskAnalyticsIcon />} component={<Link to='taskAnalytics' />}>Task Analytics and Reports</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      <section className="homepage-routes">
        {/* <Dashboard /> */}
        <Routes>
      <Route path="/newProject" element={<NewProject />} />
      <Route path='/existingProjects' element={<ExistingProjects />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/account' element={<Account />} />
      </Routes>
      </section>

    </div>
  );
}

export default HomePage;
