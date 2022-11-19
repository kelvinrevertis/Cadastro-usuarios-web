import { Html, Head, Main, NextScript } from 'next/document'

export default function document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap" rel="stylesheet" />
            </Head>
            <body className='bg-gray-100 justify-center h-100 sm:ml-0 sm:mt-0 sm:flex-row sm:justify-start font-rubik m-0 w-full mx-auto grid grid-cols-1  gap-8'>
                <header className='bg-turquoise-600 w-full h-10'></header>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}