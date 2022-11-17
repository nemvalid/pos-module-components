const tablistWrappers = document.querySelectorAll('.pos-tabs__tablist');
tablistWrappers.forEach(tablistWrapper => {
  const tabs = tablistWrapper.querySelectorAll('button');
  let firstTab = null;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(tab => {
        tab.classList.remove("pos-tabs__tab--active");
      });
      tab.classList.add("pos-tabs__tab--active");
    });
    if (!firstTab) {
      firstTab = tab;
    }
  });
  firstTab.classList.add("pos-tabs__tab--active");

});
