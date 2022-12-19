const datepickerWrappers = document.querySelectorAll('[data-pos-component="date-picker"]');
datepickerWrappers.forEach(datepickerWrapper => {
  duDatepicker(datepickerWrapper);
  console.log(datepickerWrapper);
});
