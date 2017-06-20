/**author:wangjiaming**/
(function($){
    /**
     _options={

          size:,//'lg','sm','xs'
      }
     **/

    $.fn.boButton=function(options){
        if ($.fn.boButton.methods[options]) {
            return $.fn.boButton.methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }else if ( typeof options === 'object' || ! options ) {
            return $.fn.boButton.methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }
    };

    $.fn.boButton.methods = {
        init:function (options) {
            var _this = this ;
            /*button*/
            $(_this).addClass('btn btn-'+options.scene);
            if(options.size&&options.size!=''){
                var sizeClass;
                if(options.size=='lg'){
                    sizeClass='btn-lg';
                }else if(options.size=='sm'){
                    sizeClass='btn-sm';
                }else{
                    sizeClass='btn-xs';
                }
                $(_this).addClass(sizeClass);
            }
            if($(_this)[0].outerHTML.toLowerCase().indexOf('<button')>-1){
                $(_this).append(options.text).attr('type',options.type);
                /*<a>*/
            }else if($(_this)[0].outerHTML.toLowerCase().indexOf('<a')>-1){
                $(_this).append(options.text);
                /*<input>*/
            }else if($(_this)[0].outerHTML.toLowerCase().indexOf('<input')>-1){
                $(_this).attr('value',options.text).attr('type',options.type);
            }else{
                console.error("please use <button>,<a> or <input>!");
            }
        },
        disabled:function(){
            alert(111)
            var _this = this ;
            if($(_this)[0].outerHTML.toLowerCase().indexOf('<button')>-1){
                $(_this).attr('disabled','disabled');
                /*<a>*/
            }else if($(_this)[0].outerHTML.toLowerCase().indexOf('<a')>-1){
                $(_this).addClass('disabled');
                /*<input>*/
            }else if($(_this)[0].outerHTML.toLowerCase().indexOf('<input')>-1){
                $$(_this).attr('disabled','disabled');
            }
        },
        enable:function(){
            var _this = this ;
            if($(_this)[0].outerHTML.toLowerCase().indexOf('<button')>-1){
                $(_this).removeAttr('disabled','disabled');
                /*<a>*/
            }else if($(_this)[0].outerHTML.toLowerCase().indexOf('<a')>-1){
                $(_this).removeClass('disabled');
                /*<input>*/
            }else if($(_this)[0].outerHTML.toLowerCase().indexOf('<input')>-1){
                $$(_this).removeAttr('disabled','disabled');
            }
        }
    }

    var defaultDataGridParams={},tmpBoDataGridData={};
    $.fn.boDataGrid=function(options){
        if ($.fn.boDataGrid.methods[options]) {
            return $.fn.boDataGrid.methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }else if ( typeof options === 'object' || ! options ) {
            return $.fn.boDataGrid.methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }
    };

    $.fn.boDataGrid.methods = {
        getParams:function(options){
            if(defaultDataGridParams[this[0].id]==undefined){
                defaultDataGridParams[this[0].id] = $.extend({},{namespace:this[0].id,width:'100%',height:'100%',scene:'primary',pagesList:[10,30,50,100],rows:10,page:1,total:''}, options);
            }
            return defaultDataGridParams[this[0].id];
        },
        init:function (options) {
            var _this = this ;
            var _options=_this.boDataGrid('getParams',options);
            $(_this).attr('style','width:100%;height:100%');
            $(_this).attr('class','panel panel-primary');
            $(_this).append('<div id="boDataGridLoading-'+_options.namespace+'" class="modal fade bs-example-modal-sm" tabindex="-1"'+
                'role="dialog" aria-labelledby="mySmallModalLabel">'+
                '<div class="modal-dialog modal-sm" role="document"><div class="modal-content">'+
                '<div style="text-align: center"><img src="../ui/img/boLoading.gif" style="width:30px">正在加载，请稍等...<div></div></div></div>');
            $('#boDataGridLoading-'+_options.namespace).modal({backdrop: 'static', keyboard: false});
            if(_options.title){$(_this).append('<div class="panel-heading">'+_options.title+'</div>');}
            if(_options.toolbar!=undefined&&_options.toolbar.length>0){
                var $toolbar=$('<div class="panel-body" style="padding:3px"></div>');
                var $toolbarButton=$('<div class="btn-group" role="group" aria-label=""></div>');
                $(_options.toolbar).each(function (i, o) {
                    var _btnScene='default';
                    if(o.btnScene){_btnScene=o.btnScene;}
                    if(o.type){
                        if(o.type=='list'){
                            $btnlist=$('<div class="btn-group" role="group"></div>');
                            $topBtnList=$('<button type="button" class="btn btn-'+_btnScene+' dropdown-toggle" '+
                                'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                o.text+'&nbsp;&nbsp;<span class="caret"></span></button>');
                            $ul=$('<ul class="dropdown-menu"></ul>');
                            $(o.btns).each(function (i, o) {
                                $li=$('<li><a href="#">'+o.text+'</li>');
                                $ul.append($li);
                                $li.click(function(){o.handler()});
                            });
                            $btnlist.append($topBtnList);
                            $btnlist.append($ul);
                            $toolbarButton.append($btnlist);
                        }
                    }else{
                        $btn=$('<button type="button" class="btn btn-'+_btnScene+'">'+o.text+'</button>');
                        $toolbarButton.append($btn);
                        if (o.handler) {
                            $btn.click(function(){o.handler()});
                        }
                    }
                });
                $toolbar.append($toolbarButton);
                $(_this).append($toolbar);
            }

            var $table=$('<table id="dgTable-'+_options.namespace+'" class="table table-bordered table-hover"><tbody></tbody></table>'),$tableTitle;
            if(_options.tableTitle&&_options.tableTitle!=''){
                $tableTitle=$(_options.tableTitle);
                $tableTitle.addClass("success");
            }else{
                $tr=$('<tr id="titleTr-'+_options.namespace+'" class="success"></tr>');
                if(_options.checkbox){
                    var $thCheck=$('<th width="10px"></th>');
                    var $checkBox=$('<input id="allCheckBox-'+_options.namespace+'" type="checkbox"/>');
                    $thCheck.append($checkBox);
                    $tr.append($thCheck);
                    $checkBox.change(function() { 
                       $('#allCheckBox-'+_options.namespace)[0].checked
                       $('#tableData-'+_options.namespace+' input[type="checkbox"]').each(function(){
                             console.info(this)
                       });

                    });
                }
                for(var i=0;i<_options.columns[0].length;i++){
                    var thWidth='100px';
                    if(_options.columns[0][i].width&&_options.columns[0][i].width!=''){
                        thWidth=_options.columns[0][i].width;
                    }
                    var $th=$('<th width="'+thWidth+'" title="'+_options.columns[0][i].title+'"><div style="width:'+thWidth+';overflow:hidden">'+_options.columns[0][i].title+'</div></th>')
                    if(_options.columns[0][i].hidden){
                        $th.hide();
                    }
                    $tr.append($th);
                }
                $tableTitle=$tr;
            }
            $table.append($tableTitle);
            $dataDiv=$('<tbody id="tableData-'+_options.namespace+'"></tbody>');
            $table.append($dataDiv);
            var $tableDiv=$('<div style="overflow:auto"></div>');
            $tableDiv.append($table);
            $(_this).append($tableDiv);
            $buttonFooter=$('<div class="panel-footer">'+
                            '<div style="float:right" class="bg-danger" id="pageContent-'+_options.namespace+'"></div>' +
                            '</div>');
            var pagesListHtml='<div id="fyList-'+_options.namespace+'" class="btn-group dropup" role="group">'+
                '<button id="_nowPageBtn" class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" '+
                'aria-haspopup="true" aria-expanded="false">';

            for(var i=0;i<_options.pagesList.length;i++){
                if(i==0){
                    pagesListHtml+=_options.pagesList[i]+'<span class="caret"></span></button><ul class="dropdown-menu">';
                }
                pagesListHtml+='<li><a id="pagesNo-"'+_options.pagesList[i]+'>'+_options.pagesList[i]+'</a></li>';
                if(i==_options.pagesList.length-1){
                    pagesListHtml+='</ul><div>';
                }
            }
            $fyButtons=$('<div class="btn-group-sm" role="group" aria-label="fy">'+
                '<button type="button" class="btn btn-default" id="theTopPage-'+_options.namespace+'"><span class="glyphicon glyphicon-step-backward" aria-hidden="true"></button>'+
                '<button type="button" class="btn btn-default" id="topPage-'+_options.namespace+'"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></button>'+
                '<button type="button" class="btn btn-default" id="nowPage-'+_options.namespace+'">1</button>'+
                '<button type="button" class="btn btn-default" id="lastPage-'+_options.namespace+'"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></button>'+
                '<button type="button" class="btn btn-default" id="theLastPage-'+_options.namespace+'"><span class="glyphicon glyphicon-step-forward" aria-hidden="true"></button>'+
                pagesListHtml+
                '</div>');
            $buttonFooter.append($fyButtons);
            $(_this).append($buttonFooter);
            if(typeof _options.onBeforeLoad== "function"){
                if(_options.onBeforeLoad()!=false){
                    _this.boDataGrid('queryData');
                }
            }else{
                _this.boDataGrid('queryData');
            }
            $('li').on('click',function(){
                defaultDataGridParams.rows = $(this)[0].textContent;
                $('#_nowPageBtn').html($(this)[0].textContent+'<span class="caret"></span>');
            });

            $('#theTopPage-'+_options.namespace+',#topPage-'+_options.namespace+',#lastPage-'+_options.namespace+',#theLastPage-'+_options.namespace+'').on('click',function(){
                if($(this).attr('id')=='theTopPage-'+_options.namespace){
                    defaultDataGridParams.page='1';
                }else if($(this).attr('id')=='topPage-'+_options.namespace){
                    if(defaultDataGridParams.page!='1'){
                        defaultDataGridParams.page=defaultDataGridParams.page-1;
                    }
                }else if($(this).attr('id')=='lastPage-'+_options.namespace){
                    var matchPage= Math.ceil(defaultDataGridParams.total/defaultDataGridParams.rows);
                    if(defaultDataGridParams.page<matchPage){
                        defaultDataGridParams.page=eval(defaultDataGridParams.page+1);
                    }
                }else if($(this).attr('id')=='theLastPage-'+_options.namespace){
                    var matchPage= Math.ceil(defaultDataGridParams.total/defaultDataGridParams.rows);
                    defaultDataGridParams.page=matchPage;
                }
                $('#nowPage-'+_options.namespace).html(defaultDataGridParams.page);
                _this.boDataGrid('queryData');
            });
        },
        queryData:function(){
            var _this = this;
            var _options =_this.boDataGrid('getParams');
            $('#boDataGridLoading-'+_options.namespace).modal('show');
            var $tableData = $('#tableData-'+_options.namespace);
            $('#tableData-'+_options.namespace+' tr').remove();
            var $dataDiv=$('#tableData-'+_options.namespace)
            var params='rows='+_options.rows+'&page='+_options.page;
            if(_options.formId&&_options.formId!=''&&$('#'+_options.formId).serialize().length>'0'){
                params=params+'&'+$('#'+_options.formId).serialize();
            }
            if(_options.queryParams){
                params=params+'&'+$.param(_options.queryParams);
            }
            $.post(_options.url,params,
                function(data){
                    tmpBoDataGridData[_this[0].id]=data;
                    defaultDataGridParams[_this[0].id].total = data.total;
                    $('#pageContent-'+_options.namespace).html('当前显示第'+_options.page+'页/每页显示'+_options.rows+'条数据/共'+defaultDataGridParams[_this[0].id].total+'条数据');
                    for(var i=0;i<data.rows.length;i++){
                        $tr=$('<tr index="index-'+i+'"></tr>');
                        if(_options.checkbox){
                           var $dataCheckBox=$('<td><input id="dataCheckBox-'+_options.namespace+'-'+i+'" type="checkbox"/></td>');
                           $tr.append($dataCheckBox);
                        }
                        var thWidth='100px';
                        for(var j=0;j<_options.columns[0].length;j++){
                            if(_options.columns[0][j].width&&_options.columns[0][j].width!=''){
                                thWidth=_options.columns[0][j].width;
                            }
                            if(_options.columns[0][j].formatter&&typeof _options.columns[0][j].formatter == "function"){
                                var _val=_options.columns[0][j].formatter(data.rows[i][_options.columns[0][j].field],data.rows[i])
                                var $td=$('<td><div style="width:'+thWidth+';overflow:hidden">'+_val+'</div></td>');
                                if(_options.columns[0][j].hidden){
                                    $td.hide();
                                }
                                $tr.append($td);
                            }else{
                                var $td=$('<td title="'+data.rows[i][_options.columns[0][j].field]+'"><div style="width:'+thWidth+';overflow:hidden">'+data.rows[i][_options.columns[0][j].field]+'</div></td>');
                                if(_options.columns[0][j].hidden){
                                    $td.hide();
                                }
                                $tr.append($td);
                            }
                        }
                        $dataDiv.append($tr);
                    }
                    $tableData.append($dataDiv);
                    $('#boDataGridLoading-'+_options.namespace).modal('hide');
                    if(typeof _options.onLoadSuccess== "function"){
                        _options.onLoadSuccess(data);
                    }
                    
                    $('#tableData-'+_options.namespace+' tr').click(function(){
                        var _index=$(this).attr('index').slice(6);
                        var _row=tmpBoDataGridData[_this[0].id].rows[_index];
                        console.info(_row);
                        if(typeof _options.onClickRow == "function"){
                            _options.onClickRow(_index,_row);
                        }
                    });

                    $('#tableData-'+_options.namespace+' tr').dblclick(function(){
                        var _index=$(this).attr('index').slice(6);
                        var _row=tmpBoDataGridData[_this[0].id].rows[_index];
                        console.info(_row);
                        if(typeof _options.onDblClickRow == "function"){
                            _options.onDblClickRow(_index,_row);
                        }
                    });
            }, "json");     
        },
        loading:function(){
          $('#boDataGridLoading-'+_options.namespace).modal('show'); 
        },
        loaded:function(){
          $('#boDataGridLoading-'+_options.namespace).modal('hide');
        },
        getRows:function(){
          return tmpBoDataGridData.data.rows;
        }

    }

})(jQuery);