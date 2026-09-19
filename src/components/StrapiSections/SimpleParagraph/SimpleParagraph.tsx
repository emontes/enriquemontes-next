import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SimpleParagraphProps } from "@/app/dynamicRendering/types";

const SimpleParagraph = ({
	Content,
	IsParagraphSecondary,
	DivideInParagraphs,
}: SimpleParagraphProps) => {
	const borderClass = IsParagraphSecondary ? "p-2 text-gray-500 bg-amber-900 shadow-md" : "p-2 text-gray-500 bg-cyan-900 shadow-md";
	const innerBorderClass = IsParagraphSecondary ? "rounded-md p-10 bg-amber-100 shadow-inner" : "rounded-md p-10 bg-sky-100 shadow-inner";
	
	// When dividing in paragraphs, split content by double newlines and group each paragraph with its following list
	const getParagraphBlocks = () => {
		if (!DivideInParagraphs) return [Content];
		
		// Split by double newlines to get paragraphs
		const paragraphs = Content.split(/\n\n+/).filter(p => p.trim());
		const blocks: string[] = [];
		
		for (let i = 0; i < paragraphs.length; i++) {
			const current = paragraphs[i];
			const next = paragraphs[i + 1];
			
			// If current paragraph ends with ":" and next is a list, group them together
			if (current.trim().endsWith(':') && next && (next.trim().startsWith('-') || next.trim().startsWith('*') || /^\d+\./.test(next.trim()))) {
				blocks.push(current + '\n\n' + next);
				i++; // Skip the next paragraph since we already included it
			} else {
				blocks.push(current);
			}
		}
		
		return blocks;
	};
	
	const paragraphClass = DivideInParagraphs ? "columns-1 md:columns-2 lg:columns-3 gap-6" : "";
	const blocks = getParagraphBlocks();

	// Keep blocks that contain a list atomic so the intro line and its list never split
	const hasList = (text: string) => /^\s*(?:[-*+]|\d+\.)\s/m.test(text);

	// When there is enough content, the last two blocks are rendered full-width
	// below the columns so closing statements aren't stranded in the last column
	const footerCount = DivideInParagraphs && blocks.length > 4 ? 2 : 0;
	const flowBlocks = footerCount ? blocks.slice(0, -footerCount) : blocks;
	const footerBlocks = footerCount ? blocks.slice(-footerCount) : [];

	const renderBlock = (block: string, index: number) => (
		<div
			key={index}
			className={DivideInParagraphs ? `mb-4${hasList(block) ? " break-inside-avoid" : ""}` : ""}
		>
			<ReactMarkdown
				children={block}
				remarkPlugins={[remarkGfm]}
				components={{
					ul: ({children}) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
					ol: ({children}) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
					li: ({children}) => <li className="mb-1">{children}</li>,
				}}
			/>
		</div>
	);

	return (
		<div className={borderClass}>
			<div className={innerBorderClass}>
				<div className={paragraphClass} id="content">
					{flowBlocks.map(renderBlock)}
				</div>
				{footerBlocks.length > 0 && (
					<div className="mt-4 text-center">
						{footerBlocks.map(renderBlock)}
					</div>
				)}
			</div>
		</div>
	);
};

export default SimpleParagraph;