const faqs = ( function () {
  function init() {
    const allFAQs = document.querySelectorAll( '.js-faq' );

    allFAQs.forEach( ( faq ) => {
      const question = faq.querySelector( '.question' );
      const answer = faq.querySelector( '.answer' );

      // first pass close all answers
      answer.classList.add( 'hidden' );

      // add a click handler to all questions
      question.addEventListener( 'click', ( e ) => {
        const target = e.target;
        target.classList.toggle( 'open' );
        const parent = target.parentElement;
        parent.querySelector( '.answer' ).classList.toggle( 'hidden' );
      } );
    } );
  }

  return {
    init,
  };
}() );

export default faqs;
