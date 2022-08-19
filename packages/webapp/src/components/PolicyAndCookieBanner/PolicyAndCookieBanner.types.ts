/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { CSSProperties } from 'react'

export enum CookieConsentCategories {
	/**
	 * Cookies to perform essential website functions (sign-in, language settings,...)
	 */
	Required = 'Required',
	/**
	 * Cookies to understand how website is used, may be also used on 3rd party websites that are not owned or operated by Microsoft
	 */
	Analytics = 'Analytics',
	/**
	 * Cookies to show ads and content based on user social media profiles and activity on Microsoft websites
	 */
	SocialMedia = 'SocialMedia',
	/**
	 * Cookies to record which ads are already seen, clicked, or purchased
	 */
	Advertising = 'Advertising',
}

export type CookieConsentBannerThemes = 'light' | 'dark' | 'high-contrast'

export type CookieConsent = Record<CookieConsentCategories, boolean>

export type CookieConsentManager = {
	/**
	 * `true` if consent is required for current user region
	 */
	readonly isConsentRequired: boolean

	/**
	 * Returns consent state for all categories
	 */
	getConsent(): CookieConsent

	/**
	 * Returns consent state for a category.
	 * @param consentCategory one of `consentCategories` values to get the consent state for
	 * @returns `true` if consent was given, `false` otherwise
	 */
	getConsentFor(consentCategory: CookieConsentCategories): boolean

	/**
	 * Shows the preferences dialog box
	 */
	manageConsent(): void
}

/* eslint-disable-next-line */
export type WcpConsent = {
	/**
	 * Library initialization method
	 * @param culture - culture to be used for text resources (e.g.: `en-us`, `en-gb`, `en`, `fr-ca`)
	 * @param placeholderIdOrElement - element ID or HTMLElement where banner will be placed
	 * @param initCallback - function to be called when the library initialization is done
	 * @param onConsentChanged - function to be called when user changes consent state
	 * @param theme - theme that will be applied to the banner(available themes - dark, light, highcontrast)
	 * @param stylesNonce - optional nonce value (unique base64 string), which will be applied for all generated styles tag. Nonce is used for Content Security Policy (CSP)
	 */
	init: (
		culture: string,
		placeholderIdOrElement: string | HTMLElement,
		initCallback?: (err?: Error, siteConsent?: CookieConsentManager) => void,
		onConsentChanged?: (newConsent: CookieConsent) => void,
		theme?: CookieConsentBannerThemes,
		stylesNonce?: string,
	) => void
}

export type PolicyLinkDetails = { name: string; href: string }

export type PolicyAndCookieBannerProps = {
	language?: string
	theme?: CookieConsentBannerThemes
	onConsentChanged?: (newConsent: CookieConsent) => void
	className?: string
	styles?: CSSProperties
	links?: Array<PolicyLinkDetails>
}

export type PolicyLinkProps = {
	name: string
	id?: string
	href?: string
	onClick?: () => void
	divider?: boolean
}
