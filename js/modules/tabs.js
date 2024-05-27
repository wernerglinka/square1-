const tabs = ( () => {
  function TabsObj( tabsContainer, options = {} ) {
    const defaultOptions = {
      activeClass: 'active',
      labelClass: 'tab-label',
      contentClass: 'tab-content',
      contentWrapperClass: 'tabs-content',
    };

    const settings = { ...defaultOptions, ...options };

    const tabsInstance = {
      tabsContainer,
      options: settings,
      allTabs: tabsContainer.querySelectorAll( `.${ settings.labelClass }` ),
      allTabContents: tabsContainer.querySelectorAll( `.${ settings.contentClass }` ),
      tabsContent: tabsContainer.querySelector( `.${ settings.contentWrapperClass }` ),
    };

    tabsContainer.isVertical = tabsContainer.classList.contains( 'is-vertical' );

    const calculateTallestContent = () => {
      let tallestHeight = 0;
      tabsInstance.allTabContents.forEach( ( tabContent ) => {
        const contentHeight = tabContent.offsetHeight;
        if ( contentHeight > tallestHeight ) {
          tallestHeight = contentHeight;
        }
      } );
      return tallestHeight;
    };

    const setContentHeight = () => {
      if ( tabsInstance.tabsContent ) {
        const tallestHeight = calculateTallestContent();
        tabsInstance.tabsContent.style.height = `${ tallestHeight }px`;
      }
    };

    const activateTab = ( index ) => {
      console.log( index );
      console.log( tabsContainer.isVertical );

      tabsInstance.allTabs.forEach( ( tab, i ) => {
        tab.classList.toggle( settings.activeClass, i === index );
        // only the horizontal tabs have a seperate tab content.
        // vertical tabs have an inline-content display
        if ( !tabsContainer.isVertical ) {
          tabsInstance.allTabContents[ i ].classList.toggle( settings.activeClass, i === index );
        }
      } );
    };

    const handleTabClick = ( event ) => {
      const { target } = event;
      const thisTab = target.closest( `.${ settings.labelClass }` );
      if ( thisTab.classList.contains( settings.labelClass ) ) {
        const clickedTabIndex = Array.from( tabsInstance.allTabs ).indexOf( thisTab );
        activateTab( clickedTabIndex );
      }
    };

    setContentHeight();

    tabsContainer.addEventListener( 'click', handleTabClick );

    // Activate the first tab by default
    activateTab( 0 );

    // Observe size changes to adjust dimensions
    if ( tabsInstance.tabsContent ) {
      const resizeObserver = new ResizeObserver( setContentHeight );
      resizeObserver.observe( document.body );
    }

    return tabsInstance;
  }

  const initTabs = () => {
    const tabsContainers = document.querySelectorAll( '.js-tabs' );
    tabsContainers.forEach( ( tabsContainer ) => new TabsObj( tabsContainer ) );
  };

  return {
    init: initTabs,
  };
} )();

export default tabs;
