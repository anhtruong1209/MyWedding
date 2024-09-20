jQuery(document).ready(function() {
    jQuery(function() {
        jQuery('#defaultCountdown').countdown({ until: new Date(2024, 10, 10, 17) }); // year, month, date, hour
        jQuery('#defaultCountdownHoi').countdown({ until: new Date(2024, 10, 2, 14) }); // year, month, date, hour
    });
});