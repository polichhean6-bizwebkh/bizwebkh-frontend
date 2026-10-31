# Inquiry: FormSubmit HTML POST

Replaces the previous Formspree preparation. Recipient: imrcha.org@gmail.com. Endpoint: https://formsubmit.co/imrcha.org@gmail.com.

The enabled form opens the provider in a new tab. Native required/email validation runs first. The provider handles its default reCAPTCHA and hosted result/error pages. No `_captcha=false` setting is present. Name, email, optional phone, message, exact subject, explicit Reply-To and a browser UTC timestamp are posted. Original entries remain in the original tab on success or failure; there is no local success claim. Repeated clicks are locked for 10 seconds; no automatic retries occur. No credentials, database or third-party script is used.

Activation / real receipt checklist:
1. Submit one clearly labelled test through the served website. Complete FormSubmit's CAPTCHA personally if prompted. Allow its hosted result tab if the browser blocks it.
2. Client opens imrcha.org@gmail.com (including Spam) and follows the FormSubmit activation link. Do not share private activation links or passwords here.
3. After activation, send one fresh labelled test. Client confirms actual receipt, subject [IMR-CHA Website] New Inquiry, all fields, timestamp and Reply-To. Service acceptance alone is not inbox delivery.
4. Repeat controlled desktop/mobile delivery verification and obtain approval before publishing.

Service errors are displayed on the hosted provider tab. The source form retains all text. If a result is uncertain, confirm receipt before retrying. No automatic success redirect is configured. Browser-generated timestamps are not an authoritative server receipt time.

Non-submitting bilingual QA on 31 October 2026: required-field and invalid-email rejection verified in English/Khmer, valid fields accepted locally, button enabled, no fake success and no browser console errors. No inquiry sent. Provider documentation is reachable, but POST availability, recipient activation and Gmail receipt remain unconfirmed. A previous endpoint check returned 521; this release has not repeated a POST.

The website-owned labels, validation and status text are bilingual. CAPTCHA and provider result pages are controlled by FormSubmit and may use their own language. Successful provider processing is not proof of inbox receipt.

Official documentation: https://formsubmit.co/documentation
