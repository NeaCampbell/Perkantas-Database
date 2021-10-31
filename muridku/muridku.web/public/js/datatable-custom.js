function loadDatatable(basicurl, tableid, rowperpage, pagenum, datacolumns, dataorder) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    let url = basicurl + "rowperpage=" + rowperpage + "&pagenum=" + pagenum;
    console.log(url);

    var table = $(tableid).DataTable({
        processing: true,
        serverSide: true,
        ajax: url,
        columns: datacolumns,
        order: dataorder ?? [[0, 'asc']],
        "scrollX": true,
        searching: false,
    });

    let rawtableid = tableid.replace('#', '');
    let searchinputid = '#searchinput';
    let rawsearchinputid = searchinputid.replace('#', '');
    let searchbuttonid = '#searchbutton';
    let rawsearchbuttonid = searchbuttonid.replace('#', '');

    let searchcontainerrow = $(tableid + '_wrapper div').first();
    searchcontainerrow.attr("id", rawtableid + '_wrapper-search-row');
    let searchcontainercol = $(tableid + '_wrapper-search-row div').last();
    searchcontainercol.attr("id", rawtableid + '_wrapper-search-col');
    searchcontainercol.append('<div class="input-group"><input id="' + rawsearchinputid +
        '" name="' + rawsearchinputid + '" type="text" value="" placeholder="Search" aria-label="Search" ' +
        'class="form-control mr-2" /><button type="button" class="btn btn-outline-primary" id="' + rawsearchbuttonid +
        '"><i class="bi bi-search"></i></button></div>');

    $(searchbuttonid).click(function() {
        let searchvalue = $(searchinputid).val();
        reloadDatatable(table, basicurl, rowperpage, searchvalue, true);
    });

    $('select[name="main-table_length"]').on('change',
        function() {
            reloadDatatable(table, basicurl, this.value, $(searchinputid).val());
        }
    );

    $('#main-table').on( 'page.dt',
        function () {
            reloadDatatable(table, basicurl, rowperpage, $(searchinputid).val());
        }
    );

    return table;
}

function reloadDatatable(table, basicurl, rowperpage, searchkey = '', isfromsearch = false) {
    let reloadinfo = table.page.info();
    let reloadpagenum = reloadinfo.page + 1;

    if(isfromsearch)
        reloadpagenum = 1;

    $('#rowperpage').val(rowperpage);
    let reloadurl = basicurl + "rowperpage=" + rowperpage;

    if(searchkey != '')
        reloadurl += "&searchkey=" + searchkey;

    reloadurl += "&pagenum=" + reloadpagenum;
    table.page(reloadpagenum - 1).draw('page');

    table.ajax
        .url(reloadurl)
        .load(
            null,
            false
        );
}
