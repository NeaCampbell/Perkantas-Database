function LoadSelectOptions(basicurl, selectid, data, rowperpage, placeholder)
{
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    if(data)
    {
        let option = new Option(data.text, data.id, true, true);
        $(selectid).append(option).trigger('change');
    }

    $(selectid).select2({
        placeholder: placeholder,
        ajax:
        {
            url: basicurl,
            type: 'GET',
            data: function (params)
            {
                if(params.term !== '')
                    return {
                        rowperpage: rowperpage,
                        pagenum: params.page || 1,
                        searchkey: params.term
                    }

                return {
                    rowperpage: rowperpage,
                    pagenum: params.page || 1
                }
            },
            processResults: function (req_result, params)
            {
                params.page = params.page || 1;
                let req_formatted_result = [];

                req_result.data.forEach(function(item) {
                    req_formatted_result.push({
                        id: item.id,
                        text: item.code + ' - ' + item.name
                    })
                })

                let result = {
                    results: req_formatted_result,
                    pagination: {
                        more: (params.page * rowperpage) < req_result.count
                    }
                };

                return result;
            },
            dataType: 'json',
        }
    });
}

function GetMovableListItems(source_obj, dest_obj, rowperpage, pagenum, issearch)
{
    $("#" + source_obj.listprefix + "-loading").toggle("show");
    let url = source_obj.basicurl + "?rowperpage=" + rowperpage + "&pagenum=" + pagenum;

    if(source_obj.textsearchid && issearch) {
        let searchkey = $(source_obj.textsearchid).val();

        if(searchkey)
            url += "&searchkey=" + searchkey;
    }

    if(!source_obj.issource && source_obj.idparamname && source_obj.id) {
        url += "&" + source_obj.idparamname + "=" + source_obj.id;
    }

    console.log(url);

    if(pagenum === 1)
        $(source_obj.listid).empty();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: url
    })
    .done(function(res) {
        let data = res.data;
        let totaldatacount = res.datacount;
        $(source_obj.counterid).val(totaldatacount);

        data.forEach(function(item, index) {
            $("#li-get-more-items-" + source_obj.listprefix).remove();
            $(source_obj.listid).append(CreateMovableItem(item, source_obj));
            $("#a-" + source_obj.listprefix + "-move-" + item.id).on("click", function(){
                MoveItems(source_obj, dest_obj, rowperpage, pagenum);
            });
        })

        CheckLoadMore(source_obj, dest_obj, rowperpage, pagenum);
        $("#" + source_obj.listprefix + "-loading").toggle("show");
    });
}

function CheckLoadMore(source_obj, dest_obj, rowperpage, pagenum) {
    let listshowmore = $("#li-get-more-items-" + source_obj.listprefix);

    if(listshowmore !== undefined && listshowmore !== null)
        listshowmore.remove();

    let totaldatacount = parseInt($(source_obj.counterid).val());
    let maxdatacount = parseInt($("#rowperpage_listbox").val()) * pagenum;

    if(maxdatacount < totaldatacount) {
        $(source_obj.listid).append(CreateLoadMoreButton(source_obj));
        $("#a-get-more-items-" + source_obj.listprefix).on("click", function(){
            GetMovableListItems(source_obj, dest_obj, rowperpage, pagenum + 1);
        });
    }
}

function CreateMovableItem(item, source_obj) {
    let itemparent = "<li class='list-group-item-custom list-group-item d-flex flex-row justify-content-center' id='li-" + source_obj.listprefix + "-" + item.id +"'>" +
        "{1}" +
        "{2}" +
        "{3}" +
        "</li>";
    let itemselectlink = "<a class='w-100 h-100 pe-auto' id='a-" + source_obj.listprefix + "-" + item.id + "' href='javascript:void(0);' " + "onclick=\"SelectMovableItem('" + source_obj.listprefix + "', " + item.id + ", " + source_obj.issource + ")\" tabindex='-1'>" + item.name + "</a>";
    let itemmovelink = "<a class='list-move-button align-self-center flex-row justify-content-center align-items-center pe-auto' id='a-" + source_obj.listprefix + "-move-" + item.id + "' href='javascript:void(0);'>" +
        "<i class='bi bi-arrow-{4}-short' id='i-" + source_obj.listprefix + "-move-" + item.id + "'></i>" +
        "</a>";
    let itemhiddenval = "<input type='hidden' id='" + source_obj.listprefix + "-id-" + item.id + "' name='" + source_obj.listprefix + "id[]' value='" + item.id + "'/>";
    let result = itemparent.replace("{1}", itemselectlink).replace("{2}", itemmovelink.replace("{4}", "right"));

    if(!source_obj.issource)
        result = itemparent.replace("{1}", itemmovelink.replace("{4}", "left")).replace("{2}", itemselectlink);

    result = result.replace("{3}", itemhiddenval);
    return result;
}

function CreateLoadMoreButton(source_obj) {
    let result =
        "<li class='list-group-item-custom list-group-item d-flex flex-row justify-content-center bg-info' id='li-get-more-items-" + source_obj.listprefix + "'>" +
        "<a class='w-100 h-100 pe-auto text-center text-white' id='a-get-more-items-" + source_obj.listprefix + "' href='javascript:void(0);' tabindex='-1'>" +
        "<i>Load more...</i>" +
        "</a>" +
        "</li>";

    return result;
}

function SelectMovableItem(listprefix, id, issource) {
    $("#a-" + listprefix + "-" + id).toggleClass("text-white");
    $("#a-" + listprefix + "-move-" + id).toggleClass("d-flex");
    $("#li-" + listprefix + "-" + id).toggleClass("active");

    if(!issource) {
        $("#li-" + listprefix + "-" + id).toggleClass("bg-danger");
        $("#a-" + listprefix + "-move-" + id).toggleClass("text-danger");
        $("#a-" + listprefix + "-" + id).toggleClass("ml-2");
    }
}

function MoveItems(source_obj, dest_obj, rowperpage) {
    let jsonparam = {
        data: []
    };

    $(source_obj.listid + " .active").each(function(index, value) {
        let parentid = $(value).attr("id");
        const splittedparentid = parentid.split("-");
        let inputid = source_obj.listprefix + "-id-" + splittedparentid[splittedparentid.length - 1];
        let itemid = parseInt($("#" + inputid).val());
        jsonparam.data[index] = {
            itemid: itemid
        }
    })

    let url = source_obj.updateurl + "?" + source_obj.idparamname + "=" + source_obj.id + "&isremoving=" + !source_obj.issource;

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        data: jsonparam
    })
    .done(function() {
        let issearchsrc = JSON.parse($(source_obj.textsearchid + "-mode").val());
        let issearchdest = JSON.parse($(dest_obj.textsearchid + "-mode").val());
        GetMovableListItems(source_obj, dest_obj, rowperpage, 1, issearchsrc);
        GetMovableListItems(dest_obj, source_obj, rowperpage, 1, issearchdest);
    });
}

function SelectAllItems() {

}
