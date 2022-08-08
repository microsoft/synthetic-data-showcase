/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import React, { memo, useEffect, useState } from 'react'

import type {
	CookieConsent,
	CookieConsentManager,
	WcpConsent as WC,
} from './CookieConsentBanner.types.js'
import { CookieConsentBannerThemes } from './CookieConsentBanner.types.js'
import { setCookieConsentManager } from './CookieConsentManager.js'

declare global {
	interface Window {
		WcpConsent: WC | undefined
	}
}

const COOKIE_CONSENT_BANNER_ID = `cookie-consent-banner-${
	(Math.random() * 1000) | 0
}`
const COOKIE_SCRIPT_ID = `cookie-script-${(Math.random() * 1000) | 0}`
const COOKIE_SCRIPT_SRC =
	'https://wcpstatic.microsoft.com/mscc/lib/v2/wcp-consent.js'
const MAX_LOADING_TIME_MS = 5000

export type CookieConsentBannerProps = {
	language?: string
	theme?: CookieConsentBannerThemes
	onConsentChanged?: (newConsent: CookieConsent) => void
}
export const CookieConsentBanner: FC<CookieConsentBannerProps> = memo(
	function CookieConsentProvider({
		language = navigator.language ?? 'en-US',
		theme = CookieConsentBannerThemes.Light,
		onConsentChanged = () => undefined,
	}) {
		const [consentManager, setConsentManager] = useState<
			CookieConsentManager | undefined
		>()

		useEffect(() => {
			async function initialize(): Promise<void> {
				if (consentManager !== undefined) return

				if (!isCookieScriptLoaded()) await addCookieScript()
				if (!isCookieBannerPlaceholderElementPresent())
					addCookieBannerPlaceholderElement()

				const cookieBannerPlaceholderElement = document.getElementById(
					COOKIE_CONSENT_BANNER_ID,
				)!

				window.WcpConsent!.init(
					language,
					cookieBannerPlaceholderElement,
					function initializeConsentManager(err, consentManager) {
						if (err) {
							console.error(err)
							return
						}
						setCookieConsentManager(consentManager ?? null)
						setConsentManager(consentManager)
					},
					onConsentChanged,
					theme,
				)
			}

			void initialize()
		}, [language, theme, onConsentChanged, consentManager, setConsentManager])

		return <></>
	},
)
CookieConsentBanner.displayName = 'CookieConsentBanner'

function isCookieScriptLoaded(): boolean {
	return (
		!!document.getElementById(COOKIE_SCRIPT_ID) &&
		window.WcpConsent !== undefined
	)
}

async function addCookieScript(): Promise<void> {
	return new Promise((res, rej) => {
		const script = document.createElement('script')
		script.id = COOKIE_SCRIPT_ID
		script.crossOrigin = 'anonymous'
		script.src = COOKIE_SCRIPT_SRC
		document.head.appendChild(script)

		let totalLoadingTime = 0
		const loadingStep = 50
		function isLoaded(): void {
			if (isCookieScriptLoaded()) {
				res()
			} else {
				if (totalLoadingTime >= MAX_LOADING_TIME_MS) {
					throw new Error(`Error loading ${COOKIE_SCRIPT_SRC}`)
				}
				totalLoadingTime += loadingStep
				setTimeout(isLoaded, 50)
			}
		}

		isLoaded()
	})
}

function isCookieBannerPlaceholderElementPresent(): boolean {
	return !!document.getElementById(COOKIE_CONSENT_BANNER_ID)
}

function addCookieBannerPlaceholderElement(): void {
	const div = document.createElement('div')
	div.id = COOKIE_CONSENT_BANNER_ID
	document.body.prepend(div)
}
