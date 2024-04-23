<?php
/**
 * square1 functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package square1
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function square1_setup() {
	/**
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on square1, use a find and replace
	 * to change 'square1' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'square1', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/**
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 * This is beneficial for SEO (Search Engine Optimization) as it allows 
	 * each page or post to have a unique title, which can help search engines 
	 * understand the content of the page better. It also improves the user 
	 * experience by providing a meaningful title in the browser tab for each page.
	 */
	add_theme_support( 'title-tag' );

	/**
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	/**
	 * This theme uses wp_nav_menu() in one location.
	 */ 
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'square1' ),
		)
	);

	/**
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);	 
}
add_action( 'after_setup_theme', 'square1_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 * Priority 0 to make it available to lower priority callbacks.
 * @global int $content_width
 
function square1_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'square1_content_width', 640 );
}
add_action( 'after_setup_theme', 'square1_content_width', 0 );
*/


/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function square1_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'square1' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'square1' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'square1_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function square1_scripts() {
	$version = filemtime(get_template_directory() . '/style.css');
	wp_enqueue_style( 'square1-style', get_stylesheet_uri(), array(), $version );

	$version = filemtime(get_template_directory() . '/scripts.js');
	wp_enqueue_script('square1-scripts', get_template_directory_uri() . '/scripts.js', array(), $version, true);

}
add_action( 'wp_enqueue_scripts', 'square1_scripts' );

//Replace style-login.css with the name of your custom CSS file
function my_custom_login_stylesheet()
{
    wp_enqueue_style('custom-login', get_stylesheet_directory_uri() . '/style-login.css');
}
//This loads the function above on the login page
add_action('login_enqueue_scripts', 'my_custom_login_stylesheet');


/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/** 
 * Modifications start here
 */

