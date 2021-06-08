function bs_init(){
    /* Gestion des formulaires pour Bootstrap 5 */
    $('input').not('[type=submit]')
              .not('[type=radio]')
              .not('[type=checkbox]')
              .not('[type=hidden]')
              .not('[type=IMAGE]')
              .not('[name=session_remember]')
              .not('.custom-input')
              .addClass('form-control');
    $('textarea').addClass('form-control w-100');

    /* gestion radio et checkbox */
    $('input[type=radio]').removeClass('radio').css({'margin-left':'0'}).parent().addClass('radio');
    $('input[type=checkbox]').css({'margin-left':'0'}).parent().addClass('checkbox');

    /* special pour la les radios et checkbox avec la class radio-inline et checkbopx-inline */
    $('label.radio-inline').removeClass('radio').css({'margin-right':'10px'}).children().css({'margin-left':'-18px'});

    $('input[type=submit]').addClass('btn btn-cmontee');
    $('button[type=submit]').addClass('btn btn-cmontee');
};

jQuery(function(){
    bs_init();

    // Lancement du script à la fin d'une requête ajax
    $(document).ajaxComplete(function(event, jqxhr, options){
        bs_init();
    });
});