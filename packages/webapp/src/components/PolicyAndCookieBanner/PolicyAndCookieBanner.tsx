/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Link, Text } from '@fluentui/react'
import type { CSSProperties, FC } from 'react'
import React, { memo, useMemo } from 'react'

import { useLoadMSFTCookieScript } from './PolicyAndCookieBanner.hooks.js'
import type {
	CookieConsent,
	CookieConsentBannerThemes,
} from './PolicyAndCookieBanner.types.js'

const containerStyles: CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '20px',
	padding: '10px',
}

export type PolicyLinkDetails = { name: string; href: string }
const defaultLinks: Array<PolicyLinkDetails> = [
	{
		name: 'Privacy',
		href: 'https://privacy.microsoft.com/en-us/privacystatement',
	},
	{
		name: 'Terms of Use',
		href: 'https://www.microsoft.com/en-us/legal/terms-of-use',
	},
	{
		name: 'Trademarks',
		href: 'https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks',
	},
	{
		name: `©️ ${new Date().getFullYear()} Microsoft`,
		href: 'https://www.microsoft.com',
	},
]

export type PolicyAndCookieBannerProps = {
	language?: string
	theme?: CookieConsentBannerThemes
	onConsentChanged?: (newConsent: CookieConsent) => void
	className?: string
	styles?: CSSProperties
	links?: Array<PolicyLinkDetails>
}
export const PolicyAndCookieBanner: FC<PolicyAndCookieBannerProps> = memo(
	function CookieConsentProvider({
		language = navigator.language ?? 'en-US',
		theme = 'light',
		onConsentChanged = () => undefined,
		className,
		styles,
		links,
	}) {
		const divStyles: CSSProperties = useMemo(() => {
			return {
				...containerStyles,
				...styles,
			}
		}, [styles])

		const policyLinks = useMemo(() => {
			return (links ?? defaultLinks).map(({ name, href }, i) => {
				return (
					<PolicyLink key={name} divider={i !== 0} name={name} href={href} />
				)
			})
		}, [links])

		const consentManager = useLoadMSFTCookieScript({
			language,
			theme,
			onConsentChanged,
		})

		return (
			<div className={className} style={divStyles}>
				{consentManager?.isConsentRequired && (
					<>
						<PolicyLink
							name="Cookies"
							onClick={() => {
								consentManager?.manageConsent()
							}}
						/>
						<Text variant="tiny">|</Text>
					</>
				)}
				{policyLinks}
			</div>
		)
	},
)
PolicyAndCookieBanner.displayName = 'PolicyAndCookieBanner'

type PolicyLinkProps = {
	name: string
	href?: string
	onClick?: () => void
	divider?: boolean
}
const PolicyLink: FC<PolicyLinkProps> = memo(function PolicyLink({
	name,
	href,
	onClick,
	divider = false,
}) {
	return (
		<>
			{divider && <Text variant="tiny">|</Text>}
			<Text variant="smallPlus">
				<Link href={href} target="_blank" onClick={onClick}>
					{name}
				</Link>
			</Text>
		</>
	)
})
