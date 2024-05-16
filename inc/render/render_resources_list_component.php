<?php
  /** 
   * Render a resourse card component
   */
  function render_resources_list_component($resources) {
    if (!empty($resources)) {
      $output = "<ul class='resources-cards'>";
      foreach ($resources as $resource) {
        $resourceID = $resource->ID;
        $title = get_the_title($resourceID);
        $thumbnailURL = get_field('image', $resourceID);
        $link = get_field('link', $resourceID)['link'];
        $url = $link['url'];
        $target = $link['target'];
        $label = $link['title'];
        $external_attributes = isset($target) ? "target='_blank' rel='noopener noreferrer'" : null;
        $term_list = get_the_terms($resourceID, 'resource-taxonomy');
        $category = $term_list[0]->slug;

        $output .= "<li class='card'>
            <div class='header'>
                <div class='category'>{$category}</div>
                <p class='title'>{$title}</p>
            </div>
            <div class='image'>
                <img src='{$thumbnailURL}' alt='{$title}'/>
            </div>
            <div class='footer'>
                <a class='cta' href='{$url}' {$external_attributes}>{$label}</a>
            </div>
        </li>";
      }
      $output .= "</ul>";
      return $output;
    }
  }
  