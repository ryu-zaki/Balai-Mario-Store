
import homeGray from '../assets/admin_panel/home-gray.png';
import homeDark from '../assets/admin_panel/home-dark.png';
import usersDark from '../assets/admin_panel/users-dark.png';
import usersGray from '../assets/admin_panel/users-gray.png';
import truckGray from '../assets/admin_panel/truck-gray.png';
import truckDark from  '../assets/admin_panel/truck-dark.png';
import productsGray from '../assets/admin_panel/products-gray.png';
import messageGray from '../assets/admin_panel/message-gray.png';
import settingsGray from '../assets/admin_panel/settings-gray.png';

const createNavObj = (imgDark, imgGray, navName) => ({
    imgDark, imgGray, navName
})


export const navigations = [
    createNavObj(homeDark, homeGray, "Home"),
    createNavObj(usersDark, usersGray , "Users"),
    createNavObj(truckDark, truckGray, "Orders"),
    createNavObj(null, productsGray, "Products"),
    createNavObj(null, messageGray, "Chats"),
    createNavObj(null, settingsGray, "Settings")
];
