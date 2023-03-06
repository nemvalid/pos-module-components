/*
  handles showing the floating notifications

  usage:
    new api.flash('type', 'message');
    or
    let notification = new api.flash('type', 'message')
    notification.remove();

  types:
    error
    success
    info
*/



// purpose:		shows the floating alert
// arguments: type of the message (string)
//            the message to show (string)
//            settings to overwrite the defaults (object)
// ************************************************************************
if (!window.posComponents) window.posComponents = {};
window.posComponents.flash = function(type, message, userSettings){

  // cache 'this' value not to be overwritten later
  const module = this;

  // purpose:		settings that are being used across the module
  // ------------------------------------------------------------------------
  module.settings = {};
  // notifications container (dom node)
  module.settings.container = document.querySelector('[data-pos-component="flashes"]');
  // the html template to be used for notifications (dom node)
  module.settings.template = module.settings.container.querySelector('[data-flash-template]');
  // the selector for the text content in the template (string)
  module.settings.contentSelector = '[data-flash-content]';
  // the selector for the button that closes the notification (string)
  module.settings.close = '[data-flash-close]';
  // the notification in dom (dom object)
  module.settings.notification = null;
  // if you want to overwrite the default autohide (bool)
  module.settings.autohide = (userSettings?.autohide !== undefined) ? userSettings.autohide : (type === 'success') ? true : false;
  // if you want a delay before the notification appears, miliseconds (int)
  module.settings.delay = (userSettings?.delay) ? userSettings.delay : false;
  // to enable debug mode (bool)
  module.settings.debug = (userSettings?.debug) ? userSettings.debug : false;

  let autoHideTimeout = null;



  // purpose:		initializes the component
  // ------------------------------------------------------------------------
  module.init = () => {
    if(module.settings.delay){
      setTimeout(() => {
        module.show();
      }, module.settings.delay);
    } else {
      module.show();
    }

    // auto hide the message when it is a success
    if(module.settings.autohide){
      autoHideTimeout = setTimeout(() => {
        module.hide();
      }, (module.settings.debug) ? 700 : 5000);
    }
  };


  // purpose:		shows the notification
  // ------------------------------------------------------------------------
  module.show = () => {
    // clone the template
    module.settings.notification = module.settings.template.content.firstElementChild.cloneNode(true);

    // remove the notification styles for all other types than the currently selected
    module.settings.notification.querySelectorAll('[data-flash] > div > div').forEach((item) => {
      if(!item.matches(`[data-flash-${type}]`)){
        item.remove();
      }
    });

    // apply the message to content
    module.settings.notification.querySelector(module.settings.contentSelector).innerHTML = message;

    // set the option to close notification when clicking on close button
    module.settings.notification.querySelector(module.settings.close).addEventListener('click', () => {
      module.hide();
    }, {once: true});

    // add the class that will animate the appearing
    module.settings.notification.classList.add('flash-loading');

    // when we append the template to the container we are loosing the reference so we need to get it back
    module.settings.notification = module.settings.container.appendChild(module.settings.notification);

  };


  // purpose:		hides the notification
  // ------------------------------------------------------------------------
  module.hide = () => {
    // we don't need the autohide feature anymore
    clearTimeout(autoHideTimeout);

    // add a class that will animate removing the node
    module.settings.notification.classList.add('flash-unloading');

    // remove the node from DOM as it's not needed anymore
    module.settings.notification.addEventListener('animationend', () => {
      module.settings.notification.remove();
    });
  };


  module.init();

};

document.dispatchEvent(new Event('apiFlashReady'));
