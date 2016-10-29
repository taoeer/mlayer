# mlayer
自己开发的移动端弹层插件，css和图片已经内置！

# 使用

``mlayer.open(opts)``

### 快捷方式
```javascript
mlayer.alert(content, opts);
mlayer.confirm(content, opts);
mlayer.load(opts);
mlayer.msg(content, time)
```	

### 选项
+ title 标题
+ content 内容
+ shadow 阴影
+ shadowClose 点击阴影是否关闭
+ time 关闭时间
+ type
	+ 1 普通弹层
	+ 2 load层
	+ 3 msg层
+ btns 按钮 （最多两个，第一个为确认， 第二个为取消）

# 开发
``` bash
# 安装依赖
npm install

# 启动监听服务
npm run dev

# 编译
npm run build
```

