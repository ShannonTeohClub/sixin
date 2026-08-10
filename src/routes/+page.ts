import { parseCSV, type Project } from '$lib/utils/csv';

const SHEET_BASE =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vSLtB-hz6ryREU4Jkk8Ba9e9dOe7B6e22I8dCVlRgZaN2iUm2qZlBPBRjIHqCRKM5oG6SnO17z7OlFm/pub';

const PROJECTS_CSV = `${SHEET_BASE}?output=csv`;
const SECTIONS_CSV = `${SHEET_BASE}?gid=284252508&single=true&output=csv`;

type SectionMeta = {
	Category: string;
	DisplayName: string;
	Scope: string;
	SectionDescription: string;
};

export async function load({ fetch }) {
	const [projectsRes, sectionsRes] = await Promise.all([
		fetch(PROJECTS_CSV),
		fetch(SECTIONS_CSV)
	]);

	const projects = parseCSV<Project>(await projectsRes.text());
	const sectionMetas = parseCSV<SectionMeta>(await sectionsRes.text());

	const meta = (category: string) =>
		sectionMetas.find((s) => s.Category === category) ?? { DisplayName: '', Scope: '', SectionDescription: '' };

	return {
		sections: [
			{ title: 'Exhibitions', ...meta('Exhibitions'), projects: projects.filter((p) => p.Category === 'Exhibitions') },
			{ title: 'Interface',   ...meta('Interface'),   projects: projects.filter((p) => p.Category === 'Interface') },
			{ title: 'Product',     ...meta('Product'),     projects: projects.filter((p) => p.Category === 'Product') },
			{ title: 'Graphic',     ...meta('Graphic'),     projects: projects.filter((p) => p.Category === 'Graphic') }
		]
	};
}
