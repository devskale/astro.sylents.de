<?php
/**
 * Theme functions and definitions
 *
 * @package HelloElementorChild
 *
 * Sylents branding for the WooCommerce storefront. Matches the Astro design
 * tokens (src/styles/tokens.css): cyan #00bcd4 accent, Geist typeface, pill
 * buttons, card hover-lift. Enqueued only — no template overrides, fully
 * reversible.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load child theme css, Geist font, and Sylents shop styles.
 */
function hello_elementor_child_enqueue_scripts() {
	wp_enqueue_style(
		'hello-elementor-child-style',
		get_stylesheet_directory_uri() . '/style.css',
		[ 'hello-elementor-theme-style' ],
		'1.1.0'
	);

	// Geist typeface (same as Astro tokens.css).
	wp_enqueue_style(
		'sylents-geist',
		'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap',
		[],
		null
	);

	// Sylents storefront styling — loaded after WooCommerce general styles.
	wp_enqueue_style(
		'sylents-shop',
		get_stylesheet_directory_uri() . '/shop.css',
		[ 'hello-elementor-child-style', 'sylents-geist', 'woocommerce-general' ],
		'1.8.0'
	);
}
add_action( 'wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts', 20 );

/**
 * Replace the default shop <h1 class="page-title"> with a branded hero
 * (eyebrow + headline + sub). Default title still shows on category archives.
 */
add_filter(
	'woocommerce_show_page_title',
	function ( $show ) {
		return is_shop() ? false : $show;
	}
);

add_action( 'woocommerce_archive_description', 'sylents_shop_hero', 5 );
function sylents_shop_hero() {
	if ( ! is_shop() ) {
		return;
	}
	?>
	<header class="sylents-shop-hero">
		<span class="sylents-eyebrow">Sylents Shop</span>
		<h1 class="sylents-shop-title">Elektrische Wasserjets &amp; Zubehör</h1>
		<p class="sylents-shop-sub">Serienreife Elektroantriebe für Freizeitboote — leise, emissionsfrei, schwimmersicher. Entwickelt und produziert in Deutschland.</p>
	</header>
	<?php
}

/**
 * Branded placeholder tile for products without a photo (8 of 9 today).
 * Renders a clean cyan-tinted "SYLENTS" tile instead of WooCommerce's grey box.
 */
add_filter( 'woocommerce_placeholder_img_src', 'sylents_placeholder_src' );
function sylents_placeholder_src( $src ) {
	$svg = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">'
		. '<rect width="400" height="400" fill="#f1f6f8"/>'
		. '<circle cx="200" cy="168" r="48" fill="none" stroke="#00bcd4" stroke-width="3"/>'
		. '<path d="M200 120 v96 M152 168 h96" stroke="#00bcd4" stroke-width="3" stroke-linecap="round" opacity="0.45"/>'
		. '<text x="200" y="324" font-family="Geist, Arial, sans-serif" font-size="22" font-weight="600" fill="#00728f" text-anchor="middle" letter-spacing="4">SYLENTS</text>'
		. '</svg>';
	return 'data:image/svg+xml;base64,' . base64_encode( $svg );
}

/**
 * Aligned site header — matches the sylents.de (Astro) header:
 * SVG logo, nav → Astro pages, cyan Shop pill, EN switch.
 * Injected at wp_body_open; the theme's default #site-header is hidden via CSS.
 */
add_action( 'wp_body_open', 'sylents_site_header' );
function sylents_site_header() {
	$home = 'https://www.sylents.de/';
	?>
	<header class="sy-nav" id="sy-nav">
		<div class="sy-nav-inner">
			<a href="<?php echo esc_url( $home ); ?>" class="sy-logo" aria-label="Sylents — Startseite">
				<img src="<?php echo esc_url( $home . 'sylents-2c_1.svg' ); ?>" alt="Sylents" width="125" height="37">
			</a>
			<nav class="sy-nav-links" aria-label="Hauptnavigation">
				<a href="<?php echo esc_url( $home ); ?>">Home</a>
				<a href="<?php echo esc_url( $home . 'produktseite/' ); ?>">Produkte</a>
				<a href="<?php echo esc_url( $home . 'karriere/' ); ?>">Karriere</a>
				<a href="<?php echo esc_url( $home . 'team/' ); ?>">Team</a>
				<a href="<?php echo esc_url( $home . 'shop/' ); ?>" class="sy-btn sy-btn-sm sy-nav-cta" aria-current="page">Shop</a>
				<a href="<?php echo esc_url( $home . 'en/' ); ?>" class="sy-lang">EN</a>
			</nav>
		</div>
	</header>
	<?php
}
