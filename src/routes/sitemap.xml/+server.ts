import type { RequestHandler } from './$types';
import { competitions } from '$lib/competitions';

export const prerender = false;

interface SitemapEntry {
	path: string;
	changefreq: 'daily' | 'weekly' | 'monthly';
	priority: number;
}

export const GET: RequestHandler = async ({ url }) => {
	const baseUrl = url.origin;

	const staticRoutes: SitemapEntry[] = [
		{ path: '/', changefreq: 'weekly', priority: 1.0 },
		{ path: '/olympiads', changefreq: 'weekly', priority: 0.9 },
		{ path: '/resources', changefreq: 'monthly', priority: 0.6 },
		{ path: '/contribute', changefreq: 'monthly', priority: 0.5 },
		{ path: '/blog', changefreq: 'weekly', priority: 0.7 }
	];

	const olympiadRoutes: SitemapEntry[] = competitions.map((c) => ({
		path: `/olympiads/${c.id}`,
		changefreq: 'monthly',
		priority: 0.8
	}));

	// Blog posts: slug is the .svx filename, same convention as blog/+page.ts.
	const postModules = import.meta.glob('/src/lib/posts/*.svx');
	const blogRoutes: SitemapEntry[] = Object.keys(postModules).map((path) => {
		const slug = path.split('/').pop()?.replace('.svx', '') ?? '';
		return { path: `/blog/${slug}`, changefreq: 'monthly', priority: 0.6 };
	});

	const allRoutes = [...staticRoutes, ...olympiadRoutes, ...blogRoutes];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		(r) => `	<url>
		<loc>${baseUrl}${r.path}</loc>
		<changefreq>${r.changefreq}</changefreq>
		<priority>${r.priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'cache-control': 'max-age=3600'
		}
	});
};
