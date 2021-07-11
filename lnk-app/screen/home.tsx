import React from 'react';
import Head from 'next/head'
import { useState } from 'react';
import { createShortLink } from '../lib/createShortLink';
import Icon from '../components/Icon';
import LoadingIcon from '../components/LoadingIcon';
import UrlInput from '../components/UrlInput';
import ShortLink from '../components/ShortLink';
import ShortenButton from '../components/ShortenButton';
import CopyButton from '../components/CopyButton';
import Alert from '../components/Alert';
import DarkModeToggle from '../components/DarkModeToggle';
import { ThemeContext } from '../contexts/ThemeContext';

interface Props {
    redirectError?: boolean
}

export default function HomeScreen({ redirectError }: Props) {

    const [url, setUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [shortLink, setShortLink] = useState<string | null>(null);

    const shorten = async () => {
        if (url === null) return;

        setLoading(true);
        setError(null);

        try {
            const shortLink = await createShortLink(url);
            setShortLink(shortLink);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

    }

    const resetForm = () => {
        setUrl(null);
        setError(null);
        setShortLink(null);
    }

    const updateUrl = (event: React.FormEvent<HTMLInputElement>) => {
        setUrl(event.currentTarget.value);
    }

    const labelText = !!shortLink ? 'Your New Shortened Url' : 'Your Long Url';

    return (
        <div>
            <Head>
                <title>lnk</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div className={theme === 'dark' ? 'dark' : ''}>
                    <main className={`w-full mx-auto h-screen transition-colors dark:bg-gray-700 ${theme === 'dark' && 'dark'}`}>
                        <div className="w-11/12 md:w-8/12 lg:w-5/12 mx-auto pt-8 md:pt-16 lg:pt-36">
                            {redirectError && (<Alert>
                                Could not find the link you are looking for.
                            </Alert>)}

                            <div className="flex flex-row items-center">
                                <div className="mr-2 dark:text-white">
                                    <Icon size="large" />
                                </div>
                                <h1 className="text-6xl text-center dark:text-white ml-2">LnK</h1>

                                <DarkModeToggle />
                            </div>
                            <h2 className="text-lg dark:text-white my-8">Got a long link? We&apos;ll take care of that.</h2>

                            <div className="w-full bg-darkGray bg-opacity-20 shadow-md p-8 rounded-md">
                                <form className="flex flex-col">
                                    <div className="py-1 flex items-center justify-between">
                                        <label htmlFor="url-input" className="text-darkPurple dark:text-gray-200 opacity-70">{labelText}</label>
                                        <p className="text-red-600">{error ?? ''}</p>
                                    </div>

                                    <div className="h-20 flex items-center justify-center w-full flex-col">
                                        <UrlInput url={url} updateUrl={updateUrl} hidden={!!(loading || shortLink)} />

                                        <ShortLink hidden={!shortLink} link={shortLink} />

                                        <div className="mx-auto">
                                            <LoadingIcon show={loading} />
                                        </div>
                                    </div>

                                    <div className="flex flex-row w-max mx-auto mt-8">
                                        <ShortenButton disabled={!!(shortLink || loading || !url)} onClick={shorten} />
                                        <CopyButton disabled={!!(loading || !url)} onClick={() => null} />
                                    </div>
                                </form>

                                {!!shortLink && (<div className="mx-auto w-max mt-10">
                                    <a href="#" className="underline text-darkPurple dark:text-gray-300" onClick={resetForm}>Shorten Another Link</a>
                                </div>)}
                            </div>
                        </div>
                    </main>
                    </div>
                )}
            </ThemeContext.Consumer>
        </div>
    )
}