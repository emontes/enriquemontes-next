import ReactMarkdown from "react-markdown";
import { SimpleParagraphProps } from "@/app/dynamicRendering/types";

const SimpleParagraph = ({
	Content,
	IsParagraphSecondary,
	DivideInParagraphs,
}: SimpleParagraphProps) => {
	const borderClass = IsParagraphSecondary ? "p-2 text-gray-500 bg-amber-900 shadow-md" : "p-2 text-gray-500 bg-cyan-900 shadow-md";
	const innerBorderClass = IsParagraphSecondary ? "rounded-md p-10 bg-amber-100 shadow-inner" : "rounded-md p-10 bg-sky-100 shadow-inner";
	let paragraphClass="";
	if(DivideInParagraphs) {
		paragraphClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";
	}
	return (
		<div className={borderClass}>
			<div className={innerBorderClass}>
				<div className={paragraphClass} id="content">
					<ReactMarkdown children={Content} />
				</div>
			</div>
		</div>
	);
};

export default SimpleParagraph;