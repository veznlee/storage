/**
 * Created by liguixing on 2017/8/14 0014.
 */
function OperatePopup(container){
    this.$container =  container || $(document.body);
}
OperatePopup.prototype = {
    constructor:OperatePopup,
    createView:function(opt){
        this.$lay = $('<div class="pui-popup-backdrop"></div>').appendTo(this.$container);
        var title = opt.title || '网页提示',
            _html = '<div class="pui-popup-title">'+title+'</div>\
                <div class="pui-popup-text">'+opt.text+'</div>';
        this.$popup = $('<div class="pui-popup">\
            <div class="pui-popup-inner">'+_html+'</div>\
            <div class="pui-popup-buttons"></div>\
            </div>').appendTo(this.$container);
    },
    _show:function(){
        this.$lay.css('display','block').addClass('pui-active');
        this.$popup.css('display','block').addClass('pui-popup-in');
    },
    _close:function(){
        var $this = this;
        this.$lay.removeClass('pui-active');
        this.$popup.removeClass('pui-popup-in');
        setTimeout(function(){
            $this.$lay.remove();
            $this.$popup.remove();
        },400);
    },
    alert:function(opt){
        this.createView(opt);
        var $this = this,$popup = $this.$popup;
        $popup.find('.pui-popup-buttons')
            .html('<span class="pui-popup-button pui-popup-button-bold pui-button-sure">确定</span>')
            .find('.pui-button-sure').click(function(){
            $this._close();
            opt.sureFn && opt.sureFn();
        });
        $this._show();
    },
    confirm:function(opt){
        this.createView(opt);
        var $this = this,$popup = $this.$popup;
        $popup.find('.pui-popup-buttons')
            .html('<span class="pui-popup-button pui-button-cancel">取消</span><span class="pui-popup-button pui-popup-button-bold pui-button-sure">确定</span>')
            .on('click','.pui-button-sure',function(){
                var _val = $popup.find('input').val();
                $this._close();
                opt.sureFn && opt.sureFn(_val);
            })
            .on('click','.pui-button-cancel',function(){
                $this._close();
                opt.cancelFn && opt.cancelFn();
            });
        $this._show();
    },
    input:function(opt){
        this.createView(opt);
        var $this = this,$popup = $this.$popup;
        $popup.find('.pui-popup-inner').append('<div class="pui-popup-input"><input type="text" autofocus="" placeholder="请输入内容"></div>');
        $popup.find('.pui-popup-buttons')
            .html('<span class="pui-popup-button pui-button-cancel">取消</span><span class="pui-popup-button pui-popup-button-bold pui-button-sure">确定</span>')
            .on('click','.pui-button-sure',function(){
                var _val = $popup.find('input').val();
                $this._close();
                opt.sureFn && opt.sureFn(_val);
            })
            .on('click','.pui-button-cancel',function(){
                $this._close();
                opt.cancelFn && opt.cancelFn();
            });
        $this._show();
    },
    tip:function(str,time){
        var $this = this;
        var close = false;
        this.$lay = $('<div class="pui-popup-backdrop"></div>').appendTo(this.$container)
            .addClass('pui-active')
            .on('click',function(){
                $this.$lay.remove();
                $this.$popup.remove();
                close = true;
            });
        this.$popup = $('<div class="pui-toast-container">'+
            '<div class="pui-toast-message">'+str+'</div>'+
            '</div>').appendTo(this.$container).addClass('pui-active');
        setTimeout(function(){
            if(!close){
                $this.$lay.remove();
                $this.$popup.remove();
            }
        },2000 || time)
    }
};
