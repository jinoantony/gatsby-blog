const path = require('path')
const config = require('./data/config')

require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
	siteMetadata: {
		title: config.defaultTitle,
		description: config.defaultDescription,
		author: config.author,
		siteUrl: config.url,
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-use-dark-mode',
			options: {
				classNameDark: 'dark',
				classNameLight: 'light',
				storageKey: 'darkMode',
				minify: true,
			},
		},
		'gatsby-plugin-styled-components',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: `${__dirname}/src/pages`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `markdown`,
				path: `${__dirname}/src/components/landing/Projects/markdown/`
			}
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					`gatsby-remark-reading-time`,
					{
						resolve: `gatsby-remark-images`,
						options: {
						  // It's important to specify the maxWidth (in pixels) of
						  // the content container as this plugin uses this as the
						  // base for generating different widths of each image.
						  	maxWidth: 590,
						},
					},
					{
						resolve: "gatsby-remark-embed-gist",
						options: {
							// Optional:
				
							// the github handler whose gists are to be accessed
							username: 'jinoantony',
				
							// a flag indicating whether the github default gist css should be included or not
							// default: true
							includeDefaultCss: true
						}
					},
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							// Class prefix for <pre> tags containing syntax highlighting;
							// defaults to 'language-' (eg <pre class="language-js">).
							// If your site loads Prism into the browser at runtime,
							// (eg for use with libraries like react-live),
							// you may use this to prevent Prism from re-processing syntax.
							// This is an uncommon use-case though;
							// If you're unsure, it's best to use the default value.
							classPrefix: 'language-',
							// This is used to allow setting a language for inline code
							// (i.e. single backticks) by creating a separator.
							// This separator is a string and will do no white-space
							// stripping.
							// A suggested value for English speakers is the non-ascii
							// character '›'.
							inlineCodeMarker: null,
							// This lets you set up language aliases.  For example,
							// setting this to '{ sh: "bash" }' will let you use
							// the language "sh" which will highlight using the
							// bash highlighter.
							aliases: {},
							// This toggles the display of line numbers globally alongside the code.
							// To use it, add the following line in src/layouts/index.js
							// right after importing the prism color scheme:
							//  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
							// Defaults to false.
							// If you wish to only show line numbers on certain code blocks,
							// leave false and use the {numberLines: true} syntax below
							showLineNumbers: false,
							// If setting this to true, the parser won't handle and highlight inline
							// code used in markdown i.e. single backtick code like `this`.
							noInlineHighlight: false,
							// This adds a new language definition to Prism or extend an already
							// existing language definition. More details on this option can be
							// found under the header "Add new language definition or extend an
							// existing language" below.
							languageExtensions: [
								{
									language: 'superscript',
									extend: 'javascript',
									definition: {
										superscript_types: /(SuperType)/,
									},
									insertBefore: {
										function: {
											superscript_keywords: /(superif|superelse)/,
										},
									},
								},
							],
							// Customize the prompt used in shell output
							// Values below are default
							prompt: {
								user: 'root',
								host: 'localhost',
								global: false,
							},
						},
					},
				], // just in case those previously mentioned remark plugins sound cool :)
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-nprogress',
			options: {
				color: config.themeColor,
				showSpinner: false,
			},
		},
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: config.googleAnalyticsID,
				head: true,
			},
		},
		{
			resolve: 'gatsby-plugin-favicons',
			options: {
				logo: './static/favicon/me.jpg',
				icons: {
					android: true,
					appleIcon: true,
					appleStartup: true,
					coast: false,
					favicons: true,
					yandex: false,
					windows: false,
				},
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: config.defaultTitle,
				short_name: 'starter',
				start_url: '/',
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: 'minimal-ui',
				icon: './static/favicon/me.jpg',
			},
		},
		'gatsby-plugin-offline',
		{
			resolve: `gatsby-plugin-alias-imports`,
			options: {
				alias: {
					Components: path.resolve(__dirname, 'src/components'),
					Common: path.resolve(__dirname, 'src/components/common'),
					Static: path.resolve(__dirname, 'static/'),
					Theme: path.resolve(__dirname, 'src/components/theme'),
					Data: path.resolve(__dirname, 'data/config'),
				},
			},
		},
	],
}
