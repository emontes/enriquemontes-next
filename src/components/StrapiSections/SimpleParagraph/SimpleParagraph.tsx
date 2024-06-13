import ReactMarkdown from "react-markdown";
import { SimpleParagraphProps } from "@/app/dynamicRendering/types";

const SimpleParagraph = ({
	Content,
	IsParagraphSecondary,
	ActionButtons,
}: SimpleParagraphProps) => {
	return (
		<div className="mt-4 p-10 text-gray-400">
			<ReactMarkdown children={Content} />
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
