## zh-cnode

##### 功能预览

- [x] 首页分类查看主题/下拉刷新/上拉加载更多/左右滑动切换分类
- [x] 主题代码高亮/收藏/点赞评论/发表评论/新建主题
- [x] 用户中心登录/注销/我的收藏/取消收藏
- [x] 查看个人数据/其他用户数据/参与/发表主题列表
- [x] 消息中心/已读未读消息/消息数量
- [ ] 消息查看/全部/单个消息标记已读
- [ ] 编辑主题

#### 自定义主题

> 使用 add(name, config, extendName) 添加新的主题

```javascript
import theme from "muse-ui/lib/theme";
theme.add(
  "teal",
  {
    primary: "#009688",
    secondary: "#ff4081",
    success: "#4caf50",
    warning: "#ffeb3b"
  },
  "light"
);

theme.use("teal");
```

- name 主题名称
- config 主题配置对象
- extendName 继承哪个主题， 默认 ‘light’

##### 默认提供的 light 和 dark 两个主题的配置如下：

```javascript
// light.js
{
  primary: '#2196f3',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#fdd835',
  info: '#2196f3',
  error: '#f44336',
  track: '#bdbdbd',
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'gba(0, 0, 0, 0.54)',
    alternate: '#fff',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)' // 提示文字颜色
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: '#fff',
    chip: '#e0e0e0',
    default: '#fafafa'
  }
}
```

```javascript
// dark.js
{
  primary: '#1976d2',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#fdd835',
  info: '#2196f3',
  error: '#f44336',
  track: '#757575',
  text: {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    alternate: '#303030',
    disabled: 'rgba(255, 255, 255, 0.3)',
    hint: 'rgba(255, 255, 255, 0.3)' // 提示文字颜色
  },
  divider: 'rgba(255, 255, 255, 0.3)',
  background: {
    paper: '#424242',
    chip: '#616161',
    default: '#303030'
  }
}
```

#### 主题样式扩展

如果有新加入的样式，需要添加到主题样式中， 则需要使用 addCreateTheme(func) 添加到 themes 集中控制。

```javascript
import theme from "muse-ui/lib/theme";

theme.addCreateTheme(theme => {
  return `
  .mu-hello-word {
    color: ${theme.text.primary}
  }
  `;
});
```
