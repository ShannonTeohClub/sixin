export type Project = {
	Category: string;
	Title: string;
	Type: string;
	Description: string;
	Image: string;
	GridArea?: string;
	HoverImage?: string;
	LabelColor?: string;
	BgColor?: string;
	Location?: string;
	Slug?: string;
	SheetGID?: string;
	HeroBgColor?: string;
	HeroImage?: string;
	HeroImageStyle?: string;
	AInfo?: string;
	BInfo?: string;
	CInfo?: string;
	Year?: string;
	Description2?: string;
};

export function parseCSVRow(row: string): string[] {
	const result: string[] = [];
	let current = '';
	let inQuotes = false;
	let i = 0;
	while (i < row.length) {
		const char = row[i];
		if (char === '"') {
			if (inQuotes && row[i + 1] === '"') {
				current += '"';
				i += 2;
				continue;
			}
			inQuotes = !inQuotes;
		} else if (char === ',' && !inQuotes) {
			result.push(current.trim());
			current = '';
		} else {
			current += char;
		}
		i++;
	}
	result.push(current.trim());
	return result;
}

export function parseCSV<T>(text: string): T[] {
	const lines = text.trim().split('\n');
	const headers = lines[0].split(',').map((h) => h.trim());
	return lines.slice(1).map((line) => {
		const values = parseCSVRow(line);
		return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ''])) as T;
	});
}
