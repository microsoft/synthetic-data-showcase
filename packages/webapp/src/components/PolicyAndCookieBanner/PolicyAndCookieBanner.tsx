/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Link, Text } from '@fluentui/react'
import type { CSSProperties, FC } from 'react'
import React, { memo, useMemo } from 'react'

import { useLoadMSFTCookieScript } from './PolicyAndCookieBanner.hooks.js'
import type {
	PolicyAndCookieBannerProps,
	PolicyLinkDetails,
	PolicyLinkProps,
} from './PolicyAndCookieBanner.types.js'

const containerStyles: CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '20px',
	padding: '10px',
}

const defaultLinks: Array<PolicyLinkDetails> = [
	{
		name: 'Privacy & Cookies',
		href: ' https://go.microsoft.com/fwlink/?LinkId=521839',
	},
	{
		name: 'Terms of Use',
		href: 'https://go.microsoft.com/fwlink/?LinkID=760869',
	},
	{
		name: 'Trademarks',
		href: 'https://www.microsoft.com/en-us/legal/intellectualproperty/Trademarks/EN-US.aspx',
	},
	{
		name: 'Contact Us',
		href: 'https://go.microsoft.com/?linkid=2028325',
	},
	{
		name: 'Code of Conduct',
		href: 'https://opensource.microsoft.com/codeofconduct/',
	},
	{
		name: `©️ ${new Date().getFullYear()} Microsoft`,
		href: 'https://www.microsoft.com/en-us/legal/intellectualproperty/copyright',
	},
]

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
							name="Manage Cookies"
							id="MSFTManageCookiesLink"
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

const PolicyLink: FC<PolicyLinkProps> = memo(function PolicyLink({
	name,
	href,
	onClick,
	divider = false,
	id,
}) {
	return (
		<>
			{divider && <Text variant="tiny">|</Text>}
			<Text variant="smallPlus">
				<Link id={id} href={href} target="_blank" onClick={onClick}>
					{name}
				</Link>
			</Text>
		</>
	)
})
