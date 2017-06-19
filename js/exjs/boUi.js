/**author:wangjiaming**/
(function($){
    /**
      _options={
          
          size:,//'lg','sm','xs'
      }
    **/
    // var defaultDataGridParams='';

    $.fn.boButton=function(options){
      var defaultParams={scene:'default',type:'button',text:'ok',size:''}
      options = $.extend({}, defaultParams, options);
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

    /**
    bootstrap datagrid
    options={
    	 url:,
    	 queryParams:
    	 formId:,
    	 tableTitle:,//自定义tableTitled的在此处填写html片段
	     width:,//宽
	     height:,//高
	     scene:,//情景样式 primary（默认）、success、info、warning、danger
	     title:,//标题
	     toolbar:[
	     	{text:,
	         type:,//list
             btnScene:,//按钮情景样式 default、primary、success、info、warning、danger、link
	     	 handler:function(){
	
	     	 }
	     	}
	     ]
    }
    **/
    var defaultDataGridParams='';
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
        	if(defaultDataGridParams==''){
	        	defaultDataGridParams = {width:'100%',height:'100%',scene:'primary',pagesList:[10,30,50,100],rows:10,page:1,total:''};
	            defaultDataGridParams = $.extend({}, defaultDataGridParams, options);
	        }
	        return defaultDataGridParams;
        	
        },
        init:function (options) {
          	var _this = this ;
        	var _options=_this.boDataGrid('getParams',options);
           	$(_this).attr('style','width:100%;height:100%;overflow:auto');
           	$(_this).attr('class','panel panel-primary');
           	if(_options.title){$(_this).append('<div class="panel-heading">'+_options.title+'</div>');}
           	if(_options.toolbar!=undefined&&_options.toolbar.length>0){
          		var $toolbar=$('<div class="panel-body"></div>');
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
          	var $table=$('<table id="dgTable_" class="table table-bordered table-hover"><tbody></tbody></table>'),$tableTitle;
          	if(_options.tableTitle&&_options.tableTitle!=''){
				$tableTitle=$(_options.tableTitle);
          	}else{
            	$tr=$('<tr id="titleTr_" class="success"></tr>');
          		for(var i=0;i<_options.columns[0].length;i++){
          			var thWidth='100px';
          			if(_options.columns[0][i].width&&_options.columns[0][i].width!=''){
						thWidth=_options.columns[0][i].width;
          			}
               		var $th=$('<th width="'+thWidth+'" title="'+_options.columns[0][i].title+'"><div style="width:'+thWidth+';overflow:hidden">'+_options.columns[0][i].title+'</div></th>') 
          	    	$tr.append($th);
          		}
          	}
          	$tableTitle=$tr;
          	$table.append($tableTitle);
    		$dataDiv=$('<tbody id=tableData></tbody>');
          	$table.append($dataDiv);
          	$buttonFooter=$('<div class="panel-footer"></div>');
			$(_this).append($table);
			var pagesListHtml='<div id="fyList" class="btn-group dropup" role="group">'+
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
					 	'<button type="button" class="btn btn-default" id="theTopPage"><span class="glyphicon glyphicon-step-backward" aria-hidden="true"></button>'+
					 	'<button type="button" class="btn btn-default" id="topPage"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></button>'+
					 	'<button type="button" class="btn btn-default" id="nowPage">1</button>'+
					 	'<button type="button" class="btn btn-default" id="lastPage"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></button>'+
					 	'<button type="button" class="btn btn-default" id="theLastPage"><span class="glyphicon glyphicon-step-forward" aria-hidden="true"></button>'+
					 	pagesListHtml+
					 	'</div>');
            $buttonFooter.append($fyButtons);
            $(_this).append($buttonFooter);
          	_this.boDataGrid('queryData');

          	$('li').on('click',function(){
          		defaultDataGridParams.rows = $(this)[0].textContent;
               	$('#_nowPageBtn').html($(this)[0].textContent+'<span class="caret"></span>');
          	});

          	$('#theTopPage,#topPage,#lastPage,#theLastPage').on('click',function(){
	             if($(this).attr('id')=='theTopPage'){
	             	defaultDataGridParams.page='1';
	             }else if($(this).attr('id')=='topPage'){
	                if(defaultDataGridParams.page!='1'){
	                	defaultDataGridParams.page=defaultDataGridParams.page-1;
	                }
	             }else if($(this).attr('id')=='lastPage'){
	             	var matchPage= Math.ceil(defaultDataGridParams.total/defaultDataGridParams.rows);
	             	if(defaultDataGridParams.page<matchPage){
	             		defaultDataGridParams.page=eval(defaultDataGridParams.page+1);
	             	}
	             }else if($(this).attr('id')=='theLastPage'){
	             	var matchPage= Math.ceil(defaultDataGridParams.total/defaultDataGridParams.rows);
	             	defaultDataGridParams.page=matchPage;
	             }
	             $('#nowPage').html(defaultDataGridParams.page);
          		_this.boDataGrid('queryData');
          	});
    	},
        queryData:function(){
        	var _this = this;
        	var _options =_this.boDataGrid('getParams');
        	var $tableData = $('#tableData');
        	$('#tableData tr').remove();
          	var params='rows='+_options.rows+'&page='+_options.pages;
          	if(_options.formId&&_options.formId!=''&&$('#'+_options.formId).serialize().length>'0'){
          		params=params+'&'+$('#'+_options.formId).serialize();
 				// params=$.param(_options.queryParams)+'&'+$('#'+_options.formId).serialize();
          	}
          	if(_options.queryParams){
          		 params=params+'&'+$.param(_options.queryParams);
          	}
        	$.post(_options.url,params,
	        	function(data){
	        		defaultDataGridParams.total = data.total;
	                for(var i=0;i<data.rows.length;i++){
	                  	$tr=$('<tr></tr>');
	                  	var thWidth='100px';
	                  	for(var j=0;j<_options.columns[0].length;j++){
	                  		if(_options.columns[0][j].width&&_options.columns[0][j].width!=''){
								thWidth=_options.columns[0][j].width;
			          		}
			          		if(_options.columns[0][j].formatter&&typeof _options.columns[0][j].formatter == "function"){
			          			var _val=_options.columns[0][j].formatter(data.rows[i][_options.columns[0][j].field],data.rows[i])
			          			$tr.append('<td><div style="width:'+thWidth+';overflow:hidden">'+_val+'</div></td>');
			          		}else{
	                            $tr.append('<td title="'+data.rows[i][_options.columns[0][j].field]+'"><div style="width:'+thWidth+';overflow:hidden">'+data.rows[i][_options.columns[0][j].field]+'</div></td>');
	                  	    }
	                  	}
		                $dataDiv.append($tr);
	                }
	                $tableData.append($dataDiv);
	       }, "json");
        }

    }

})(jQuery);