<?php
/**
 * Plugin Name:       UT Alert Banner
 * Description:       Displays an alert banner if the RSS feed contains active alerts
 * Version:           1.0
 * Author:            UT OCM
 * License:           GPL-2.0-or-later
 * Text Domain:       ut_alert_banner
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 *
 */

/**
 * Create Settings Page To Enable Testing Mode
 */
function ut_alert_register_settings() {
	register_setting('ut_alert_settings_group', 'ut_alert_testing_mode');
}
add_action('admin_init', 'ut_alert_register_settings');

function ut_alert_settings_page() {
	?>
	<div class="wrap">
		<h1>UT Alert Settings</h1>
		<form method="post" action="options.php">
			<?php settings_fields('ut_alert_settings_group'); ?>
			<?php do_settings_sections('ut_alert_settings_group'); ?>
			<div style="display: flex; align-items: center; margin-top: 20px;">
				<h2 style="margin-right: 30px;">Enable Testing Mode</h2>
				<input type="checkbox" name="ut_alert_testing_mode" value="1" <?php checked(1, get_option('ut_alert_testing_mode'), true); ?> />
				<p class="description" style="margin-left: 5px;">Displays the UT Alert banner for testing purposes</p>
			</div>
			<?php submit_button(); ?>
		</form>
	</div>
	<?php
}

function ut_alert_add_settings_menu() {
	add_options_page(
		'UT Alert Settings',
		'UT Alert',
		'manage_options',
		'ut-alert-settings',
		'ut_alert_settings_page'
	);
}
add_action('admin_menu', 'ut_alert_add_settings_menu');

/**
 * Enqueue JS and CSS files
 */
function ut_alert_enqueue_assets() {
	$testing_mode = get_option('ut_alert_testing_mode') === '1';

	wp_enqueue_style(
		'ut-alert-style',
		plugin_dir_url(__FILE__) . 'css/ut-alert.css',
		[],
		'1.0'
	);

	wp_enqueue_script(
		'ut-alert-script',
		plugin_dir_url(__FILE__) . 'js/ut-alert.js',
		[],
		'1.0',
		true
	);

	wp_localize_script('ut-alert-script', 'utAlertSettings', [
		'testingMode' => $testing_mode,
	]);
}
add_action('wp_enqueue_scripts', 'ut_alert_enqueue_assets');