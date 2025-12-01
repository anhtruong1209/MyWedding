jQuery(document).ready(function () {
  jQuery(function () {
    jQuery("#defaultCountdown").countdown({
      until: new Date(2025, 11, 27, 17),
    }); // year, month, date, hour - Nhà trai 27/12/2025
    jQuery("#defaultCountdownHoi").countdown({
      until: new Date(2025, 11, 25, 17),
    }); // year, month, date, hour - Nhà gái 25/12/2025
  });
});
