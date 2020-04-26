import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import json from '@rollup/plugin-json';
import dotenv from 'dotenv';

import image from '@rollup/plugin-image';

const mode = process.env.NODE_ENV;
const dev = (mode === 'development');
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);

let envVars = null;
if (dev) {
	envVars = dotenv.config().parsed;
	if (!envVars) {
		console.warn('.env config vars file not found');
	}
}

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			image(),

			replace(Object.assign({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}, (dev && envVars) ? {
				'process.env.MONGODB_URI': JSON.stringify(envVars.MONGODB_URI),
				'process.env.MONGODB_DB': JSON.stringify(envVars.MONGODB_DB),
				'process.env.AWS_ACCESS_KEY_ID': JSON.stringify(envVars.AWS_ACCESS_KEY_ID),
				'process.env.AWS_SECRET_ACCESS_KEY': JSON.stringify(envVars.AWS_SECRET_ACCESS_KEY),
				'process.env.S3_CONTENT_BUCKET': JSON.stringify(envVars.S3_CONTENT_BUCKET),
			} : {})),
			json(),
			svelte({
				dev,
				hydratable: true,
				emitCss: true
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			})
		],

		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			image(),

			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			json(),
			svelte({
				generate: 'ssr',
				dev
			}),
			resolve({
				dedupe: ['svelte']
			}),
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		onwarn,
	},

	// serviceworker: {
	// 	input: config.serviceworker.input(),
	// 	output: config.serviceworker.output(),
	// 	plugins: [
	// 		resolve(),
	// 		replace({
	// 			'process.browser': true,
	// 			'process.env.NODE_ENV': JSON.stringify(mode)
	// 		}),
	// 		commonjs(),
	// 		!dev && terser()
	// 	],

	// 	onwarn,
	// }
};
