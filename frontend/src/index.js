import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { extendTheme } from '@chakra-ui/react';
import { UserProvider } from './providers/userContext';
import { Toaster } from 'react-hot-toast';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
	colors: {
		brand: {
			100: '#D57FA7',
			200: '#D57FA7',
			300: '#D57FA7',
			400: '#D57FA7',
			500: '#D57FA7',
			600: '#D57FA7',
			700: '#D57FA7',
			800: '#D57FA7',
			900: '#D57FA7',
		},
	},
});

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<BrowserRouter>
			<UserProvider>
				<Toaster />
				<App />
			</UserProvider>
		</BrowserRouter>
	</ChakraProvider>,
	document.getElementById('root')
);
