# picker

* 作者：quying
* 邮箱：qy9404@163.com
* 版本：**`0.1.0`**

## 介绍

_picker_



## 安装

`lm-*` 组件使用 `npm` 进行管理，命名空间统一为 `lm-`，请使用以下命令进行组件安装。

```
npm i lm-picker --save
```

- 如果你还没有安装 `npm`，可通过以下方式进行 [安装](https://nodejs.org/en/download/)。
- 安装cnpm `npm install -g cnpm --registry=https://registry.npm.taobao.org`



## 使用

### 样例文档

- 待开发

### 使用
最少配置参数为：
- 插入`Picker 子元素`增加内容

```html
<MultiPicker
  selectedValue={this.state.value}
  onValueChange={this.onChange}
>
  <Picker>
    <div value="1">one</div>
    <div value="2">two</div>
    <div value="3">three</div>
    <div value="4">four</div>
    <div value="5">five</div>
    <div value="6">six</div>
    <div value="7">seven</div>
    <div value="8">eight</div>
  </Picker>
  <Picker>
    <div value="11">eleven</div>
    <div value="12">twelve</div>
    <div value="13">thirteen</div>
    <div value="14">fourteen</div>
    <div value="15">fifteen</div>
    <div value="16">sixteen</div>
    <div value="17">seventeen</div>
    <div value="18">eighteen</div>
  </Picker>
</MultiPicker>

```

Cascader
```js
const data = [
  {
    label: '北京',
    value: '01',
    children: [
      {
        label: '东城区',
        value: '01-1',
      },
      {
        label: '西城区',
        value: '01-2',
      },
      {
        label: '崇文区',
        value: '01-3',
      },
      {
        label: '宣武区',
        value: '01-4',
      },
    ],
  },
  {
    label: '浙江',
    value: '02',
    children: [
      {
        label: '杭州',
        value: '02-1',
        children: [
          {
            label: '西湖区',
            value: '02-1-1',
          },
          {
            label: '上城区',
            value: '02-1-2',
          },
          {
            label: '江干区',
            value: '02-1-3',
          },
          {
            label: '下城区',
            value: '02-1-4',
          },
        ],
      },
      {
        label: '宁波',
        value: '02-2',
        children: [
          {
            label: 'xx区',
            value: '02-2-1',
          },
          {
            label: 'yy区',
            value: '02-2-2',
          },
        ],
      },
      {
        label: '温州',
        value: '02-3',
      },
      {
        label: '嘉兴',
        value: '02-4',
      },
      {
        label: '湖州',
        value: '02-5',
      },
      {
        label: '绍兴',
        value: '02-6',
      },
    ],
  },
];
```
```html
<Cascader 
    cols={ COL }
    value={ this.state.value }
    data={ globalData } 
    onChange={ this.onChange } />
```
Popup
- picker和content属性二选一

```
<Popup
    title="选择"
    value={ this.state.value }
    picker={ picker }
    showState={ this.props.showState }
    onDismess = { this.onDismess }
    onOk={ this.onOk }
/>
```

### 配置参数

#### Picker

| Prop | Type | Default | Description |
| ---- |:----:|:-------:| :----------:|
| **selectedValue** | string/number | 0 | 选中项的key值 |
| **disabled** | bool | false | 是否可选 |
| **onValueChange** | function | undefined | 选中项改变的回调函数 |
| **selectedClassName** | string | undefined | 选中项的样式类名 |

#### MultiPicker

| Prop | Type | Default | Description |
| ---- |:----:|:-------:| :----------:|
| **selectedValue** | array | [] | 选中项的key值合集 |
| **disabled** | bool | false | 是否可选 |
| **onValueChange** | function | undefined | 选中项改变的回调函数 |

#### Cascader

| Prop | Type | Default | Description |
| ---- |:----:|:-------:| :----------:|
| **col** | number | 3 | 列数 |
| **value** | array | [] | 选中项的key值合集 |
| **disabled** | bool | false | 是否可选 |
| **data** | array | undefined | 数据集合 |
| **onChange** | function | undefined | 选中项改变的回调函数 |

#### Popup

| Prop | Type | Default | Description |
| ---- |:----:|:-------:| :----------:|
| **showState** | bool | false | 列数 |
| **opacity** | number | 5 | 遮罩透明度 |
| **title** | string | undefined | 弹窗标题 |
| **content** | node | undefined | 内容 |
| **picker** | node | undefined | 选择器 |
| **onOk** | function | ()=>{} | 确定按钮回调 |
| **onDismess** | function | ()=>{} | 取消按钮回调 |


## 注意事项

- 组件注意事项



## 开发调试

进入项目目录后，使用 `node` 命令启动服务

```
npm run start
```

打包发布可通过 `node` 命令执行

```
npm run build
npm publish
```



## 相关资料

* [lm 组件开发规范](http://)



## Changelog

### 0.1.0
1. init

---
