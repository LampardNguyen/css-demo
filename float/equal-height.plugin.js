(function($, window, undefined) {
    'use strict';
    var pluginName = 'equalizer',
        data_equal_height = '[data-equal-height]';
    /**
     * [processHeight process height for data-equal-height group has the same data]
     * @param  [type] model [description]
     * @return [type]  [description]
     */
    var processHeight = function(model, data) {
        var elList = model.thisEl.find('[data-equal-height = "' + data + '"]');
        var maxHeight = Math.max.apply(Math, $.map(elList, function(o) {
            return $(o).outerHeight();
        }));
        elList.css({
            'height': maxHeight
        });
    };
    /**
     * [getAllElement get all element by data-equal-height attr]
     * @param  [type] model [description]
     * @return [type]  [description]
     */
    var getAllElement = function(model) {
        var ElList = [];
        model.thisEl.find(data_equal_height).each(function(index, item) {
            ElList.push({
                data: $(item).data('equalHeight')
            });
        });
        // get unique list
        var unilist = [];
        var n = {};
        ElList.forEach(function(item) {
            if (!n[item.data]) {
                n[item.data] = true;
                unilist.push(item);
            }
        });
        model.EqHeightUniqueList = unilist;
    };
    /**
     * [processGroupDataEqual check groups have the data-equal-height is same]
     * @param  [type] model [description]
     * @return [type]  [description]
     */
    var checkGroupDataEqual = function(model) {
        for (var i = model.EqHeightUniqueList.length - 1; i >= 0; i--) {
            var itemFor = model.EqHeightUniqueList[i];
            if (model.thisEl.find('[data-equal-height = "' + itemFor.data + '"]')
                .length > 1) {
                processHeight(model, itemFor.data);
            }
        }
    };
    /**
     * [initEqualizer description]
     * @param  [type] model [description]
     * @return [type]  [description]
     */
    var initEqualizer = function(model) {
        getAllElement(model);
        checkGroupDataEqual(model);
    };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(),
            options);
        this.init();
    }
    Plugin.prototype = {
        init: function() {
            // initialize
            // add events
            this.options.thisEl = this.element;
            initEqualizer(this.options);
        },
        destroy: function() {
            // remove events
            // deinitialize
            $.removeData(this.element[0], pluginName);
        }
    };
    $.fn[pluginName] = function(options, params) {
        return this.each(function() {
            var instance = $.data(this, pluginName);
            if (!instance) {
                $.data(this, pluginName, new Plugin(this, options));
            } else if (instance[options]) {
                instance[options](params);
            }
        });
    };
    $.fn[pluginName].defaults = {};
    $(function() {
        $('[data-' + pluginName + ']')[pluginName]({});
    });
}(jQuery, window));
