// components/Sidebar.js
import * as React from 'react';
import {
    Divider,
    Drawer,
    LinearProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import TableChartIcon from '@mui/icons-material/TableChart';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';

const SidebarContainer = styled(Drawer)(({ theme }) => ({
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        backgroundColor: '#282c34',
        color: '#ffffff',
    },
}));

const SidebarItem = styled(ListItem)(({ theme }) => ({
    '& .MuiListItemButton-root':{
        '&:hover': {
            borderRadius: '6px',
            backgroundColor: 'rgba(70,88,94,0.74)',
            color: '#b8c3d9',
            transition: 'background-color 0.3s, color 0.3s',
        },
        '&.Mui-selected': {
            borderRadius: '6px',
            backgroundColor: '#61dafb',
            color: '#282c34',
            '&:hover': {
                borderRadius: '6px',
                backgroundColor: '#61dafb',
            },
        },
    },
}));

const Sidebar = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <SidebarContainer variant="permanent" anchor="left">
            <List>
                <SidebarItem sx={{ height: '65px'}}>
                    <ListItemIcon><SportsGymnasticsIcon
                        sx={{ color: 'lightgray', fontSize: '30px', marginLeft: '15px', marginRight: '29px'}}
                    /></ListItemIcon>
                    <ListItemText primary="MoistLife"
                                  primaryTypographyProps={{
                                      fontSize: '20px',
                                      color: 'lightgray'
                                  }} />
                </SidebarItem>
                <Divider sx={{ borderColor: 'lightgray', width:'90%', margin: "10px auto" }}/>
                <SidebarItem
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemButton selected={selectedIndex === 0}>
                        <ListItemIcon><DashboardIcon style={{ color: selectedIndex === 0 ? '#282c34' : '#ffffff' }} /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </SidebarItem>
                <SidebarItem
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemButton selected={selectedIndex === 1}>
                        <ListItemIcon><PersonIcon style={{ color: selectedIndex === 1 ? '#282c34' : '#ffffff' }} /></ListItemIcon>
                        <ListItemText primary="Telegram 用户" />
                    </ListItemButton>

                </SidebarItem>
                <SidebarItem
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemButton selected={selectedIndex === 2}>
                        <ListItemIcon><TableChartIcon style={{ color: selectedIndex === 2 ? '#282c34' : '#ffffff' }} /></ListItemIcon>
                        <ListItemText primary="Telegram 机器人" />
                    </ListItemButton>
                </SidebarItem>
            </List>
        </SidebarContainer>
    );
};

export default Sidebar;
