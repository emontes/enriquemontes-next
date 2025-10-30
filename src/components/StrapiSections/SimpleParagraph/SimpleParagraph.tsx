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
	
	const paragraphClass = DivideInParagraphs ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "";
	const blocks = getParagraphBlocks();
	
	return (
		<div className={borderClass}>
			<div className={innerBorderClass}>
				<div className={paragraphClass} id="content">
					{blocks.map((block, index) => (
						<div key={index} className={DivideInParagraphs ? "mb-4" : ""}>
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
					))}
				</div>
			</div>
		</div>
	);
};

export default SimpleParagraph;