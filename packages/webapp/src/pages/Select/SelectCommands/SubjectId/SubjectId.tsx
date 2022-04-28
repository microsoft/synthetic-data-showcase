/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Callout, DirectionalHint, Icon } from '@fluentui/react'
import { useBoolean, useId } from '@fluentui/react-hooks'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { Flex } from '~components/Flexbox'
import { useSubjectIdErrorMessage } from '~pages/Select/DataSelect/hooks'
import { useGlobalErrorMessage, useSensitiveContent } from '~states'

export const SubjectId: FC = memo(function SubjectId() {
	const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
		useBoolean(false)
	const actionId = useId('select-columns-id')
	const [sensitiveContent, setSensitiveContent] = useSensitiveContent()
	const subjectIdErrorMessage = useSubjectIdErrorMessage(sensitiveContent)
	const [, setGlobalErrorMessage] = useGlobalErrorMessage()

	const visibleColumns = useMemo(() => {
		return sensitiveContent.headers.filter(h => h.use)
	}, [sensitiveContent])

	const subjectId = useMemo(() => {
		return sensitiveContent.subjectId
	}, [sensitiveContent])
	const actionClass = useMemo(() => {
		return visibleColumns.length ? '' : 'disabled'
	}, [visibleColumns])

	const handleShowMenu = useCallback(() => {
		if (!visibleColumns.length) return
		toggleIsCalloutVisible()
	}, [visibleColumns, toggleIsCalloutVisible])

	const handleSubjectIdChange = useCallback(
		(key: string) => {
			setSensitiveContent(previous => ({
				...previous,
				subjectId: key,
			}))
		},
		[setSensitiveContent],
	)

	const list = useMemo(() => {
		return visibleColumns.map((header, index) => {
			return (
				<ListItem
					key={header.name}
					onClick={() => handleSubjectIdChange(header.name)}
					className={header.name === subjectId ? 'activeListItem' : ''}
				>
					<Icon iconName="CheckMark" />
					{header.name}
				</ListItem>
			)
		})
	}, [subjectId, visibleColumns, handleSubjectIdChange])

	useEffect(() => {
		setGlobalErrorMessage(subjectIdErrorMessage)
	}, [subjectIdErrorMessage, setGlobalErrorMessage])

	return (
		<>
			<Action className={actionClass} id={actionId} onClick={handleShowMenu}>
				Subject ID
			</Action>
			{isCalloutVisible && (
				<Callout
					role="dialog"
					gapSpace={0}
					isBeakVisible={false}
					directionalHint={DirectionalHint.bottomCenter}
					target={`#${actionId}`}
					onDismiss={toggleIsCalloutVisible}
					setInitialFocus
				>
					<Container vertical>
						<ListContainer vertical>
							<div>{list}</div>
						</ListContainer>
					</Container>
				</Callout>
			)}
		</>
	)
})
SubjectId.displayName = 'SubjectId'

const Action = styled.span`
	font-size: ${p => p.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.25px;
	padding: ${p => p.theme.spacing.m};
	color: ${p => p.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
	&.disabled {
		color: ${p => p.theme.palette.neutralTertiary};
		&:hover {
			cursor: auto;
		}
	}
`

const Container = styled(Flex)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${p => p.theme.palette.neutralLight};
	/* background: ${p => p.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`

const ListContainer = styled(Flex)`
	overflow-y: auto;
	padding: ${p => p.theme.spacing.s1};
	direction: rtl;
	& > div {
		direction: ltr;
	}
	&::-webkit-scrollbar {
		width: 4px;
		background: ${p => p.theme.palette.neutralLight};
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${p => p.theme.palette.themePrimary};
		border-radius: 20px;
	}
`

const ListItem = styled.div`
	padding: ${p => p.theme.spacing.s1};
	font-size: ${p => p.theme.fonts.medium.fontSize};
	&:hover {
		cursor: pointer;
		background: ${p => p.theme.palette.neutralLight};
	}
	& i {
		padding: 0 ${p => p.theme.spacing.s1};
		visibility: hidden;
	}
	&.activeListItem {
		background: ${p => p.theme.palette.neutralLight};
		& i {
			visibility: visible;
		}
	}
`
