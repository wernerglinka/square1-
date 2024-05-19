<?php
  /**
   * Render a faqs component
   */
  function render_faqs_component($faqs, $single_active = false) {
    $single_active_class = $single_active ? 'js-single-active' : '';
    if (!empty($faqs)) {
      $output = <<<HTML
        <ul class='faqs js-faqs {$single_active_class}'>
      HTML;
      
      foreach ($faqs as $faq) {
        $question = $faq['question'];
        $answer = $faq['answer'];
        
        $output .= <<<HTML
          <li class='faq js-faq'>
            <h3 class='question'>{$question}</h3>
            <div class='answer'>{$answer}</div>
          </li>
        HTML;
      }
      $output .= <<<HTML
        </ul>
      HTML;
      return $output;
    }
  }