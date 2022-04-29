/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import React, { memo, useMemo } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
interface IFlex<T = {}> extends FC<T> {
	Box: FC<BoxProps>
}

export interface FlexProps {
	as?: React.ElementType
	vertical?: boolean
	wrap?: boolean
	justify?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
	align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
	gap?: string
	children?: React.ReactNode
	className?: string
	style?: React.CSSProperties
}

// @ts-expect-error Doesn't meet type constraint until later
export const Flex: IFlex<FlexProps> = memo(function Flex({
	as,
	vertical = false,
	wrap = false,
	justify = 'flex-start',
	align = 'stretch',
	children,
	gap = '',
	className = '',
	style = {},
}: FlexProps) {
	const inlineStyles: React.CSSProperties = useMemo(
		() => ({
			display: 'flex',
			flexDirection: vertical ? 'column' : 'row',
			justifyContent: justify,
			alignItems: align,
			flexWrap: wrap ? 'wrap' : 'nowrap',
			...(gap !== '' ? { gap } : {}),
			...style,
		}),
		[vertical, justify, align, wrap, gap, style],
	)

	const Element = as ?? 'div'

	return (
		<Element className={className} style={inlineStyles}>
			{children}
		</Element>
	)
})

export interface BoxProps {
	as?: React.ElementType
	order?: number
	shrink?: number
	basis?: string
	grow?: number
	align?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
	children?: React.ReactNode
	className?: string
	style?: React.CSSProperties
}

const Box: FC<BoxProps> = memo(function Box({
	as,
	order = 0,
	grow = 0,
	shrink = 1,
	basis,
	align,
	children,
	className = '',
	style = {},
}: BoxProps) {
	const flexBasis = useMemo(() => {
		return basis ?? (grow > 0 ? '0%' : 'auto')
	}, [basis, grow])

	const inlineStyles: React.CSSProperties = useMemo(
		() => ({
			order,
			flexGrow: grow,
			flexShrink: shrink,
			flexBasis,
			...(align != null ? { alignSelf: align } : {}),
			...style,
		}),
		[order, grow, shrink, flexBasis, align, style],
	)

	const Element = as ?? 'div'

	return (
		<Element className={className} style={inlineStyles}>
			{children}
		</Element>
	)
})

Flex.Box = Box
