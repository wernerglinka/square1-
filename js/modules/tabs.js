const tabs = ( () => {
  function TabsObj( tabsContainer, options = {} ) {
    const defaultOptions = {
      // Add default options if needed
    };

    const tabsInstance = {
      tabsContainer,
      options: { ...defaultOptions, ...options },
      allTabs: tabsContainer.querySelectorAll( '.tab-label' ),
      allTabContents: tabsContainer.querySelectorAll( '.tab-content' ),
      tabsContent: tabsContainer.querySelector( '.tabs-content' ),
    };

    const init = () => {
      const { allTabs, allTabContents, tabsContent } = tabsInstance;

      if ( tabsContent ) {
        // loop through all tab contents and find the tallest one
        let tallestTabContent = 0;
        allTabContents.forEach( ( tabContent ) => {
          if ( tabContent.offsetHeight > tallestTabContent ) {
            tallestTabContent = tabContent.offsetHeight;
          }
        } );

        // set tab content wrapper to the height of the tallest tab content
        tabsContent.style.height = `${ tallestTabContent }px`;

        // observe viewport width changes and update tab content height
        const resizeObserver = new ResizeObserver( ( entries ) => {
          entries.forEach( () => {
            // loop through all tab contents and find the tallest one
            tallestTabContent = 0;
            allTabContents.forEach( ( tabContent ) => {
              if ( tabContent.offsetHeight > tallestTabContent ) {
                tallestTabContent = tabContent.offsetHeight;
              }
            } );

            // set tab content wrapper to the height of the tallest tab content
            tabsContent.style.height = `${ tallestTabContent }px`;
          } );
        } );

        resizeObserver.observe( document.body );
      }

      allTabs.forEach( ( tab ) => {
        tab.addEventListener( 'click', () => {
          // remove active class from all tabs
          allTabs.forEach( ( thisTab ) => thisTab.classList.remove( 'active' ) );

          // add active class to clicked tab
          tab.classList.add( 'active' );

          // convert allTabs nodelist to array and get index of clicked tab
          const clickedTabIndex = Array.from( allTabs ).indexOf( tab );

          // remove active class from all tab contents
          allTabContents.forEach( ( tabContent ) => tabContent.classList.remove( 'active' ) );

          // add active class to tab content with same index as clicked tab
          allTabContents[ clickedTabIndex ].classList.add( 'active' );
        } );
      } );
    };

    init();

    return tabsInstance;
  }

  const initTabs = () => {
    // get all tabs containers
    const tabsContainers = document.querySelectorAll( '.js-tabs' );

    // loop through all tabs containers and initialize tabs
    tabsContainers.forEach( ( tabsContainer ) => new TabsObj( tabsContainer ) );
  };

  return {
    init: initTabs,
  };
} )();

export default tabs;
