import { parseCSV, type Project } from '$lib/utils/csv';

export const prerender = false;

const SHEET_BASE =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vSLtB-hz6ryREU4Jkk8Ba9e9dOe7B6e22I8dCVlRgZaN2iUm2qZlBPBRjIHqCRKM5oG6SnO17z7OlFm/pub';

const PROJECTS_CSV = `${SHEET_BASE}?output=csv`;

export type Block = {
	Type: string;
	Subhead: string;
	Quote: string;
	Body: string;
	Images: string;
	ImageSpan: string;
	Video: string;
	Videos: string;
	Caption: string;
	BgColor: string;
	P1: string; P1Bullets: string;
	P2: string; P2Bullets: string;
	P3: string; P3Bullets: string;
	AspectRatio: string;
	ImagePosition: string;
	CaptionLink: string;
	SideImage: string;
	PhotoSpans: string;
	RowHeights: string;
};

export async function load({ params, fetch }) {
	const projectsRes = await fetch(PROJECTS_CSV);
	const projects = parseCSV<Project>(await projectsRes.text());
	const project = projects.find((p) => p.Slug === params.slug) ?? null;

	const blocks: Promise<Block[]> = project?.SheetGID
		? fetch(`${SHEET_BASE}?gid=${project.SheetGID}&single=true&output=csv`)
				.then((r) => r.text())
				.then((t) => parseCSV<Block>(t))
		: Promise.resolve([]);

	return { project, blocks };
}
