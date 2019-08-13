var table_all_global = null;

var $ = jQuery.noConflict();

$(document).ready(function () {

  var table = $('#table_salons').DataTable({
    ajax: {
      url: "/admin/salons/list",
      // columns: [
      //   {data: 'salons_id'},
      //   {data: 'name'}
      // ]
    },
    columnDefs: [
      {
        targets: 1,
        searchable: true,
        orderable: true,
        className: 'dt-body-center',
        render: function (data, type, full, meta) {
          return '<a href="/admin/salons/' + full[0] + '">' + data + '</a>'
        }
      }
    ],
    order: [2, 'desc'],
    select: true,
    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
      nRow.setAttribute('id', aData[0]);

      nRow.lastChild.innerHTML = '';

      var aTag = document.createElement('a');
      aTag.setAttribute('title', 'Повысить приоритет');
      aTag.setAttribute('style', 'cursor:pointer; margin-right:5px');
      aTag.onclick = function() {
        priorityAction(aData[0], 'up');
      };

      iTag = document.createElement('i');
      iTag.setAttribute('class', 'fa fa-arrow-up');
      aTag.appendChild(iTag);

      nRow.lastChild.appendChild(aTag);

      aTag = document.createElement('a');
      aTag.setAttribute('title', 'Понизить приоритет');
      aTag.setAttribute('style', 'cursor:pointer; margin-right:5px');
      aTag.onclick = function() {
        priorityAction(aData[0], 'down');
      };

      iTag = document.createElement('i');
      iTag.setAttribute('class', 'fa fa-arrow-down');
      aTag.appendChild(iTag);

      nRow.lastChild.appendChild(aTag);

      var aTag = document.createElement('a');
      aTag.setAttribute('title', 'Удалить');
      aTag.setAttribute('style', 'cursor:pointer');
      aTag.onclick = function () {
        deleteItem(aData[0]);
      };

      var iTag = document.createElement('i');
      iTag.setAttribute('class', 'fa fa-trash-o');
      aTag.appendChild(iTag);

      nRow.lastChild.appendChild(aTag);
    },
    aLengthMenu: [
      [10, 25, 50, 100, 200, -1],
      [10, 25, 50, 100, 200, "All"]
    ],
    iDisplayLength: 50
  });

  table_all_global = table;
});

function priorityAction(id, action) {
  var data = {
    contacts: id,
    action: action
  };

  if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }

  $.get(window.location.origin + "/admin/salons/actions", data, function(resp) {
    if (resp.result) {
      table_all_global.ajax.reload();
    }
  });
}

function deleteItem(selectedId) {
  Dialog("Удалить пост?", function () {
    deleteItemBack(selectedId)
  }, function () {
    return false
  });
}

function deleteItemBack(selectedId) {
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }

  $.get(window.location.origin + "/admin/salons/" + selectedId + "/delete", function (resp) {
    if (resp.result) {
      table_all_global.ajax.reload();
    } else {
      if (resp.error) {
        alert('Ошибка при удалении');
      }
    }
  });
}