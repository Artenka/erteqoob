var $ = jQuery.noConflict();

$(document).ready(function(){
  // $(".sortable").sortable();
  // $(".sortable").disableSelection();

  if ($(".mymce").length > 0) {
    initTinyMCE();
  }


  updateItemsNumber('kiev');
  updateItemsNumber('kharkiv');

  addItemClick();
});


function addItemClick() {
  $('.addBlock').click(function(){
    var city = $(this).data('city');
    var counter =  parseInt($(this).attr('data-counter'), 10);
    var block_type = $('input[name=block_type_'+ city +']:checked').val();

    var $blockLayout = $('#'+ city +'CoursesBlocks');

    switch (block_type) {
      case 'block_intro':
        $blockLayout.append(returnBlockIntro(counter, city));
        break;
      case 'block_foundation':
        $blockLayout.append(returnBlockFoundation(counter, city));
        break;
      case 'block_masters':
        $blockLayout.append(returnBlockMasters(counter, city));
        break;
      case 'block_masters_2':
        $blockLayout.append(returnBlockMasters_2(counter, city));
        break;
      case 'block_skills':
        $blockLayout.append(returnBlockSkills(counter, city));
        break;
      case 'block_format':
        $blockLayout.append(returnBlockFormat(counter, city));
        break;
      case 'block_program':
        $blockLayout.append(returnBlockProgram(counter, city));
        break;
      case 'block_program_2':
        $blockLayout.append(returnBlockProgram_2(counter, city));
        break;
      case 'block_study':
        $blockLayout.append(returnBlockStudy(counter, city));
        break;
      case 'block_philosophy':
        $blockLayout.append(returnBlockPhilosophy(counter, city));
        break;
      case 'block_teachers':
        $blockLayout.append(returnBlockTeachers(counter, city));
        break;
      case 'block_action':
        $blockLayout.append(returnBlockAction(counter, city));
        break;
    }

    counter++;
    $(this).attr('data-counter', counter);

    $('.dropify').dropify({
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

    initTinyMCE();
  });
}


function updateItemsNumber(city) {
  var deleteConfirmed = false;

  $('body').on('click', '#'+ city +'Tab .panel-dismiss', function(e){
    // e.preventDefault();
    //
    // if (!deleteConfirmed) {
    //   if (confirm('Delete?')) {
    //     deleteConfirmed = true;
    //     $(this).trigger('click');
    //   }
    // } else {
    //   deleteConfirmed = false;
    // }

    var $addBtn = $('#'+ city +'Tab .addBlock');
    var counter =  parseInt($addBtn.attr('data-counter'), 10);
    counter--;
    $addBtn.attr('data-counter', counter);

    var prevNumber;
    var currentName = '';

    setTimeout(function(){
      $('#'+ city +'Tab .panel').each(function( index ) {
        prevNumber = $(this).data('item');
        $(this).data('item', index);

        $(this).find('textarea').each(function(){
          currentName = $(this).attr('name');
          $(this).attr('name', currentName.replace(']['+ prevNumber +'][', ']['+ index +']['));
        });

        $(this).find('input').each(function(){
          currentName = $(this).attr('name');
          switch (true) {
            case currentName.search('_bg') >= 0:
              $(this).attr('name', currentName.replace('_'+ prevNumber +'_bg', '_'+ index +'_bg'));
              break;
            case currentName.search('_item_1_image') >= 0:
              $(this).attr('name', currentName.replace('_'+ prevNumber +'_item_1_image', '_'+ index +'_item_1_image'));
              break;
            case currentName.search('_item_2_image') >= 0:
              $(this).attr('name', currentName.replace('_'+ prevNumber +'_item_2_image', '_'+ index +'_item_2_image'));
              break;
            case currentName.search('_item_3_image') >= 0:
              $(this).attr('name', currentName.replace('_'+ prevNumber +'_item_3_image', '_'+ index +'_item_3_image'));
              break;
            case currentName.search('_item_4_image') >= 0:
              $(this).attr('name', currentName.replace('_'+ prevNumber +'_item_4_image', '_'+ index +'_item_4_image'));
              break;
            case currentName.search('_item_5_image') >= 0:
              $(this).attr('name', currentName.replace('_'+ prevNumber +'_item_5_image', '_'+ index +'_item_5_image'));
              break;
            case currentName.search('_item_6_image') >= 0:
              $(this).attr('name', currentName.replace('_'+ prevNumber +'_item_6_image', '_'+ index +'_item_6_image'));
              break;
            default:
              $(this).attr('name', currentName.replace(']['+ prevNumber +'][', ']['+ index +']['));
              break;
          }
        });

      });
    }, 300);
  });
}


function initTinyMCE(){
  tinymce.init({
    selector: ".mymce",
    theme: "silver",
    height: 300,
    file_browser_callback_types: 'image',
    images_upload_url: '/uploadMCE',
    automatic_uploads: true,
    plugins: [
      "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker"
      , "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking"
      , "save table contextmenu directionality emoticons template paste textcolor"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons",
  });
}


function returnBlockIntro(index, city) {
  return ""
    + "    <div class=\"panel panel-default\" data-item=\""+ index +"\">"
    + "        <div class=\"panel-heading\">Блок \"Вступление\""
    + "            <div class=\"panel-action\"><a href=\"#\" data-perform=\"panel-collapse\"><i class=\"ti-minus\"><\/i><\/a><a href=\"#\" class=\"panel-dismiss\" data-perform=\"panel-dismiss\"><i class=\"ti-close\"><\/i><\/a><\/div>"
    + "        <\/div>"
    + "        <div class=\"panel-wrapper collapse in\" aria-expanded=\"true\">"
    + "            <div class=\"panel-body\"><input class=\"form-control\" type=\"hidden\" name=\"pages["+ city +"]["+ index +"][block_type]\" required=\"\" value=\"block_intro\" \/>"
    + "                <div class=\"row\">"
    + "                    <div class=\"col-xs-12 col-sm-6\">"
    + "                        <div class=\"form-group\"><label>Подзаголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][subtitle]\"><\/textarea><\/div>"
    + "                    <\/div>"
    + "                    <div class=\"col-xs-12 col-sm-6\">"
    + "                        <div class=\"form-group\"><label>Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title]\"><\/textarea><\/div>"
    + "                    <\/div>"
    + "                <\/div>"
    + "                <div class=\"row\">"
    + "                    <div class=\"col-xs-12 col-sm-6\">"
    + "                        <div class=\"form-group\"><label>Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][text]\"><\/textarea><\/div>"
    + "                    <\/div>"
    + "                    <div class=\"col-xs-12 col-sm-6\">"
    + "                        <div class=\"form-group\"><label>Длительность:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][duration]\"><\/textarea><\/div>"
    + "                    <\/div>"
    // + "                    <div class=\"col-xs-12 col-sm-6\">"
    // + "                        <div class=\"form-group\"><label>Дата начала:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][date]\"><\/textarea><\/div>"
    // + "                    <\/div>"
    + "                <\/div>"
    + "                <div class=\"row\">"
    + "                    <div class=\"col-xs-12 col-sm-6\">"
    + "                        <div class=\"form-group\"><label>Текущее количество мест:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][seats_current]\" \/><\/div>"
    + "                    <\/div>"
    + "                    <div class=\"col-xs-12 col-sm-6\">"
    + "                        <div class=\"form-group\"><label>Общее количество мест:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][seats_total]\" \/><\/div>"
    + "                    <\/div>"
    + "                <\/div>"
    + "                <div class=\"row\">"
    + "                    <div class=\"col-xs-12 col-sm-6\">"
    + "                        <div class=\"form-group\"><label class=\"control-label\">Фоновое изображение (1920 X 1080):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_bg\" data-default-file=\"\" accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\""
    + "                                data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_deleted\" value=\"false\" \/><\/div>"
    + "                    <\/div>"
    + "                <\/div>"
    + "            <\/div>"
    + "        <\/div>"
    + "    <\/div>";
}

function returnBlockFoundation(index, city) {
  return ""
  + "    <div class=\"panel panel-default\" data-item=\""+ index +"\">"
  + "        <div class=\"panel-heading\">Блок \"Фундамент успешной профессии\""
  + "            <div class=\"panel-action\"><a href=\"#\" data-perform=\"panel-collapse\"><i class=\"ti-minus\"><\/i><\/a><a href=\"#\" class=\"panel-dismiss\" data-perform=\"panel-dismiss\"><i class=\"ti-close\"><\/i><\/a><\/div>"
  + "        <\/div>"
  + "        <div class=\"panel-wrapper collapse in\" aria-expanded=\"true\">"
  + "            <div class=\"panel-body\"><input class=\"form-control\" type=\"hidden\" name=\"pages["+ city +"]["+ index +"][block_type]\" required=\"\" value=\"block_foundation\" \/>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Подзаголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][subtitle]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Фоновое изображение (1920 X 1080):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_bg\" data-default-file=\"\" accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\""
  + "                                data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 1 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 1 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 2 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 2 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 3 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 3 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 4 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_4_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 4 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_4_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "            <\/div>"
  + "        <\/div>"
  + "    <\/div>";
}

function returnBlockMasters(index, city) {
  return ""
  + "    <div class=\"panel panel-default\" data-item=\""+ index +"\">"
  + "        <div class=\"panel-heading\">Блок \"Подходит для мастеров\""
  + "            <div class=\"panel-action\"><a href=\"#\" data-perform=\"panel-collapse\"><i class=\"ti-minus\"><\/i><\/a><a href=\"#\" class=\"panel-dismiss\" data-perform=\"panel-dismiss\"><i class=\"ti-close\"><\/i><\/a><\/div>"
  + "        <\/div>"
  + "        <div class=\"panel-wrapper collapse in\" aria-expanded=\"true\">"
  + "            <div class=\"panel-body\"><input class=\"form-control\" type=\"hidden\" name=\"pages["+ city +"]["+ index +"][block_type]\" required=\"\" value=\"block_masters\" \/>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Подзаголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][subtitle]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Фоновое изображение (1920 X 1080):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_bg\" data-default-file=\"\" accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\""
  + "                                data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 1 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 1 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 2 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 2 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 3 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 3 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 4 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_4_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 4 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_4_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Дисклеймер:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][disclaimer]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "            <\/div>"
  + "        <\/div>"
  + "    <\/div>";
}

function returnBlockMasters_2(index, city) {
  return ""
  + "    <div class=\"panel panel-default\" data-item=\""+ index +"\">"
  + "        <div class=\"panel-heading\">Блок \"Подходит для мастеров\" - 2"
  + "            <div class=\"panel-action\"><a href=\"#\" data-perform=\"panel-collapse\"><i class=\"ti-minus\"><\/i><\/a><a href=\"#\" class=\"panel-dismiss\" data-perform=\"panel-dismiss\"><i class=\"ti-close\"><\/i><\/a><\/div>"
  + "        <\/div>"
  + "        <div class=\"panel-wrapper collapse in\" aria-expanded=\"true\">"
  + "            <div class=\"panel-body\"><input class=\"form-control\" type=\"hidden\" name=\"pages["+ city +"]["+ index +"][block_type]\" required=\"\" value=\"block_masters_2\" \/>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Подзаголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][subtitle]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Фоновое изображение (1920 X 1080):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_bg\" data-default-file=\"\" accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\""
  + "                                data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 1 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 1 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 2 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 2 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "            <\/div>"
  + "        <\/div>"
  + "    <\/div>";
}

function returnBlockSkills(index, city) {
  return ""
  + "    <div class=\"panel panel-default\" data-item=\""+ index +"\">"
  + "        <div class=\"panel-heading\">Блок \"Вы научитесь\""
  + "            <div class=\"panel-action\"><a href=\"#\" data-perform=\"panel-collapse\"><i class=\"ti-minus\"><\/i><\/a><a href=\"#\" class=\"panel-dismiss\" data-perform=\"panel-dismiss\"><i class=\"ti-close\"><\/i><\/a><\/div>"
  + "        <\/div>"
  + "        <div class=\"panel-wrapper collapse in\" aria-expanded=\"true\">"
  + "            <div class=\"panel-body\"><input class=\"form-control\" type=\"hidden\" name=\"pages["+ city +"]["+ index +"][block_type]\" required=\"\" value=\"block_skills\" \/>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Подзаголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][subtitle]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Фоновое изображение (1920 X 1080):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_bg\" data-default-file=\"\" accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\""
  + "                                data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Левый столбец - пункт 1 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_1_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Левый столбец - пункт 1 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_1_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Левый столбец - пункт 2 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_2_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Левый столбец - пункт 2 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_2_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Левый столбец - пункт 3 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_3_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Левый столбец - пункт 3 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_3_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Центральный столбец - пункт 1 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_1_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Центральный столбец - пункт 1 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_1_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Центральный столбец - пункт 2 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_2_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Центральный столбец - пункт 2 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_2_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Центральный столбец - пункт 3 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_3_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Центральный столбец - пункт 3 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_3_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Правый столбец - пункт 1 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_1_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Правый столбец - пункт 1 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_1_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Правый столбец - пункт 2 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_2_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Правый столбец - пункт 2 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_2_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Правый столбец - пункт 3 - заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_3_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Правый столбец - пункт 3 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_3_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "            <\/div>"
  + "        <\/div>"
  + "    <\/div>";
}

function returnBlockFormat(index, city) {
  return ""
  + "    <div class=\"panel panel-default\" data-item=\""+ index +"\">"
  + "        <div class=\"panel-heading\">Блок \"Формат обучения\""
  + "            <div class=\"panel-action\"><a href=\"#\" data-perform=\"panel-collapse\"><i class=\"ti-minus\"><\/i><\/a><a href=\"#\" class=\"panel-dismiss\" data-perform=\"panel-dismiss\"><i class=\"ti-close\"><\/i><\/a><\/div>"
  + "        <\/div>"
  + "        <div class=\"panel-wrapper collapse in\" aria-expanded=\"true\">"
  + "            <div class=\"panel-body\"><input class=\"form-control\" type=\"hidden\" name=\"pages["+ city +"]["+ index +"][block_type]\" required=\"\" value=\"block_format\" \/>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Подзаголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][subtitle]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Фоновое изображение (1920 X 1080):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_bg\" data-default-file=\"\" accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\""
  + "                                data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12\">"
  + "                        <div class=\"form-group\"><label>Текст в левом блоке:<\/label><textarea class=\"mymce form-control\" name=\"pages["+ city +"]["+ index +"][text_left]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12\">"
  + "                        <div class=\"form-group\"><label>Текст в правом блоке:<\/label><textarea class=\"mymce form-control\" name=\"pages["+ city +"]["+ index +"][text_right]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Текст про стоимость:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][price]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Текст про предоплату:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][prepayment]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Текст про скидку:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][discount]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "            <\/div>"
  + "        <\/div>"
  + "    <\/div>";
}

function returnBlockProgram(index, city) {
  return ""
  + "    <div class=\"panel panel-default\" data-item=\""+ index +"\">"
  + "        <div class=\"panel-heading\">Блок \"Программа\""
  + "            <div class=\"panel-action\"><a href=\"#\" data-perform=\"panel-collapse\"><i class=\"ti-minus\"><\/i><\/a><a href=\"#\" class=\"panel-dismiss\" data-perform=\"panel-dismiss\"><i class=\"ti-close\"><\/i><\/a><\/div>"
  + "        <\/div>"
  + "        <div class=\"panel-wrapper collapse in\" aria-expanded=\"true\">"
  + "            <div class=\"panel-body\"><input class=\"form-control\" type=\"hidden\" name=\"pages["+ city +"]["+ index +"][block_type]\" required=\"\" value=\"block_program\" \/>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Подзаголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][subtitle]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Дата старта:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][date]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Фоновое изображение (1920 X 1080):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_bg\" data-default-file=\"\" accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\""
  + "                                data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <h3>Этапы (минимум - 2, максимум - 9):<\/h3><br\/>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 1 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 1 - Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 2 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 2 - Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 3 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 3 - Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 4 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_4_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 4 - Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_4_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 5 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_5_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 5 - Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_5_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 6 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_6_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 6 - Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_6_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 7 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_7_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 7 - Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_7_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 8 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_8_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 8 - Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_8_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 9 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_9_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 9 - Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_9_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 10 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_10_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 10 - Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_10_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 11 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_11_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 11 - Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_11_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 12 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_12_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Этап 12 - Описание:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_12_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "            <\/div>"
  + "        <\/div>"
  + "    <\/div>";
}

function returnBlockProgram_2(index, city) {
  return ""
  + "    <div class=\"panel panel-default\" data-item=\""+ index +"\">"
  + "        <div class=\"panel-heading\">Блок \"Программа\" - 2"
  + "            <div class=\"panel-action\"><a href=\"#\" data-perform=\"panel-collapse\"><i class=\"ti-minus\"><\/i><\/a><a href=\"#\" class=\"panel-dismiss\" data-perform=\"panel-dismiss\"><i class=\"ti-close\"><\/i><\/a><\/div>"
  + "        <\/div>"
  + "        <div class=\"panel-wrapper collapse in\" aria-expanded=\"true\">"
  + "            <div class=\"panel-body\"><input class=\"form-control\" type=\"hidden\" name=\"pages["+ city +"]["+ index +"][block_type]\" required=\"\" value=\"block_program_2\" \/>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Подзаголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][subtitle]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Фоновое изображение (1920 X 1080):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_bg\" data-default-file=\"\" accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\""
  + "                                data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 1 - Заголовок(день):<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Пункт 1 - Изображение в круге (300 X 300):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_1_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_1_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_1_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 1 - Название:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_name]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 1 - Текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 2 - Заголовок(день):<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Пункт 2 - Изображение в круге (300 X 300):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_2_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_2_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_2_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 2 - Название:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_name]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 2 - Текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 3 - Заголовок(день):<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Пункт 3 - Изображение в круге (300 X 300):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_3_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_3_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_3_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 3 - Название:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_name]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Пункт 3 - Текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "            <\/div>"
  + "        <\/div>"
  + "    <\/div>";
}

function returnBlockStudy(index, city) {
  return ""
  + "    <div class=\"panel panel-default\" data-item=\""+ index +"\">"
  + "        <div class=\"panel-heading\">Блок \"Для обучения мы предоставим\""
  + "            <div class=\"panel-action\"><a href=\"#\" data-perform=\"panel-collapse\"><i class=\"ti-minus\"><\/i><\/a><a href=\"#\" class=\"panel-dismiss\" data-perform=\"panel-dismiss\"><i class=\"ti-close\"><\/i><\/a><\/div>"
  + "        <\/div>"
  + "        <div class=\"panel-wrapper collapse in\" aria-expanded=\"true\">"
  + "            <div class=\"panel-body\"><input class=\"form-control\" type=\"hidden\" name=\"pages["+ city +"]["+ index +"][block_type]\" required=\"\" value=\"block_study\" \/>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Фоновое изображение (1920 X 1080):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_bg\" data-default-file=\"\" accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\""
  + "                                data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Блок 1 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Блок 1 -  Изображение (230 X 260):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_1_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_1_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_1_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Блок 2 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Блок 2 -  Изображение (200 X 255):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_2_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_2_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_2_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Блок 3 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Блок 3 -  Изображение (212 X 212):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_3_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_3_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_3_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Блок 4 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_4_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Блок 4 -  Изображение (215 X 200):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_4_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_4_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_4_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Блок 5 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_5_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Блок 5 -  Изображение (180 X 210):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_5_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_5_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_5_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Блок 6 - Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_6_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Блок 6 -  Изображение (230 X 155):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_6_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_6_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_6_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "            <\/div>"
  + "        <\/div>"
  + "    <\/div>";
}

function returnBlockPhilosophy(index, city) {
  return ""
  + "    <div class=\"panel panel-default\" data-item=\""+ index +"\">"
  + "        <div class=\"panel-heading\">Блок \"Самые яркие инновации\""
  + "            <div class=\"panel-action\"><a href=\"#\" data-perform=\"panel-collapse\"><i class=\"ti-minus\"><\/i><\/a><a href=\"#\" class=\"panel-dismiss\" data-perform=\"panel-dismiss\"><i class=\"ti-close\"><\/i><\/a><\/div>"
  + "        <\/div>"
  + "        <div class=\"panel-wrapper collapse in\" aria-expanded=\"true\">"
  + "            <div class=\"panel-body\"><input class=\"form-control\" type=\"hidden\" name=\"pages["+ city +"]["+ index +"][block_type]\" required=\"\" value=\"block_philosophy\" \/>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Фоновое изображение (1920 X 1080):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_bg\" data-default-file=\"\" accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\""
  + "                                data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Подзаголовок 1:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][subtitle_1]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Подзаголовок 2:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][subtitle_2]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Заголовок блока с кнопками:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title_btn_1]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Кнопка 1 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][btn_1_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Кнопка 1 - ссылка:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][btn_1_link]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Кнопка 2 - текст:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][btn_2_text]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Кнопка 2 - ссылка:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][btn_2_link]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "            <\/div>"
  + "        <\/div>"
  + "    <\/div>";
}

function returnBlockTeachers(index, city) {
  return ""
  + "    <div class=\"panel panel-default\" data-item=\""+ index +"\">"
  + "        <div class=\"panel-heading\">Блок \"Преподаватели\""
  + "            <div class=\"panel-action\"><a href=\"#\" data-perform=\"panel-collapse\"><i class=\"ti-minus\"><\/i><\/a><a href=\"#\" class=\"panel-dismiss\" data-perform=\"panel-dismiss\"><i class=\"ti-close\"><\/i><\/a><\/div>"
  + "        <\/div>"
  + "        <div class=\"panel-wrapper collapse in\" aria-expanded=\"true\">"
  + "            <div class=\"panel-body\"><input class=\"form-control\" type=\"hidden\" name=\"pages["+ city +"]["+ index +"][block_type]\" required=\"\" value=\"block_teachers\" \/>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Фоновое изображение (1920 X 1080):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_bg\" data-default-file=\"\" accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\""
  + "                                data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 1 - Имя:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Преподаватель 1 - Фото (260 X 180):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_1_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_1_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_1_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 1 - Фейсбук:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_fb]\" \/><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 1 - Инстаграм:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_1_in]\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 2 - Имя:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Преподаватель 2 - Фото (260 X 180):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_2_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_2_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_2_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 2 - Фейсбук:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_fb]\" \/><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 2 - Инстаграм:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_2_in]\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 3 - Имя:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Преподаватель 3 - Фото (260 X 180):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_3_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_3_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_3_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 3 - Фейсбук:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_fb]\" \/><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 3 - Инстаграм:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_3_in]\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 4 - Имя:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_4_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Преподаватель 4 - Фото (260 X 180):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_4_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_4_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_4_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 4 - Фейсбук:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_4_fb]\" \/><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 4 - Инстаграм:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_4_in]\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 5 - Имя:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_5_title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Преподаватель 5 - Фото (260 X 180):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_5_image_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_item_5_image\" data-default-file=\"\""
  + "                                accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\" data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_item_5_image_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 5 - Фейсбук:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_5_fb]\" \/><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Преподаватель 5 - Инстаграм:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][item_5_in]\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "            <\/div>"
  + "        <\/div>"
  + "    <\/div>";
}

function returnBlockAction(index, city) {
  return ""
  + "    <div class=\"panel panel-default\" data-item=\""+ index +"\">"
  + "        <div class=\"panel-heading\">Блок \"Технологии\""
  + "            <div class=\"panel-action\"><a href=\"#\" data-perform=\"panel-collapse\"><i class=\"ti-minus\"><\/i><\/a><a href=\"#\" class=\"panel-dismiss\" data-perform=\"panel-dismiss\"><i class=\"ti-close\"><\/i><\/a><\/div>"
  + "        <\/div>"
  + "        <div class=\"panel-wrapper collapse in\" aria-expanded=\"true\">"
  + "            <div class=\"panel-body\"><input class=\"form-control\" type=\"hidden\" name=\"pages["+ city +"]["+ index +"][block_type]\" required=\"\" value=\"block_action\" \/>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Заголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][title]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label>Подзаголовок:<\/label><textarea class=\"form-control\" name=\"pages["+ city +"]["+ index +"][subtitle]\"><\/textarea><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-6\">"
  + "                        <div class=\"form-group\"><label class=\"control-label\">Фоновое изображение (1920 X 1080):<\/label><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_path\" \/><input class=\"dropify\" type=\"file\" name=\"pages_"+ city +"_"+ index +"_bg\" data-default-file=\"\" accept=\"image\/jpg,image\/jpeg,image\/png,image\/bmp\""
  + "                                data-max-file-size=\"2M\" \/><input type=\"hidden\" name=\"pages_"+ city +"_"+ index +"_bg_deleted\" value=\"false\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "                <div class=\"row\">"
  + "                    <div class=\"col-xs-12 col-sm-4\">"
  + "                        <div class=\"form-group\"><label>Блок призыва - слово 1:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][block_word_1]\" \/><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-4\">"
  + "                        <div class=\"form-group\"><label>Блок призыва - слово 2:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][block_word_2]\" \/><\/div>"
  + "                    <\/div>"
  + "                    <div class=\"col-xs-12 col-sm-4\">"
  + "                        <div class=\"form-group\"><label>Блок призыва - слово 3:<\/label><input class=\"form-control\" name=\"pages["+ city +"]["+ index +"][block_word_3]\" \/><\/div>"
  + "                    <\/div>"
  + "                <\/div>"
  + "            <\/div>"
  + "        <\/div>"
  + "    <\/div>";
}