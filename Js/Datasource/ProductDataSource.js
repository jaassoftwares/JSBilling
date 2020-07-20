var obj1 = {"col1":"data1","col2":"data2","col3":58};
var dataArr = [obj1,obj1,obj1];
function getItemsData(tabName){
    switch (tabName) {
        case "product":
            return window.getQueryHelper().get_all_productdetail();
        case "category":
            return window.getQueryHelper().get_all_category();
        case "sub_category":
            return window.getQueryHelper().get_all_subcategory();
        case "brand":
            return window.getQueryHelper().get_all_brand();
        case "gst_tax":
            return window.getQueryHelper().get_all_gsttax();
        case "other_tax":
            return window.getQueryHelper().get_all_cesstax();;
        case "uom":
            return window.getQueryHelper().get_all_unit();
        default:
            break;
    }
}

function saveData(tabName,id){
    var data = $("#"+id).serializeFormJSON();
    switch (tabName) {
        case "product":
            return window.getQueryHelper().insert_productdetails(data);
        case "category":
         return window.getQueryHelper().insert_category(data);
        case "sub_category":
            return window.getQueryHelper().insert_subcategory(data);
        case "brand":
            return window.getQueryHelper().insert_brand(data);
        case "gst_tax":
            return window.getQueryHelper().insert_gsttax(data);
        case "other_tax":
            return window.getQueryHelper().insert_cesstax(data);
        case "uom":
            return window.getQueryHelper().insert_unit(data);
        default:
            break;
    }
}

function removeData(tabName){
    switch (tabName) {
        case "product":
            return dataArr;
        case "category":
            return dataArr;
        case "sub_category":
            return dataArr;
        case "brand":
            return dataArr;
        case "gst_tax":
            return dataArr;
        case "other_tax":
            return dataArr;
        default:
            break;
    } 
}

function getSelectBoxValues(tabName,id){
    switch (tabName) {
    case "category":
            return window.getQueryHelper().getDistinctField('rb_category','p_category_name',id,generateOptions);
        case "sub_category":
            return window.getQueryHelper().getDistinctField('rb_sub_category','p_subcategory_name',id,generateOptions);
        case "brand":
            return window.getQueryHelper().getDistinctField('rb_brand','p_brand_name',id,generateOptions);
        case "gst_tax":
            return window.getQueryHelper().getDistinctField('rb_gsttax','gst_tax_desc',id,generateOptions);
        case "other_tax":
            return window.getQueryHelper().getDistinctField('rb_cesstax','other_tax_desc',id,generateOptions);
        case "uom":
            return window.getQueryHelper().getDistinctField('rb_uom','p_unit_code',id,generateOptions);
        }
}

function generateOptions(data,id,fieldKey){
  let optionStr = "<option value=''>Choose one</option>";
  $.each(data,function(key,val){
    optionStr += "<option value="+val[fieldKey]+">"+val[fieldKey]+"</option>";
  });
  $("#"+id).html(optionStr);
}

(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery); 
