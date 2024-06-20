import ReactMarkdown from "react-markdown";
import { SimpleParagraphProps } from "@/app/dynamicRendering/types";

const SimpleParagraph = ({
	Content,
	IsParagraphSecondary,
	ActionButtons,
}: SimpleParagraphProps) => {
	const paragraphs = Content.split("\n\n");
	return (
		<div className="p-2 text-gray-500 bg-cyan-900 shadow-md">
			<div className=" rounded-md p-10 bg-sky-100 shadow-inner">
			
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paragraphs.map((paragraph, index) => (
            <div key={index}>
              <ReactMarkdown>{paragraph}</ReactMarkdown>
            </div>
          ))}
        </div>


			</div>
		</div>
	);
};

export default SimpleParagraph;
// import { SimpleParagraphProps } from "@/app/dynamicRendering/types";
// // import React, { useEffect, useRef } from "react";
// import ReactMarkdown from "react-markdown";
// // import Styles from "@/styles/sections/simpleParagraph.module.scss";
// // import { Button } from "@/components/Button";
// // import { correctLinkUrl } from "@/utils";
// import { StrapiButtonType } from "@/types";

// export default function SimpleParagraph({
// 	Content,
// 	IsParagraphSecondary,
// 	ActionButtons,
// }: SimpleParagraphProps) {
// 	console.log("Contenido: ", Content);
// 	return (
// 		<div className={`border-y`}>
// 			<div
// 			// className={`${Styles.paragraph} ${
// 			// 	IsParagraphSecondary ? Styles.secondary_paragraph : ""
// 			// }`}
// 			>
// 				<ReactMarkdown children={Content} />
// 			</div>

// 			{/* <div className={Styles.actions_row}>
// 				{ActionButtons &&
// 					ActionButtons.map((buttonProps) => (
// 						<SimpleParagraphActionButton
// 							key={buttonProps.id}
// 							{...buttonProps}
// 						/>
// 					))}
// 			</div> */}
// 		</div>
// 	);
// }

// // const SimpleParagraphActionButton = ({
// // 	Link,
// // 	Primary,
// // 	Text,
// // 	id,å
// // }: StrapiButtonType) => {

// // 	return (
// // 		<Button
// // 			key={id}
// // 			txt={Text || ""}
// // 			url={correctLinkUrl(Link || "")}
// // 			isPrimary={Primary}
// // 		/>
// // 	);
// // };
