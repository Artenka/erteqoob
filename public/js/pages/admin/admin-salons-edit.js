$(function () {
  var dropifyGallery = $('.dropify-gallery').dropify({
    messages: {
      default: 'Перетащите файл сюда или нажмите',
      replace: 'Перетащите файл сюда или нажмите для изменения',
      remove: 'Удалить',
      error: 'К сожалению, файл слишком большой'
    },
    error: {
      'fileSize': 'Размер файла слишком большой ({{ value }} max).'
    }
  });

  dropifyGallery.on('dropify.afterClear', function (event, element) {
    $('input[name="galleryPath"][value="' + $(element)[0]['element']['dataset']['defaultFile'] + '"]').val('');
  });

  $("input[type=file].dropify-gallery").on('change', function () {
    $('input[name="galleryPath"][value="' + $(this).data('default-file') + '"]').val('');
  });

  $(document).on('click', '#addGallery', function () {
    $(this).closest('.row').prev('.row').find('#galleryBlock').append(
      '<div class="col-sm-6 col-sx-12 m-b-20"><input class="dropify-gallery" type="file" name="gallery" accept="image/jpg,image/jpeg,image/png,image/bmp" data-max-file-size="2M" /></div>'
    );

    var dropifyGallery = $('.dropify-gallery').dropify({
      messages: {
        default: 'Перетащите файл сюда или нажмите',
        replace: 'Перетащите файл сюда или нажмите для изменения',
        remove: 'Удалить',
        error: 'К сожалению, файл слишком большой'
      },
      error: {
        'fileSize': 'Размер файла слишком большой ({{ value }} max).'
      }
    });
  });
});


$(function(){
  var dropifyTeachers = $('.dropify-teachers').dropify({
    messages: {
      default: 'Перетащите файл сюда или нажмите',
      replace: 'Перетащите файл сюда или нажмите для изменения',
      remove: 'Удалить',
      error: 'К сожалению, файл слишком большой'
    },
    error: {
      'fileSize': 'Размер файла слишком большой ({{ value }} max).'
    }
  });

  dropifyTeachers.on('dropify.afterClear', function (event, element) {
    $(this).closest('.form-group').find('input[name=teachers_deleted]').val('true');
    $('input[name="teachersPath"][value="' + $(element)[0]['element']['dataset']['defaultFile'] + '"]').val('')
  });

  $("input[type=file].dropify-teachers").on('change', function () {
    $(this).closest('.form-group').find('input[name=teachers_deleted]').val('false');
    $(this).closest('.form-group').find('input[name=teachersPath]').val('');
  });

  $(document).on('click', '#addTeachers', function () {
    $('#teachersBlock').append(
      '<div class="panel panel-default">' +
      '<div class="panel-heading">&nbsp;' +
      '<div class="panel-action"><a href="#" data-perform="panel-collapse"><i class="ti-minus"></i></a><a href="#" data-perform="panel-dismiss"><i class="ti-close"></i></a></div>' +
      '</div>' +
      '<div class="panel-wrapper collapse in" aria-expanded="true">' +
      '<div class="panel-body">' +
      '<div class="row">' +
      '<div class="col-sm-6 col-xs-12">' +
      '<div class="form-group">' +
      '<label>Имя:</label>' +
      '<textarea class="form-control" name="teachers_name" required=""></textarea>' +
      '</div>' +
      '</div>' +
      '<div class="col-sm-6 col-xs-12">' +
      '<div class="form-group">' +
      '<label>Должность:</label>' +
      '<textarea class="form-control" name="teachers_position"></textarea>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-sm-6 col-xs-12">' +
      '<div class="form-group">' +
      '<label>Фейсбук:</label>' +
      '<textarea class="form-control" name="teachers_fb"></textarea>' +
      '</div>' +
      '</div>' +
      '<div class="col-sm-6 col-xs-12">' +
      '<div class="form-group">' +
      '<label>Инстаграм:</label>' +
      '<textarea class="form-control" name="teachers_in"></textarea>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-sm-6 col-sx-12">' +
      '<div class="form-group">' +
      '<label class="control-label">Фотография (300 X 450):</label>' +
      '<input type="hidden" name="teachersPath" value="" />' +
      '<input class="dropify-teachers" type="file" name="teachers_photo" accept="image/jpg,image/jpeg,image/png,image/bmp" data-max-file-size="2M" />' +
      '<input type="hidden" name="teachers_deleted" value="false" />' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );

    var dropifyTeachers = $('.dropify-teachers').dropify({
      messages: {
        default: 'Перетащите файл сюда или нажмите',
        replace: 'Перетащите файл сюда или нажмите для изменения',
        remove: 'Удалить',
        error: 'К сожалению, файл слишком большой'
      },
      error: {
        'fileSize': 'Размер файла слишком большой ({{ value }} max).'
      }
    });
  });
});


$(function () {
  var dropifyPrices = $('.dropify-prices').dropify({
    messages: {
      default: 'Перетащите файл сюда или нажмите',
      replace: 'Перетащите файл сюда или нажмите для изменения',
      remove: 'Удалить',
      error: 'К сожалению, файл слишком большой'
    },
    error: {
      'fileSize': 'Размер файла слишком большой ({{ value }} max).'
    }
  });

  dropifyPrices.on('dropify.afterClear', function (event, element) {
    $(this).closest('.form-group').find('input[name=prices_deleted]').val('true');
    $('input[name="pricesPath"][value="' + $(element)[0]['element']['dataset']['defaultFile'] + '"]').val('')
  });

  $("input[type=file].dropify-prices").on('change', function () {
    $(this).closest('.form-group').find('input[name=prices_deleted]').val('false');
    $(this).closest('.form-group').find('input[name=pricesPath]').val('');
  });

  $('body').on('click', '#addPrices', function () {
    var counter =  parseInt($(this).attr('data-counter'), 10);
    counter++;
    $(this).attr('data-counter', counter);
    $('#pricesBlock').append(
      '<div class="panel panel-default" data-item="'+ counter +'">' +
      '<div class="panel-heading">&nbsp;' +
      '<div class="panel-action"><a href="#" data-perform="panel-collapse"><i class="ti-minus"></i></a><a href="#" class="panel-dismiss" data-perform="panel-dismiss"><i class="ti-close"></i></a></div>' +
      '</div>' +
      '<div class="panel-wrapper collapse in" aria-expanded="true">' +
      '<div class="panel-body">' +
      '<div class="row">' +
      '<div class="col-sm-6 col-xs-12">' +
      '<div class="form-group">' +
      '<label>Имя мастера:</label>' +
      '<textarea class="form-control" name="prices_name" required=""></textarea>' +
      '</div>' +
      '</div>' +
      '<div class="col-sm-6 col-sx-12">' +
      '<div class="form-group">' +
      '<label class="control-label">Фотография мастера (300 X 300):</label>' +
      '<input type="hidden" name="pricesPath" value="" />' +
      '<input class="dropify-prices" type="file" name="prices_photo" accept="image/jpg,image/jpeg,image/png,image/bmp" data-max-file-size="2M" />' +
      '<input type="hidden" name="prices_deleted" value="false" />' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="positionsBlock"></div>' +
      '<button class="addPositions btn" type="button">Добавить позицию прайслиста</button>' +
      '</div>' +
      '</div>' +
      '</div>'
    );

    var dropifyPrices = $('.dropify-prices').dropify({
      messages: {
        default: 'Перетащите файл сюда или нажмите',
        replace: 'Перетащите файл сюда или нажмите для изменения',
        remove: 'Удалить',
        error: 'К сожалению, файл слишком большой'
      },
      error: {
        'fileSize': 'Размер файла слишком большой ({{ value }} max).'
      }
    });
  });

  $('body').on('click', '#pricesBlock .panel-dismiss .ti-close', function(){
    $('#addPrices').attr('data-counter', parseInt($('#addPrices').attr('data-counter'), 10) - 1);

    setTimeout(function(){
      $('#pricesBlock .panel').each(function(index, element){
        $(element).attr('data-item', index+1);
        $(element).find('.prices-positions-name').attr('name', 'prices_positions_'+ (parseInt(index, 10)+1) +'_name');
        $(element).find('.prices-positions-price').attr('name', 'prices_positions_'+ (parseInt(index, 10)+1) +'_price');
      });
    }, 300);

  });
});


$(function(){
  // add/remove pricelist position
  $(document).on('click', '.remove-positions', function () {
    $(this).closest('.row').closest('.positions-row').remove();
  });

  var i;
  $(document).on('click', '.addPositions', function(){
    i = $(this).closest('.panel').attr('data-item');
    $(this).prev('.positionsBlock').append(
      '<div class="positions-row">'+
      '<div class="row">'+
      '<div class="col-sm-8 col-xs-7">'+
      '<label>Название:</label>' +
      '<input class="form-control prices-positions-name" type="text" name="prices_positions_'+ i +'_name" required="" value=""/>'+
      '</div>'+
      '<div class="col-sm-3 col-xs-3">'+
      '<label>Цена:</label>' +
      '<input class="form-control prices-positions-price" type="text" name="prices_positions_'+ i +'_price" value=""/>'+
      '</div>'+
      '<div class="col-sm-1 col-xs-2">'+
      '<label>&nbsp;</label>' +
      '<button type="button" class="btn btn-circle remove-positions">'+
      '<i class="fa fa-times"></i>'+
      '</button>'+
      '</div>'+
      '</div>'+
      '<br/>'+
      '</div>'
    );
  });
});