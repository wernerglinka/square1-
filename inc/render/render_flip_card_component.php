<?php
  /** 
   * Render a flip card component
   */
  function render_flip_card_component($card) {
    $title = $card['front']['title'] ?? null;
    $sub_title = $card['front']['sub_title'] ?? null;
    $prose = $card['front']['prose'] ?? null;
    $backside_title = $card['back']['title'] ?? null;
    $backside_sub_title = $card['back']['sub_title'] ?? null;
    $backside_prose = $card['back']['prose'] ?? null;

    $output = "<li>
      <div class='flip-card-wrapper'>
        <div class='flip-card'>
          <span class='icon'>" . get_icon($card['icon']) . "</span>
          <span class='flip-icon'>" . get_icon('rotate') . "</span>";
    if ($title) {
      $output .= "<h3>" . $title . "</h3>";
    }
    if ($sub_title) {
      $output .= "<p class='sub-title'>" . $sub_title . "</p>";
    }
    if ($prose) {
      $output .= "<div class='prose'>" . $prose . "</div>";
    }
    $output .= "  </div>
        <div class='flip-card-back'>";
    if ($backside_title) {
      $output .= "<h3>" . $backside_title . "</h3>";
    }
    if ($backside_sub_title) {
      $output .= "<p class='sub-title'>" . $backside_sub_title . "</p>";
    }
    if ($backside_prose) {
      $output .= "<div class='prose'>" . $backside_prose . "</div>";
    }
    $output .= "  </div>
      </div>
    </li>";

    return $output;
  }