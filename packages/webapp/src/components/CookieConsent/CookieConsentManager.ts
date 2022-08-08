/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { CookieConsentManager } from './CookieConsentBanner.types.js'

let _cookieConsentManager: CookieConsentManager | null = null

export function getCookieConsentManager(): CookieConsentManager {
	if (_cookieConsentManager === null) {
		throw new Error(
			'CookieConsentManager not set. Load https://wcpstatic.microsoft.com/mscc/lib/v2/wcp-consent.js and initialize the script.',
		)
	}

	return _cookieConsentManager
}

export function setCookieConsentManager(
	cookieConsentManager: CookieConsentManager | null,
): void {
	_cookieConsentManager = cookieConsentManager
}
