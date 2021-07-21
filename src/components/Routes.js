import { AccordionDetails } from '@material-ui/core';
import { Home, ContentPaste, Notifications, AccountCircle } from '@material-ui/icons';
import Book from './Book';
import Login from './Login';

const Routes = [
	{
		path: '/carti-fizice',
		sidebarName: 'Carti fizice',
		icon: Home,
		component: Book
	},
	{
		path: '/carti-electronice',
		sidebarName: 'Carti electronice',
		icon: AccountCircle,
		component: Book
	},
	{
		path: '/carti-audio',
		sidebarName: 'Carti audio',
		icon: Notifications,
		component: Book
	}
];

export default Routes;