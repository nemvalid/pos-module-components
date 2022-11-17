const tablistWrappers = document.querySelectorAll('[data-pos-component="Tabs"]');
tablistWrappers.forEach(tablistWrapper => {
  const tabs = tablistWrapper.querySelectorAll('button');
  const panels = tablistWrapper.querySelectorAll('.pos-tabs__panel');
  let firstTab = null;
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
  });
  firstTab.classList.add("pos-tabs__tab--active");

});
