const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 连接MongoDB数据库
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/searchhub';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 用户模型
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const UserConfigSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  searchGroups: { type: Object, default: {} },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const UserConfig = mongoose.model('UserConfig', UserConfigSchema);

// JWT认证中间件
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '访问令牌缺失' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    return res.status(403).json({ error: '无效的访问令牌' });
  }
};

// 用户注册
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: '用户邮箱或用户名已存在' });
    }

    // 哈希密码
    const hashedPassword = await bcrypt.hash(password, 12);

    // 创建用户
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // 创建默认配置
    const defaultConfig = {
      "通用搜索": {
        color: "#6e45e2",
        engines: [
          { name: "百度", url: "https://www.baidu.com/s?wd={keyword}", icon: "fab fa-baidu", color: "#2932e1" },
          { name: "Google", url: "https://www.google.com/search?q={keyword}", icon: "fab fa-google", color: "#34a853" },
          { name: "Bing", url: "https://www.bing.com/search?q={keyword}", icon: "fab fa-microsoft", color: "#0078d4" }
        ]
      }
    };

    const userConfig = new UserConfig({ userId: user._id, searchGroups: defaultConfig });
    await userConfig.save();

    // 生成JWT令牌
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: '用户注册成功',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: '服务器错误: ' + error.message });
  }
});

// 用户登录
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: '用户不存在' });
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: '密码错误' });
    }

    // 生成JWT令牌
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.json({
      message: '登录成功',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: '服务器错误: ' + error.message });
  }
});

// 获取用户配置
app.get('/api/config', authenticateToken, async (req, res) => {
  try {
    let userConfig = await UserConfig.findOne({ userId: req.user._id });
    
    if (!userConfig) {
      const defaultConfig = {
        "通用搜索": {
          color: "#6e45e2",
          engines: [
            { name: "百度", url: "https://www.baidu.com/s?wd={keyword}", icon: "fab fa-baidu", color: "#2932e1" },
            { name: "Google", url: "https://www.google.com/search?q={keyword}", icon: "fab fa-google", color: "#34a853" },
            { name: "Bing", url: "https://www.bing.com/search?q={keyword}", icon: "fab fa-microsoft", color: "#0078d4" }
          ]
        }
      };
      
      userConfig = new UserConfig({ userId: req.user._id, searchGroups: defaultConfig });
      await userConfig.save();
    }

    res.json({ searchGroups: userConfig.searchGroups });
  } catch (error) {
    res.status(500).json({ error: '获取配置失败: ' + error.message });
  }
});

// 保存用户配置
app.post('/api/config', authenticateToken, async (req, res) => {
  try {
    const { searchGroups } = req.body;

    let userConfig = await UserConfig.findOne({ userId: req.user._id });
    
    if (userConfig) {
      userConfig.searchGroups = searchGroups;
      userConfig.updatedAt = new Date();
    } else {
      userConfig = new UserConfig({ userId: req.user._id, searchGroups });
    }

    await userConfig.save();
    res.json({ message: '配置保存成功', searchGroups: userConfig.searchGroups });
  } catch (error) {
    res.status(500).json({ error: '保存配置失败: ' + error.message });
  }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'SearchHub API服务运行正常'
  });
});

// 根路径
app.get('/', (req, res) => {
  res.json({ 
    message: 'SearchHub后端API服务',
    endpoints: {
      health: '/api/health',
      register: '/api/auth/register',
      login: '/api/auth/login',
      config: '/api/config'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SearchHub后端服务运行在端口 ${PORT}`);
});