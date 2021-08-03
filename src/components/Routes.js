import { AccordionDetails } from '@material-ui/core';
import { Home, ContentPaste, Notifications, AccountCircle } from '@material-ui/icons';
import Book from './Book';
import Login from './Login';

const Routes = [
	{
		path: '/carti-fizice',
		sidebarName: 'Carti fizice',
		icon: Home,
		needsLogin: false,
	},
	{
		path: '/carti-electronice',
		sidebarName: 'Carti electronice',
		icon: AccountCircle,
		needsLogin: false,

	},
	{
		path: '/carti-audio',
		sidebarName: 'Carti audio',
		icon: Notifications,
		needsLogin: false,

	},
	{
		path: '/cartile-mele',
		sidebarName: 'Cartile mele',
		icon: Notifications,
		needsLogin: true,

	}
];

export default Routes;