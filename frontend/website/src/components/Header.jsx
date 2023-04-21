import { AddCircle, Search } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShareLocationRoundedIcon from '@mui/icons-material/ShareLocationRounded';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { getUser, isUserSignedIn } from '../util';
import BGLogo from './BGLogo';

const pages = ['Search'];
const icons = [<Search />];
const urls = ['search'];


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(isUserSignedIn());

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event) => {
        console.log('page', event)
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { authed, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const goToProfile = () => {
        navigate("/profile");
    };

    const signup = () => {
        navigate('/registration');
    }

    const login = () => {
        navigate('/login');
    }

    return (
        <AppBar position="static" style={{ justifyContent: 'center', height: '9vh' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <GroupWorkIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
                    <BGLogo />
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={page}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    navigate(urls[index]);
                                }}
                                sx={{ my: 2, color: 'white' }}
                            >
                                {icons[index]} <Typography textAlign="center" px={2}>{page}</Typography>
                            </Button>
                        ))}
                    </Box>
                    {isUserLoggedIn ?
                        (<Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={getUser().firstName} src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem key='profile' onClick={goToProfile}>
                                    <AccountCircleIcon /><Typography textAlign="center">&nbsp;Profile</Typography>
                                </MenuItem>
                                <MenuItem key='logout' onClick={handleLogout}>
                                    <LogoutIcon /> <Typography textAlign="center">&nbsp;Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>) :
                        <Box sx={{ flexGrow: 0 }}>
                            <Button
                                key={'logout'}
                                onClick={login}
                                sx={{ my: 2, color: 'white' }}
                            >
                                <LockOpenIcon /> <Typography textAlign="center" px={2}>Sign In</Typography>
                            </Button>
                            <Button
                                key={'logout'}
                                onClick={signup}
                                sx={{ my: 2, color: 'white' }}
                            >
                                <HowToRegIcon /> <Typography textAlign="center" px={2}>Sign UP</Typography>
                            </Button>

                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;