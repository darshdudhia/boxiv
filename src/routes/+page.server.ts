export const load = ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'max-age=60, must-revalidate, private'
	});
};
export const ssr = false; // prevent flash of content from SSR before animations
