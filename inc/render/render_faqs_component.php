<?php
  /**
   * Render a faqs component
   */
  function render_faqs_component($faqs) {
    if (!empty($faqs)) {
      $output = <<<HTML
        <ul class='faqs js-faqs'>
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