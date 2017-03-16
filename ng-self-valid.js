/**
 * Created by xianrongbin on 2017/3/16.
 */
var app = angular.module('myApp', []);

app.controller('testCtrl', ['$scope', 'uiValidFactory', function ($scope, uiValidFactory) {
        $scope.certCheck = function (val) {
            if (val > 32) {
                return "数字太大了";
            }
            return true;
        };

        $scope.submit = function () {
            if (!uiValidFactory.checkValidForm($scope.baseInfoForm.$name)) {

            }

        };
    }]
);

Math.guid = function () {
    var a = "", b = 1;
    for (; b <= 32; b++) {
        var c = Math.floor(Math.random() * 16).toString(16);
        a += c;
        if (b === 8 || b === 12 || b === 16 || b === 20) {
            a += '-';
        }
    }
    return a;
};

String.prototype.contains = String.prototype.contains || function (a) {
        return this.indexOf(a) != -1;
    };

String.prototype.format = String.prototype.format || function () {
        var a = Array.prototype.slice.call(arguments);
        return this.replace(/\{(\d+)}/g, function (c, b) {
            return a[b];
        })
    };

app.factory('uiTipsFactory', function () {
    return {
        filterClass: function (ele, invalid) {
            if (invalid) {
                //如果验证不通过
                ele.removeClass('ng-valid').removeClass('ng-pristine').addClass('ng-invalid').addClass('ng-dirty');
            } else {
                ele.removeClass('ng-invalid').addClass('ng-valid');
            }
        },
        on: function (ele, msg) {
            var lastTip = ele.data('last-tip');
            if (lastTip && lastTip === msg) {
                return;
            }

            ele.data('last-tip', msg);
            this.filterClass(ele, true);

            var offset = ele.offset();
            if (!offset.top && !offset.left && ele.is('hidden')) {
                offset = ele.show().offset();
            }

            var id = ele.attr('ui-valid-id');
            if (!id) {
                id = Math.guid();
                ele.attr('ui-valid-id', id);
            }

            if (id.contains('.')) {
                id = id.replace(/\./g, '_');
            }

            var top = offset.top,
                left = offset.left;

            var getTips = function () {
                var _tip = $('#vtip_' + id);
                if (_tip.length) {
                    _tip.html(msg).css({
                        'display': 'none',
                        'top': top + 'px',
                        'left': left + ele.width() + 10 + 'px'
                    });

                } else {
                    var html = '<div id="vtip_' + id + '" class="vtip qtip  qtip-rounded box-shadow-tips">' +
                        '<div class="qtip-content">' + msg + '</div>';
                    $(html).css({
                        'display': 'none',
                        'position': 'absolute',
                        'top': top + 'px',
                        'left': left + ele.width() + 10 + 'px'
                    }).appendTo($('body'));
                }
            };

            var bindTipsShow = function () {
                getTips();
                ele.unbind('mouseenter mouseleave').bind('mouseenter', function () {
                    var _tip = $('#vtip_' + id);
                    if (_tip.is(':hidden')) {
                        _tip.show();
                    }
                }).bind('mouseleave', function () {
                    $('#vtip_' + id).hide();
                });

            };

            bindTipsShow();
        },
        off: function (ele) {
            ele.data('last-tip', '');
            this.filterClass(ele);
            var id = ele.attr('ui-valid-id');

            if (!id) {
                return;
            }

            if (id.contains('.')) {
                id = id.replace(/\./g, '_');
            }

            $('#vtip_' + id).remove();
            ele.unbind('mouseenter mouseleave');
        }
    }
});

app.factory('uiValidFactory', ['$parse', 'uiTipsFactory', function ($parse, tips) {
    return {
        check: function (val, rules, $scope, defaultTips, extendParam) {
            if (!rules) {
                return {
                    flag: true
                };
            }

            var rulesArr = rules.split(' '),
                isBlank = val === null || val === undefined || val === '' || ('' + val === '');

            //如果不是必填项 且没有输入值 则清除提示框
            if ($.inArray('r', rulesArr) === -1 && isBlank) {
                return {
                    flag: true
                }
            }
            var i = 0, len = rulesArr.length;
            for (; i < len; i++) {
                var rule = rulesArr[i];
                if (!rule) {
                    continue;
                }

                var flag = true;
                if ('r' === rule) {
                    //如果是必填项，有值 返回true
                    flag = !isBlank;
                } else if (rule.contains(':')) {
                    //如果校验规则是 fn:ctrl.certCheck
                    flag = this.checkRule(val, rule.split(/:/), $scope, extendParam);
                } else {
                    //校验 规则是 int 用正则匹配 数字 邮箱 长度
                    var pat = this.pats[rule];
                    if (pat instanceof RegExp) {
                        if (angular.isString(val)) {
                            flag = this.mat(val, pat);
                        }
                    } else if (angular.isFunction(pat)) {
                        flag = pat(val);
                    } else {
                        flag = false;
                    }
                }

                //这是干什么的呢
                if (angular.isString(flag)) {
                    return {
                        flag: false,
                        msg: flag,
                        rule: rule
                    }
                }

                if (flag === false) {
                    var msg = this.getMsg(rule, defaultTips) || this.getMsg('tips.valid');
                    console.log(msg);
                    return {
                        flag: false,
                        msg: msg,
                        rule: rule
                    }
                }
            }

            return {
                flag: true
            }
        },
        checkRule: function (val, ruleArr, $scope, extendParam) {
            //ruleArr fn:certCheck
            var rule = ruleArr[0];
            if (rule === 'fn') {
                fnName = ruleArr[1];//指定被调函数的名字 certCheck
                var fn = $parse(fnName)($scope);
                if (!fn) {
                    return true;
                }
                return fn.call($scope, val, extendParam);
            } else {
                return true;
            }
        },
        checkValidForm: function (formName) {
            //只检查必填项
            //使用属性筛选器 获得里面所有的元素
            var formContext = $('form[name="{0}"],[ng-form="{0}"],[data-ng-form="{0}"]'.format(formName)),
                validList = formContext.find('[my-valid]');//validList 不是数组，是伪数组
            if (!validList.length) {
                return;
            }

            var that = this,
                validFlags = [];
            validList.each(function () {
                    var ele = $(this),
                        val = ele.val(),
                        ruleStr = ele.attr('my-valid');
                    if (!ruleStr) {
                        return true;
                    }
                    if (angular.isString(val)) {
                        val = val.trim();
                    }

                    var validRules = ruleStr.split(' ');
                    if ($.inArray('r', validRules) != -1 && !val) {
                        var modelValue = ele.attr('ng-model') || ele.attr('data-ng-model');
                        validFlags.push(modelValue);
                        tips.on(ele, that.getMsg('r'));
                    }
                }
            );
            return validFlags;
        },
        mat: function (val, pat) {
            if (!pat) {
                return;
            }
            return pat.test(val);
        }

        ,
        getMsg: function (rule, tips) {
            tips = tips || '';
            //可以在界面上直接写 tips
            if (tips && tips.contains(':')) {
                return tips;
            }

            var msg = this.msgs[rule];
            if (msg) {
                var params0 = tips.contains(':') ? tips.split(/:/)[0] : '';
                var params1 = '';
                if (rule.startsWith('min') || rule.startsWith('max')) {
                    var ruleArr = rule.split(/:/);
                    params1 = ruleArr[ruleArr.length - 1];
                }
                return msg.format(params0, params1);
            } else {

            }
        }
        ,
        regPat: function (code, pat, msg) {
            if (this.pat[code]) {
                return;
            }

            this.pats[code] = pat;
            this.msgs[code] = msg;

        }
        ,
        msgs: {
            'r': '必填',
            'int': '{0}必须为整数'
        }
        ,
        pats: {
            'int': /^[\-\+]?([0-9]+)$/
        }
    }
}
])
;

app.directive('myValid', ['$parse', 'uiTipsFactory', 'uiValidFactory', function ($parse, tips, valid) {
    var uiValidAttrIdName = 'ui-valid-id';
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            var validId = el.attr(uiValidAttrIdName);

            if (!validId) {
                validId = Math.guid();
                el.attr(uiValidAttrIdName, validId);
            }

            var getRules = function () {
                return attrs.myValid;
            };

            var lastOldRules;

            var validFn = function (value, oldRules) {
                var sp = '_';
                var rules = getRules();
                var r = valid.check(value, rules, scope, attrs.uiValidTips);
                if (lastOldRules && !oldRules) {
                    oldRules = lastOldRules;
                }

                if (r.flag && oldRules) {
                    rules = rules ? rules + ' ' + oldRules : oldRules;
                }

                if (rules) {
                    var arrInner = rules.split(' ');
                    var i = 0;
                    for (; i < arrInner.length; i++) {
                        var oneRule = arrInner[i];
                        if (!oneRule.trim()) {
                            continue;
                        }

                        ctrl.$setValidity(attrs.ngModel + sp + oneRule, r.flag ? true : oneRule != r.rule);
                    }
                }

                if (!r.flag) {
                    tips.on(el, r.msg);
                } else {
                    tips.off(el);
                }

                return r.flag;
            };

            var init = function () {
                var rules = getRules();
                if (!rules) {
                    return;
                }

                var parsers = ctrl.$parsers;
                if (parsers && parsers.length > 0) {
                    parsers.clean();
                }

                parsers.unshift(function (value) {
                    return validFn(value) ? value : undefined;
                });
            };

            scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                if (ctrl.$modelValue != undefined && (ctrl.$invalid || el.hasClass('ng-invalid'))) {
                    validFn(ctrl.$modelValue);
                }
            });

            scope.$watch(getRules, function (newRules, oldRules) {
                init();

                lastOldRules = oldRules;

                if (ctrl.$modelValue === undefined || ctrl.$modelValue === null) {
                    var needValid = false;
                    el.hasClass('ng-invalid');
                    var isValNaN = ctrl.$viewValue !== ctrl.$viewValue;

                    if (ctrl.$invalid || (ctrl.$viewValue !== undefined && !isValNaN)) {
                        needValid = true;
                    }


                    if (needValid) {
                        ctrl.$setViewValue(ctrl.$viewValue);
                    }

                } else {
                    if (!ctrl.$dirty && attrs.dirtyCheck) {
                        console.log('----');
                    } else {
                        validFn(ctrl.$modelValue, oldRules);
                    }
                }
            });


        }
    }
}]);
