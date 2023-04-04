import { ChakraProvider, chakra } from '@chakra-ui/react'
import Head from 'next/head';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    const title = `Todo\u211D`;

    return (
        <ChakraProvider>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="TodoList App Made In Next.js" />
                <title>{title}</title>
            </Head>
            <chakra.div 
                display="flex" 
                flexDirection="column" 
                minHeight="100vh"
                bg="#FFFFFF"
            >
                <Component {...pageProps} />
            </chakra.div>
        </ChakraProvider>
    );
}
