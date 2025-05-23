document.addEventListener('DOMContentLoaded', function () {
	// Check if testing mode is enabled in settings
	const testingMode =
		typeof utAlertSettings !== 'undefined' && utAlertSettings.testingMode;

	// Append alert banner HTMl to .site-header
	function displayAlert(description, date) {
		const alertDiv = document.createElement('div');
		alertDiv.innerHTML = `
			<div class="ut-alert" role="alert">
				<div class="inner-alert">
					<div class="icon-container">
						<svg width="65" height="65" viewBox="0 0 126 125" fill="none" xmlns="http://www.w3.org/2000/svg">
							<!-- Triangular white background -->
							<polygon points="65,9 9,120 120,120" fill="#fff"></polygon>

							<!-- Main icon -->
							<path d="M59.86 104c0-3.06 2.08-5.64 4.9-6.4a6.04 6.04 0 0 0-1.76-.25 6.65 6.65 0 0 0-6.64 6.64 6.65 6.65 0 0 0 6.64 6.64c.6 0 1.17-.08 1.72-.24a6.638 6.638 0 0 1-4.86-6.39Zm0 0c0-3.06 2.08-5.64 4.9-6.4a6.04 6.04 0 0 0-1.76-.25 6.65 6.65 0 0 0-6.64 6.64 6.65 6.65 0 0 0 6.64 6.64c.6 0 1.17-.08 1.72-.24a6.638 6.638 0 0 1-4.86-6.39Zm2.46-13.43-3.13-55.76c-.01-.12.04-.24.13-.34.08-.1.21-.15.33-.15h-3.34c-.12 0-.25.05-.33.15-.09.1-.14.22-.13.34l3.13 55.76c.01.25.21.44.46.44h3.34c-.25 0-.45-.19-.46-.44ZM59.86 104c0-3.06 2.08-5.64 4.9-6.4a6.04 6.04 0 0 0-1.76-.25 6.65 6.65 0 0 0-6.64 6.64 6.65 6.65 0 0 0 6.64 6.64c.6 0 1.17-.08 1.72-.24a6.638 6.638 0 0 1-4.86-6.39Zm2.46-13.43-3.13-55.76c-.01-.12.04-.24.13-.34.08-.1.21-.15.33-.15h-3.34c-.12 0-.25.05-.33.15-.09.1-.14.22-.13.34l3.13 55.76c.01.25.21.44.46.44h3.34c-.25 0-.45-.19-.46-.44ZM59.86 104c0-3.06 2.08-5.64 4.9-6.4a6.04 6.04 0 0 0-1.76-.25 6.65 6.65 0 0 0-6.64 6.64 6.65 6.65 0 0 0 6.64 6.64c.6 0 1.17-.08 1.72-.24a6.638 6.638 0 0 1-4.86-6.39Zm62.41 15.04L76.09 25.13l-1.2-2.42-.4-.81v-.01L65.84 4.38a1.95 1.95 0 0 0-.32-.47V3.9h-.01c-.56.1-.49-.86-.81-.21L7.69 119.14c-.35.71-.15 1.29.09 1.66.51.82 1.56 1.33 2.75 1.33h109.13c1.2 0 2.25-.51 2.76-1.33.07-.11.13-.23.18-.37 0-.43-.11-.98-.33-1.39ZM63 112.49c-4.69 0-8.5-3.81-8.5-8.5 0-4.69 3.81-8.5 8.5-8.5 4.69 0 8.5 3.81 8.5 8.5 0 4.69-3.81 8.5-8.5 8.5Zm5.9-21.82c-.08 1.23-1.1 2.2-2.32 2.2h-7.14c-1.23 0-2.26-.97-2.32-2.2l-3.13-55.76a2.3 2.3 0 0 1 .64-1.72c.43-.46 1.05-.73 1.68-.73H69.7c.64 0 1.26.26 1.69.73.44.45.67 1.08.63 1.72L68.9 90.67Zm-4.14 6.93a6.04 6.04 0 0 0-1.76-.25 6.65 6.65 0 0 0-6.64 6.64 6.65 6.65 0 0 0 6.64 6.64c.6 0 1.17-.08 1.72-.24a6.638 6.638 0 0 1-4.86-6.39c0-3.06 2.08-5.64 4.9-6.4Zm-2.44-7.03-3.13-55.76c-.01-.12.04-.24.13-.34.08-.1.21-.15.33-.15h-3.34c-.12 0-.25.05-.33.15-.09.1-.14.22-.13.34l3.13 55.76c.01.25.21.44.46.44h3.34c-.25 0-.45-.19-.46-.44ZM59.86 104c0-3.06 2.08-5.64 4.9-6.4a6.04 6.04 0 0 0-1.76-.25 6.65 6.65 0 0 0-6.64 6.64 6.65 6.65 0 0 0 6.64 6.64c.6 0 1.17-.08 1.72-.24a6.638 6.638 0 0 1-4.86-6.39Zm2.46-13.43-3.13-55.76c-.01-.12.04-.24.13-.34.08-.1.21-.15.33-.15h-3.34c-.12 0-.25.05-.33.15-.09.1-.14.22-.13.34l3.13 55.76c.01.25.21.44.46.44h3.34c-.25 0-.45-.19-.46-.44ZM59.86 104c0-3.06 2.08-5.64 4.9-6.4a6.04 6.04 0 0 0-1.76-.25 6.65 6.65 0 0 0-6.64 6.64 6.65 6.65 0 0 0 6.64 6.64c.6 0 1.17-.08 1.72-.24a6.638 6.638 0 0 1-4.86-6.39Zm2.46-13.43-3.13-55.76c-.01-.12.04-.24.13-.34.08-.1.21-.15.33-.15h-3.34c-.12 0-.25.05-.33.15-.09.1-.14.22-.13.34l3.13 55.76c.01.25.21.44.46.44h3.34c-.25 0-.45-.19-.46-.44Z" fill="#FF8200"></path>
							<path d="M125.03 117.89 68.35 3.14C67.42 1.26 65.37.09 63 .09c-2.37 0-4.42 1.17-5.35 3.05L.98 117.89c-.71 1.42-.62 3.03.22 4.38 1.01 1.62 2.98 2.64 5.13 2.64h113.35c2.14 0 4.1-1 5.12-2.64.85-1.37.93-2.95.23-4.38Zm-2.43 2.54c-.05.14-.11.26-.18.37-.51.82-1.56 1.33-2.76 1.33H6.31c-1.19 0-2.24-.51-2.75-1.33-.24-.37-.44-.95-.09-1.66L60.16 4.38C60.69 3.29 61.98 2.9 63 2.9c.86 0 1.89.27 2.51 1h.01v.01c.13.14.23.29.32.47l8.65 17.51v.01l.4.81 1.2 2.42 46.42 94.01c.24.49.22.94.09 1.29Z" fill="#4B4B4B"></path>
							<path d="M71.39 33.19c-.43-.47-1.05-.73-1.69-.73H56.31c-.63 0-1.25.27-1.68.73a2.3 2.3 0 0 0-.64 1.72l3.13 55.76c.06 1.23 1.09 2.2 2.32 2.2h7.14c1.22 0 2.24-.97 2.32-2.2l3.12-55.76c.04-.64-.19-1.27-.63-1.72ZM59.44 91.01c-.25 0-.45-.19-.46-.44l-3.13-55.76c-.01-.12.04-.24.13-.34.08-.1.21-.15.33-.15h13.38c.12 0 .25.05.34.15.08.1.12.22.12.34l-3.13 55.76c-.01.24-.21.44-.46.44h-7.12ZM63 95.49c-4.69 0-8.5 3.81-8.5 8.5 0 4.69 3.81 8.5 8.5 8.5 4.69 0 8.5-3.81 8.5-8.5 0-4.69-3.81-8.5-8.5-8.5Zm0 15.14a6.65 6.65 0 0 1-6.64-6.64A6.65 6.65 0 0 1 63 97.35c.61 0 1.2.08 1.76.25 2.81.76 4.88 3.34 4.88 6.39 0 3.06-2.09 5.65-4.92 6.4-.55.16-1.12.24-1.72.24Z" fill="#4B4B4B"></path>
						</svg>
					</div>
					<div class="content-container">
						<h3 class="alert-heading">UT Emergency Alert</h3>
						<p class="alert-text">${description}</p>
						<p class="alert-posted">Posted on ${date}</p>
						<p class="is-style-utkwds-cta-link">
						<a class="ut-alert-link" href="https://safety.utk.edu/status/">
							See campus status
						</a>
						</p>
					</div>
				</div>
			</div>`;

		const header = document.querySelector('.site-header');

		if (header) {
			header.appendChild(alertDiv);
		}
	}

	// Display alert with testing message if testing mode is enabled in settings
	if (testingMode) {
		const today = new Date();
		const formattedToday = `${
			today.getMonth() + 1
		}/${today.getDate()}/${today.getFullYear()}`;

		displayAlert(
			'This is a test alert for the UT Emergency Alert banner system. No action is required at this time. This message is part of a routine test to ensure proper functionality in the event of an actual emergency.',
			formattedToday
		);

		return;
	}

	// Fetch RSS feed and display alert if no "All Clear" message
	const url = 'https://www.getrave.com/rss/utk/channel1';

	fetch(url)
		.then((response) => response.text())
		.then((result) => {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(result, 'text/xml');
			const items = xmlDoc.getElementsByTagName('item');

			// Exit if there are no items
			if (items.length === 0) {
				return;
			}

			// Check contents of last item
			const lastItem = items[items.length - 1];

			const title =
				lastItem.getElementsByTagName('title')[0]?.textContent || '';
			const description =
				lastItem.getElementsByTagName('description')[0]?.textContent ||
				'';
			const alertDate =
				lastItem.getElementsByTagName('dc:date')[0]?.textContent || '';

			// Exit if title is blank or includes "RSS All Clear"
			if (title === '' || title.includes('RSS All Clear')) {
				return;
			}

			// Format date 'm/d/yyyy'
			const date = new Date(alertDate);
			const formattedDate = `${
				date.getMonth() + 1
			}/${date.getDate()}/${date.getFullYear()}`;
			
			displayAlert(description, formattedDate);
		})

		.catch((error) => {
			console.error('UT alert fetch error:', error);
		});
});
