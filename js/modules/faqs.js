const frequentlyAskedQuestions = ( () => {
  function FAQsObj( thisFAQs, singleActive ) {
    const faqs = thisFAQs.querySelectorAll( '.faq' );

    const initFAQs = () => {
      faqs.forEach( ( faq ) => {
        const question = faq.querySelector( '.question' );
        const answer = faq.querySelector( '.answer' );

        // first pass close all answers
        answer.classList.add( 'hidden' );

        // add a click handler to all questions
        question.addEventListener( 'click', ( e ) => {
          const target = e.target;
          const parent = target.parentElement;

          if ( singleActive ) {
            // close a currently open FAQ
            const openQuestion = thisFAQs.querySelector( '.question.open' );
            if ( openQuestion ) {
              const openAnswer = openQuestion.parentElement.querySelector( '.answer' );
              openQuestion.classList.remove( 'open' );
              openAnswer.classList.add( 'hidden' );

              // if the clicked question is the currently open question, stop here
              if ( openQuestion === target ) {
                return;
              }

              // add a transitionend event listener to the currently open answer
              openAnswer.addEventListener( 'transitionend', function transitionEnd() {
                // remove the event listener so it only triggers once
                openAnswer.removeEventListener( 'transitionend', transitionEnd );

                // open the clicked question and its answer
                target.classList.add( 'open' );
                parent.querySelector( '.answer' ).classList.remove( 'hidden' );
              } );
            } else {
              // if no question was open, open the clicked question and its answer
              target.classList.add( 'open' );
              parent.querySelector( '.answer' ).classList.remove( 'hidden' );
            }
          } else {
            target.classList.toggle( 'open' );
            parent.querySelector( '.answer' ).classList.toggle( 'hidden' );
          }
        } );
      } );
    };

    initFAQs();

    return {
      faqs,
    };
  }

  const initFrequentlyAskedQuestions = () => {
    const allFAQs = document.querySelectorAll( '.js-faqs' );

    allFAQs.forEach( ( thisFAQs ) => {
      const singleActive = thisFAQs.classList.contains( 'js-single-active' );
      return new FAQsObj( thisFAQs, singleActive );
    } );
  };

  return {
    init: initFrequentlyAskedQuestions,
  };
} )();

export default frequentlyAskedQuestions;
