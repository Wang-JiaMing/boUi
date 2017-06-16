/**author:wangjiaming**/
(function($){
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
 	$.fn.boDataGrid=function(options){
 		var defaultParams = {width:'100%',height:'100%',scene:'primary'};
 		options = $.extend({}, defaultParams, options);
        if ($.fn.boDataGrid.methods[options]) {
            return $.fn.boDataGrid.methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }else if ( typeof options === 'object' || ! options ) {
            return $.fn.boDataGrid.methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }
	};

  	$.fn.boDataGrid.methods = {
        init:function (options) {
           $(_this).append('<div id="loading" class="loading">Loading pages...</div>  ');
           var _this=this
           $(_this).attr('style','width:100%;height:100%;overflow:auto');
           $(_this).attr('class','panel panel-primary');
           if(options.title){$(_this).append('<div class="panel-heading">'+options.title+'</div>');}
           if(options.toolbar!=undefined&&options.toolbar.length>0){
          		var $toolbar=$('<div class="panel-body"></div>');
                var $toolbarButton=$('<div class="btn-group" role="group" aria-label=""></div>');
                $(options.toolbar).each(function (i, o) {
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
				if(options.isExpExl){
                   $exp=$('<button type="button" class="btn btn-success"><span class="glyphicon glyphicon-save" aria-hidden="true"></span>导出</button>');
				   $toolbarButton.append($exp);
				   $(_this).append('<div id="expModal" class="modal fade bs-example-modal-sm" '+
				   				   'tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
								   '<div class="modal-dialog modal-sm" role="document">'+
								   '<div class="modal-content">'+
								   '<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>正在下载文件，请稍等'+
								   '</div></div></div>');
				   $exp.click(function(){
				   	   $('#expModal').modal({backdrop: 'static', keyboard: false}); 
                       $('#expModal').modal('show');
                       if($("#" + options.formId).attr('method')||$("#" + options.formId).attr('method')==''||$("#" + options.formId).attr('method').toUpperCase()=='GET'){
								$("#" + options.formId).attr('method','post');
                       }
                       $("#" + options.formId).attr("action",options.expActionUrl).submit();
                       $('#expModal').modal('hide');
				   });
				}
				$toolbar.append($toolbarButton);
				$(_this).append($toolbar);
           }
          var params='';
          if(options.formId&&options.formId!=''){
 			params=$.param(options.queryParams)+'&'+$('#'+options.formId).serialize()
          }else{
          	params=$.param(options.queryParams)
          }
          var $table=$('<table id="dgTable_" class="table table-bordered table-hover"><tbody></tbody></table>'),$tableTitle;
          if(options.tableTitle&&options.tableTitle!=''){
			$tableTitle=$(options.tableTitle);
          }else{
            $tr=$('<tr id="titleTr_" class="success"></tr>');
          	for(var i=0;i<options.columns[0].length;i++){
          		var thWidth='100px';
          		if(options.columns[0][i].width&&options.columns[0][i].width!=''){
					thWidth=options.columns[0][i].width;
          		}
               	var $th=$('<th width="'+thWidth+'" title="'+options.columns[0][i].title+'"><div style="width:'+thWidth+';overflow:hidden">'+options.columns[0][i].title+'</div></th>') 
          	    $tr.append($th);

          	}
          }
          $tableTitle=$tr;
          $table.append($tableTitle);
          $.post(options.url,params,
	        	function(data){
	                for(var i=0;i<data.rows.length;i++){
	                  	$tr=$('<tr></tr>');
	                  	var thWidth='100px';
	                  	for(var j=0;j<options.columns[0].length;j++){
	                  		if(options.columns[0][j].width&&options.columns[0][j].width!=''){
								thWidth=options.columns[0][j].width;
			          		}
			          		if(options.columns[0][j].formatter&&typeof options.columns[0][j].formatter == "function"){
			          			var _val=options.columns[0][j].formatter(data.rows[i][options.columns[0][j].field],data.rows[i])
			          			$tr.append('<td><div style="width:'+thWidth+';overflow:hidden">'+_val+'</div></td>');
			          		}else{
	                            $tr.append('<td title="'+data.rows[i][options.columns[0][j].field]+'"><div style="width:'+thWidth+';overflow:hidden">'+data.rows[i][options.columns[0][j].field]+'</div></td>');
	                  	    }
	                  	}
		                $table.append($tr);
	                }

	       }, "json");
		$(_this).append($table);
        }
    }

})(jQuery);