<?php
  /**
   * Render a logo card component
   */
  function render_logos_list_component($resources) {
    if (!empty($resources)) {
      $output = "<ul class='logos-cards'>";
      
      foreach ($resources as $resource) {
        $resourceID = $resource->ID;
        $title = get_the_title($resourceID);
        $logoURL = get_the_post_thumbnail_url($resourceID);
        $synopsis = get_field('synopsis', $resourceID);
        $link = get_field('link', $resourceID)['link'];
        $url = $link['url'];
        $target = $link['target'];
        $label = $link['title'];
        $external_attributes = isset($target) ? "target='_blank' rel='noopener noreferrer'" : null;
        $term_list = get_the_terms($resourceID, 'resource-taxonomy');
        $category = $term_list[0]->slug;

        $output .= "
          <li class='card'>
            <div class='image'>
                <img src='{$logoURL}' alt='{$title}'/>
            </div>
            
            <div class='category'>{$category}</div>
            <p class='title'>{$title}</p>
            <p class='synopsis'>{$synopsis}</p>
            
            <div class='footer'>
                <a class='cta' href='{$url}' {$external_attributes}>{$label}</a>
            </div>
          </li>";
      }
      $output .= "</ul>";
      return $output;
    }
  }
  