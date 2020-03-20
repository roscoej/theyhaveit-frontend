import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<html lang="en">
				<Head>
					{/* Meta Tags */}
					<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<link rel="apple-touch-icon" sizes="57x57" href="/static/favicon/apple-icon-57x57.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/static/favicon/apple-icon-60x60.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/static/favicon/apple-icon-72x72.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/static/favicon/apple-icon-76x76.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/static/favicon/apple-icon-114x114.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="/static/favicon/apple-icon-120x120.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/static/favicon/apple-icon-144x144.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/static/favicon/apple-icon-152x152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-icon-180x180.png" />
                    <link rel="icon" type="image/png" sizes="192x192"  href="/static/favicon/android-icon-192x192.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon/favicon-96x96.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                    <meta name="theme-color" content="#ffffff" />
					<meta name="title" content="theyhaveit – free in-stock alerts" />
					<meta name="description" content="theyhave it is a free tool that alerts you when essential items become available " />
					<meta name="keywords" content="purell, toilet paper, in stock, supplies, coronavirus, corona, covid19, covid" />
					<meta name="robots" content="index, follow" />
					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="language" content="English"></meta>
					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://www.theyhaveit.co/" />
					<meta property="og:title" content="Get free and instant in-stock alerts on essentials like hand sanitizer, paper towels, and other items" />
					<meta property="og:description" content="theyhave it is a free tool that alerts you when essential items become available " />
					<meta property="og:image" content="https://www.theyhaveit.co/static/Featured.png" />
					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content="https://www.theyhaveit.co/" />
					<meta property="twitter:title" content="Get free and instant in-stock alerts on essentials like hand sanitizer, paper towels, and other items" />
					<meta property="twitter:description" content="theyhave it is a free tool that alerts you when essential items become available " />
					<meta property="twitter:image" content="https://www.theyhaveit.co/static/Featured.png"></meta>
					<script async src="https://www.googletagmanager.com/gtag/js?id=UA-161043878-1"></script>
					<script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'UA-161043878-1');`}}>
					</script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}