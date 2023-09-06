import React from 'react';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CallIcon from '@mui/icons-material/Call';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export const SidebarData = [
    {
        id: 1,
        title: "Project",
        link: "/project",
        icon: <FingerprintIcon />
    },
    {
        id: 2,
        title: "Photography+",
        link: "/",
        icon: <CameraAltIcon />,
        item: [
            {
                id: 3,
                title: "Portrait / Love",
                link: "/portrait",
            },
            {
                id: 4,
                title: "Portrait / Street",
                link: "Street",
            },
            {
                id: 5,
                title: "Landscape",
                link: "/landscape",
            }
        ]
    },
    {
        id: 6,
        title: "About",
        link: "/about",
        icon: <AccountCircleIcon />
    },
    {
        id: 7,
        title: "Contact",
        link: "/contact",
        icon: <CallIcon />
    },
]

export const socialMediaicons = [
    {
        id: 200,
        icon: <MailOutlineIcon />,
        link: "http://gmx.net"
    },
    {
        id: 400,
        icon: <TwitterIcon />,
        link: "http://twitter.com"
    },
    {
        id: 300,
        icon: <InstagramIcon />,
        link: "http://instagram.com"
    },
]
