const tablistWrappers = document.querySelectorAll('[data-pos-component="Tabs"]');
tablistWrappers.forEach(tablistWrapper => {
  const tabs = [...tablistWrapper.querySelectorAll('button')];
  const panels = tablistWrapper.querySelectorAll('.pos-tabs__panel');
  let firstTab = null;
  let lastTab = null;

  const supportKeyboardNavigation = (event) => {
    const currentTab = event.currentTarget;

    if (event.key == 'ArrowLeft') {
      event.preventDefault();
      if (currentTab === firstTab) {
        lastTab.focus();
      } else {
        index = tabs.indexOf(currentTab);
        tabs[index - 1].focus();
      }
    }

    if (event.key == 'ArrowRight') {
      event.preventDefault();
      if (currentTab === lastTab) {
        firstTab.focus();
      } else {
        index = tabs.indexOf(currentTab);
        tabs[index + 1].focus();
      }
    }

    if (event.key == 'Home') {
      event.preventDefault();
      firstTab.focus();
    }

    if (event.key == 'End') {
      event.preventDefault();
      lastTab.focus();
    }
  }


  tabs.forEach((currentTab, currentTabIndex) => {
    currentTab.addEventListener('click', () => {
      tabs.forEach((tab, index) => {
        if (currentTab === tab) {
          tab.classList.add("pos-tabs__tab--active");
          panels[index].classList.remove("hidden");
        } else {
          tab.classList.remove("pos-tabs__tab--active");
          panels[index].classList.add("hidden");
        }
      });

    });
    panels[currentTabIndex].classList.add("hidden");
    if (!firstTab) {
      firstTab = currentTab;
      panels[currentTabIndex].classList.remove("hidden");
    }
    lastTab = currentTab;

    currentTab.addEventListener("keydown", supportKeyboardNavigation);
  });
  firstTab.classList.add("pos-tabs__tab--active");
});
