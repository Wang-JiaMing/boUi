(function($){
    /**
    bootstrap datagrid
    options={
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
           var _this=this
           $(_this).attr('style','width:100%;height:100%;overflow:auto');
           $(_this).attr('class','panel panel-primary');
           $(_this).append('<div class="panel-heading">'+options.title+'</div>');
           var $toolbar=$('<div class="panel-body"></div>');
           if(options.toolbar!=undefined&&options.toolbar.length>0){
                var $toolbarButton=$('<div class="btn-group" role="group" aria-label=""></div>');
                $(options.toolbar).each(function (i, o) {
                	var _btnScene='default';
                	if(o.btnScene){_btnScene=o.btnScene;}
                	if(o.type){
                		if(o.type=='list'){
                			$btnlist=$('<div class="btn-group" role="group"></div>');
                            $topBtnList=$('<button type="button" class="btn btn-'+_btnScene+' dropdown-toggle" '+
                            	          'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                          o.text+'<span class="caret"></span></button>');
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
           $table=$('<table class="table table-bordered table-hover">'+
            '<tr>'+
            '<th ><div style="width:100px;overflow:hidden" title="1111111111111111111111111111111111111111111111111111">111111111111111111111111111111111111111111111111111111111111111</div></th>'+
            '<th width="10px"><div>111111111111111111111111111111111111111111111111111111111111111</div></th>'+
            '<th width="10px"><div>111111111111111111111111111111111111111111111111111111111111111</div></th>'+
            '<th width="10px"><div>111111111111111111111111111111111111111111111111111111111111111</div></th>'+
            '<th width="10px"><div>111111111111111111111111111111111111111111111111111111111111111</div></th>'+
            '<th width="10px"><div>111111111111111111111111111111111111111111111111111111111111111</div></th>'+
            '<th width="10px"><div>111111111111111111111111111111111111111111111111111111111111111</div></th>'+
            '<th width="10px"><div>111111111111111111111111111111111111111111111111111111111111111</div></th>'+
            '<th width="10px"><div>111111111111111111111111111111111111111111111111111111111111111</div></th>'+
            '<th width="10px"><div>111111111111111111111111111111111111111111111111111111111111111</div></th>'+
            '<th width="10px"><div>111111111111111111111111111111111111111111111111111111111111111</div></th>'+
            '<th width="10px"><div>111111111111111111111111111111111111111111111111111111111111111</div></th>'+
            '</tr>'+
            '<tr>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '</tr>'+
            '<tr>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '<td>11111</td>'+
            '</tr>'+
            
           	'</table>');
		$(_this).append($table);
        }
    }

})(jQuery);