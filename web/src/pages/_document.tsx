import { Html, Head, Main, NextScript } from 'next/document'
import { WhatsappLogo, GithubLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-react'

export default function document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap" rel="stylesheet" />
            </Head>

            <body className='bg-gray-100  justify-center h-100 sm:ml-0 sm:mt-0 sm:flex-row sm:justify-start font-rubik m-0 w-full mx-auto gap-8'>
                <header className='bg-turquoise-600 w-full flex justify-end pb-2 pr-4 text-sm text-white '>
                    <div>
                        <p className='pt-3 text-sm'>
                            Entre em contato:
                            <span>  <WhatsappLogo className='inline ' size={20} /> (33)98704-6181 </span>
                            <span>  <GithubLogo className='inline' size={20} /> <a href="https://github.com/kelvinrevertis">github</a> </span>
                            <span>  <LinkedinLogo className='inline' size={20} /><a href="https://www.linkedin.com/in/kelvin-revertis/">linkedin</a></span>
                            <span>  <EnvelopeSimple className='inline' size={20} /><a href="kelvinrev2@hotmail.com">e-mail</a></span>
                        </p>
                    </div>
                </header>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}