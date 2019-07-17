var table_all_global = null;

var $ = jQuery.noConflict();

$(document).ready(function() {

    var table = $('#table_admins').DataTable({
        ajax           : {
            url    : "/admin/admins/list",
            columns: [
                {data: 'admin_id'},
                {data: 'name'},
                {data: 'email'},
                {data: 'status'}
            ]
        },
        columnDefs: [
            {
                targets   : 0,
                searchable: false,
                orderable : false,
                className : 'dt-body-center',
                render    : function(data, type, full, meta) {
                    return '<input type="checkbox" name="elem_id" value="'
                        + $('<div/>').text(data).html() + '">';
                }
            },
            {
                targets   : 2,
                searchable: true,
                orderable : true,
                className : 'dt-body-center',
                render    : function(data, type, full, meta) {
                    return '<a href="/admin/admins/' + full[0] + '">' + data + '</a>'
                }
            }
        ],
        order          : [1, 'asc'],
        select         : true,
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            nRow.setAttribute('id', aData[0]);

            nRow.lastChild.innerHTML = '';

            var aTag = document.createElement('a');
            aTag.setAttribute('title', 'Remove');
            aTag.setAttribute('style', 'cursor:pointer');
            aTag.onclick = function() {
                deleteItem(aData[0]);
            };

            var iTag = document.createElement('i');
            iTag.setAttribute('class', 'fa fa-trash-o');
            aTag.appendChild(iTag);

            nRow.lastChild.appendChild(aTag);
        },
        aLengthMenu    : [
            [10, 25, 50, 100, 200, -1],
            [10, 25, 50, 100, 200, "All"]
        ],
        iDisplayLength : 50
    });

    $('#table_admins tbody').on('click', 'tr', function() {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    table_all_global = table;

    $('.example-select-all').on('click', function() {
        // Check/uncheck all checkboxes in the table
        var rows = table.rows({'search': 'applied'}).nodes();
        $('input[type="checkbox"]', rows).prop('checked', this.checked);
        $('.example-select-all').prop('checked', this.checked);
    });

    $(".accept").click(function() {
        var rows = table.rows({'search': 'applied'}).nodes();
        var elements = $("input[name='elem_id']:checked", rows);

        var data = {
            action  : $("select[name='selected_action']").val().replace(/^\s+|\s+$/g, ""),
            contacts: []
        };

        if (elements.length > 0) {
            elements.each(function() {
                data.contacts.push(this.value);
            });

            if (!window.location.origin) {
                window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            }

            $.get(window.location.origin + "/admin/admins/action", data, function(resp) {
                if (resp.result) {
                    table_all_global.ajax.reload();
                    $('.example-select-all').prop('checked', false);
                }
            });
        }
    });
});

function deleteItem(selectedId) {
    Dialog("Delete admin?", function() {
        deleteItemBack(selectedId)
    }, function() {
        return false
    });
}

function deleteItemBack(selectedId) {
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }

    $.get(window.location.origin + "/admin/admins/" + selectedId + "/delete", function(resp) {
        if (resp.result){
            table_all_global.ajax.reload();
        } else {
            if (resp.error){
                alert('Error deleting admin');
            }
        }
    });
}