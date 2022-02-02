/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { memo } from 'react'

export interface MarkdownProps {
	children: string
}

export const Markdown: React.FC<MarkdownProps> = memo(function InfoTooltip({
	children,
}: MarkdownProps) {
	return (
		<div
			dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(children)) }}
		/>
	)
})

export function fromMarkdownStr(markdown: string): JSX.Element {
	return <Markdown>{markdown}</Markdown>
}
