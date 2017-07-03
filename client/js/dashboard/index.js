import './dashboard.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reqwest from 'reqwest';
import $ from 'jquery';
import { Table, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import axios from 'axios';
import Mock from 'mockjs';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            token: ''
        }
        let [,,third] = ['foo','bar','baz'];
        console.log('third===',"\u{41}\u{42}\u{43}");

        
        //---------------------------------------------对象字面量创建对象
        // let human={
        //     breathe(){
        //         console.log('breathing.......');
        //     }
        // };
        // let worker = {
        //     __proto__:human,
        //     company:'freelancer',
        //     work(){
        //         console.log('working......');
        //     }
        // };

        // console.log('human===',human.breathe());
        // console.log('worker===',worker.breathe());
        // console.log(worker);


        //------------------------------------------------拓展参数
        // let people = ['jason', 'moses', 'yarry','marrey'];
        // this.sayHello(...people);


        //-------------------------------------------------set map的用法

        // let s = new Set();
        // s.add('hello').add('goodbye').add('hello');
        // console.log('s==',s.size);

        //----------------------------------------------Proxy的用法




        //----------------------------------------------Symbols的用法


    }
    sayHello(p1, p2, p3) {
        console.log(`Hello${p1},${p2},${p3}`);
    }
    axiosget() {
        // console.log(window.XMLHttpRequest);
        //    axios.get('/getdata?id=12345&name=zhangdongsheng&age=22')
        //     .then(res=>{
        //         console.log('res===',res.data);
        //     })
        //     .catch(err=>{
        //         console.log('err===',err);
        //     })

        // axios.get('/getdata', {
        //     params: {
        //         id: 123456,
        //         name: '张东生',
        //         age: 30
        //     }
        // })
        // .then(res => {
        //         console.log('res==', res.data);
        // })
        // .catch(err => {
        //         console.log('err==', err);
        // })
        //-------------------------------------XMLHttpResponse-------------------------
        // let xmlhttp = '';
        // if (window.XMLHttpRequest) {
        //     xmlhttp = new XMLHttpRequest();
        // } else {
        //     xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        // }
        // xmlhttp = new XMLHttpRequest();
        // if (xmlhttp) {
        //     xmlhttp.open('GET', '/getdata?id=12345&name=zhangdongsheng&age=22', true);
        //     xmlhttp.onreadystatechange = function () {
        //         console.log(xmlhttp.readyState);
        //         if (xmlhttp.readyState == 4) {
        //             if (xmlhttp.status == 200) {
        //                 console.log('请求的结果是:',xmlhttp.responseText);
        //             } else {
        //                 alert('有问题');
        //             }
        //         }
        //     };
        //     xmlhttp.send();
        // }

    }
    axiospost() {
        axios.post('/axiospost', {
            id: '123eqw212334',
            name: 'Marry'
        })
            .then(res => {
                console.log('res===', res.data);
                this.setState({ token: res.data.token });
            })
            .catch(err => {
                console.log('err===', err);
            })
    }
    //解密
    axiospostcode() {
        console.log(this.state.token);

        axios({
            method: 'get',
            url: '/token',
            headers: { 'token': this.state.token }
        })
            .then(res => {
                console.log('res===', res);
            })
            .catch(err => {
                console.log('err===', err);
            })
    }
    getUserAccount() {
        console.log('第一个执行');
        return axios.get('/getdata?id=12345&name=zhangdongsheng&age=22');
    }
    getUserPermissions() {
        console.log('第二个执行');
        return axios.post('/axiospost', {
            id: '123eqw212334',
            name: 'Marry'
        });
    }
    axiosall() {
        // axios.all([this.getUserAccount(), this.getUserPermissions()])
        //     .then(axios.spread(function (acct, perms) {//回调函数，所有的请求都完成后执行
        //         //当两个请求都完成的时候执行这里的操作
        //         console.log('acct===', acct.data);
        //         console.log('perms===', perms.data);
        //     }));

    }
    mockjstest() {
        // var data = Mock.mock({
        //     'n1|1-10.1-3':1,//生成一个浮点数,整数部分大于等于1，小于等于100，小数部分保留1到10位
        //     'n2|123.1-10':1,
        //     'n3|123.3':1,   
        //     'n4|123.10':1.123 
        // })
        // var data = Mock.mock({
        //     'regexp1': /[a-z][A-Z][0-9]/,
        //     'regexp2': /\w\W\s\S\d\D/,
        //     'regexp3': /\d{5,10}/
        // })

        // var data = Mock.mock({
        //     name: {
        //         first: '@FIRST',
        //         middle: '@FIRST',
        //         last: '@LAST',
        //         full: '@first @middle @last'
        //     }
        // })


        // var template = {
        //     'title': 'Syntax Demo',

        //     'string1|1-10': '★',
        //     'string2|3': 'value',

        //     'number1|+1': 100,
        //     'number2|1-100': 100,
        //     'number3|1-100.1-10': 1,
        //     'number4|123.1-10': 1,
        //     'number5|123.3': 1,
        //     'number6|123.10': 1.123,

        //     'boolean1|1': true,
        //     'boolean2|1-2': true,

        //     'object1|2-4': {
        //         '110000': '北京市',
        //         '120000': '天津市',
        //         '130000': '河北省',
        //         '140000': '山西省'
        //     },
        //     'object2|2': {
        //         '310000': '上海市',
        //         '320000': '江苏省',
        //         '330000': '浙江省',
        //         '340000': '安徽省'
        //     },

        //     'array1|1': ['AMD', 'CMD', 'KMD', 'UMD'],
        //     'array2|1-10': ['Mock.js'],
        //     'array3|3': ['Mock.js'],

        //     'function': function () {
        //         return this.title
        //     }
        // }

        // var data = Mock.mock(template);


        // Mock.mock(/\.json/, {
        //     'list|1-10': [{
        //         'id|+1': 1,
        //         'email': '@EMAIL'
        //     }]
        // })
        // $.ajax({
        //     url: 'hello.json',
        //     dataType: 'json'
        // }).done(function (data, status, jqXHR) {
        //     $('<pre>').text(JSON.stringify(data, null, 4))
        //         .appendTo('body')
        // })

        var Random = Mock.Random
        // Random.extend({
        //     constellation: function (date) {
        //         var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        //         return this.pick(constellations)
        //     }
        // })
        // console.log('name=', Random.id()+'-----'+Random.constellation()+'----'+Mock.mock('@CONSTELLATION'));
        // console.log(Mock.mock({constellation:'@CONSTELLATION'}));

        // console.log('data===', JSON.stringify(data,null,4));

        var data = Random.increment();
        console.log('data===', data);
    }
    render() {
        console.log('测试axios');
        return (
            <div>
                <Button type="primary" onClick={this.axiosget.bind(this)}>axios-get</Button>
                <Button type="primary" onClick={this.axiospost.bind(this)}>axios-post</Button>
                <Button type="primary" onClick={this.axiospostcode.bind(this)}>axios-post解密</Button>
                <Button type="primary" onClick={this.axiosall.bind(this)}>axios-all</Button>
                <Button type="primary" onClick={this.mockjstest.bind(this)}>mockjs</Button>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.querySelector('#demo-mount'));
