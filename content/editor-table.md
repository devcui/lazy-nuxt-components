# EditorTable 组件文档

EditorTable 是一个功能强大的表格编辑组件，集成了表单、表格和分页功能，支持多种表单字段类型和自定义配置。

## 特性

- 🎨 支持多种表单字段类型（输入框、选择器、开关、颜色选择器等）
- 📊 集成表格展示功能
- 📄 内置分页功能
- 🔧 高度可定制化
- 📱 响应式设计
- 🎯 TypeScript 支持

## 安装

该组件基于 Nuxt UI 构建，确保你已经安装了 `@nuxt/ui`：

```bash
npm install @nuxt/ui
```

## 基础用法

::code-group

```vue [基础示例]
<template>
  <EditorTable v-bind="editorProps" />
</template>

<script setup>
import type { ETProps } from '~/components/editor-table/types'

const editorProps: ETProps<User> = {
  text: {
    submit: '搜索',
    reset: '重置'
  },
  form: {
    state: reactive({
      name: '',
      email: ''
    }),
    fields: [
      {
        type: 'input',
        field: { name: 'name', label: '姓名' },
        component: { placeholder: '请输入姓名' }
      },
      {
        type: 'input',
        field: { name: 'email', label: '邮箱' },
        component: { placeholder: '请输入邮箱', type: 'email' }
      }
    ]
  }
}
</script>
```

::

## 表单字段类型

EditorTable 支持多种表单字段类型：

### 输入框 (input)

```vue
{
  type: 'input',
  field: { name: 'username', label: '用户名' },
  component: { 
    placeholder: '请输入用户名',
    type: 'text' // 或 'email', 'password' 等
  }
}
```

### 数字输入框 (input-number)

```vue
{
  type: 'input-number',
  field: { name: 'age', label: '年龄' },
  component: { 
    min: 0,
    max: 120,
    placeholder: '请输入年龄'
  }
}
```

### 选择器 (select)

```vue
{
  type: 'select',
  field: { name: 'role', label: '角色' },
  component: {
    placeholder: '请选择角色',
    options: [
      { label: '管理员', value: 'admin' },
      { label: '用户', value: 'user' },
      { label: '访客', value: 'guest' }
    ]
  }
}
```

### 多选选择器 (select-menu)

```vue
{
  type: 'select-menu',
  field: { name: 'permissions', label: '权限' },
  component: {
    multiple: true,
    options: [
      { label: '读取', value: 'read' },
      { label: '写入', value: 'write' },
      { label: '删除', value: 'delete' }
    ]
  }
}
```

### 开关 (switch)

```vue
{
  type: 'switch',
  field: { name: 'enabled', label: '启用状态' }
}
```

### 复选框 (checkbox)

```vue
{
  type: 'checkbox',
  field: { name: 'agree', label: '同意条款' }
}
```

### 复选框组 (checkbox-group)

```vue
{
  type: 'checkbox-group',
  field: { name: 'interests', label: '兴趣爱好' },
  component: {
    options: [
      { label: '技术', value: 'tech' },
      { label: '体育', value: 'sports' },
      { label: '艺术', value: 'arts' }
    ]
  }
}
```

### 单选按钮组 (radio-group)

```vue
{
  type: 'radio-group',
  field: { name: 'gender', label: '性别' },
  component: {
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '其他', value: 'other' }
    ]
  }
}
```

### 文本域 (textarea)

```vue
{
  type: 'textarea',
  field: { name: 'description', label: '描述' },
  component: {
    placeholder: '请输入描述',
    rows: 4
  }
}
```

### 颜色选择器 (color-picker)

```vue
{
  type: 'color-picker',
  field: { name: 'color', label: '颜色' }
}
```

### 滑块 (slider)

```vue
{
  type: 'slider',
  field: { name: 'progress', label: '进度' },
  component: {
    min: 0,
    max: 100,
    step: 1
  }
}
```

## API 参考

### ETProps

主要的组件属性接口：

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `url` | `string` | - | API 接口地址 |
| `primary` | `string` | - | 主键字段名 |
| `className` | `string` | - | 自定义样式类名 |
| `text` | `ETTextProps` | - | 文本配置 |
| `form` | `ETFormProps` | - | 表单配置 |
| `table` | `ETTableProps` | - | 表格配置 |
| `page` | `ETPaginationProps` | - | 分页配置 |

### ETTextProps

文本配置选项：

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `submit` | `string` | - | 提交按钮文本 |
| `reset` | `string` | - | 重置按钮文本 |
| `edit` | `string` | - | 编辑按钮文本 |
| `cancel` | `string` | - | 取消按钮文本 |
| `add` | `string` | - | 添加按钮文本 |
| `delete` | `string` | - | 删除按钮文本 |
| `update` | `string` | - | 更新按钮文本 |
| `empty` | `string` | - | 空数据提示文本 |

### ETFormProps

表单配置选项，继承自 UForm 的所有属性，并扩展了以下属性：

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `fields` | `ETFormItem[]` | - | 表单字段配置 |
| `buttons` | `ETButtonProps[]` | - | 自定义按钮配置 |
| `inline` | `boolean` | `false` | 是否内联显示 |
| `onCreate` | `() => Promise<void>` | - | 创建回调函数 |
| `onSearch` | `(param: ETPageParam<T>) => Promise<ETPageResult<T>>` | - | 搜索回调函数 |
| `onReset` | `() => Promise<ETPageResult<T>>` | - | 重置回调函数 |

### ETFormItem

表单字段配置联合类型，支持以下字段类型：

- `input` - 文本输入框
- `input-menu` - 输入菜单
- `input-number` - 数字输入框
- `select` - 选择器
- `select-menu` - 选择菜单
- `radio-group` - 单选按钮组
- `checkbox` - 复选框
- `checkbox-group` - 复选框组
- `switch` - 开关
- `textarea` - 文本域
- `color-picker` - 颜色选择器
- `slider` - 滑块

每种类型都包含：

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `type` | `string` | - | 字段类型 |
| `field` | `ETFormItemProps` | - | 字段属性（继承自 UFormField） |
| `component` | `对应组件Props` | - | 组件特定属性 |
| `inline` | `boolean` | `false` | 是否内联显示 |

## 完整示例

这里是一个完整的用户管理示例：

::code-group

```vue [完整示例]
<template>
  <EditorTable v-bind="userEditorProps" />
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { ETProps } from '~/components/editor-table/types'

type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  notifications: boolean
  age: number
  interests: string[]
  bio?: string
  theme: 'light' | 'dark' | 'system'
  favoriteColor: string
}

const schema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符'),
  email: z.string().email('邮箱格式不正确'),
  role: z.enum(['admin', 'user', 'guest']),
  notifications: z.boolean(),
  age: z.number().min(18, '年龄必须大于18岁'),
  interests: z.array(z.string()),
  bio: z.string().optional(),
  theme: z.enum(['light', 'dark', 'system']),
  favoriteColor: z.string()
})

const userEditorProps: ETProps<User> = {
  url: '/api/users',
  primary: 'id',
  className: 'user-editor',
  text: {
    submit: '搜索用户',
    reset: '清空表单',
    edit: '编辑用户',
    cancel: '取消',
    add: '添加用户',
    delete: '删除用户',
    update: '更新用户',
    empty: '暂无用户数据'
  },
  form: {
    schema: schema,
    state: reactive({
      name: '',
      email: '',
      role: 'user',
      notifications: false,
      age: 18,
      interests: [],
      bio: '',
      theme: 'system',
      favoriteColor: '#000000'
    }),
    fields: [
      {
        type: 'input',
        field: { name: 'name', label: '姓名' },
        component: { placeholder: '请输入姓名' }
      },
      {
        type: 'input',
        field: { name: 'email', label: '邮箱地址' },
        component: { placeholder: '请输入邮箱地址', type: 'email' }
      },
      {
        type: 'select',
        field: { name: 'role', label: '用户角色' },
        component: {
          placeholder: '请选择用户角色',
          options: [
            { label: '管理员', value: 'admin' },
            { label: '普通用户', value: 'user' },
            { label: '访客', value: 'guest' }
          ]
        }
      },
      {
        type: 'switch',
        field: { name: 'notifications', label: '启用通知' }
      },
      {
        type: 'input-number',
        field: { name: 'age', label: '年龄' },
        component: { min: 18, max: 120 }
      },
      {
        type: 'checkbox-group',
        field: { name: 'interests', label: '兴趣爱好' },
        component: {
          options: [
            { label: '技术', value: 'tech' },
            { label: '体育', value: 'sports' },
            { label: '艺术', value: 'arts' },
            { label: '科学', value: 'science' }
          ]
        }
      },
      {
        type: 'textarea',
        field: { name: 'bio', label: '个人简介' },
        component: { placeholder: '请介绍一下自己', rows: 4 }
      },
      {
        type: 'select',
        field: { name: 'theme', label: 'UI主题' },
        component: {
          options: [
            { label: '浅色', value: 'light' },
            { label: '深色', value: 'dark' },
            { label: '系统', value: 'system' }
          ]
        }
      },
      {
        type: 'color-picker',
        field: { name: 'favoriteColor', label: '喜欢的颜色' }
      }
    ],
    onCreate: async () => {
      console.log('创建新用户')
    },
    onSearch: async (param) => {
      console.log('搜索参数:', param)
      return {
        index: param.index,
        size: param.size,
        total: 100,
        data: [
          {
            id: '1',
            name: '张三',
            email: 'zhangsan@example.com',
            role: 'admin',
            notifications: true,
            age: 35,
            interests: ['tech', 'sports'],
            bio: '资深软件开发工程师',
            theme: 'dark',
            favoriteColor: '#3366FF'
          },
          {
            id: '2',
            name: '李四',
            email: 'lisi@example.com',
            role: 'user',
            notifications: false,
            age: 28,
            interests: ['arts', 'science'],
            bio: 'UX设计师和研究员',
            theme: 'light',
            favoriteColor: '#FF6699'
          }
        ]
      }
    },
    onReset: async () => {
      console.log('表单重置')
      return {
        index: 1,
        size: 10,
        total: 0,
        data: []
      }
    }
  }
}
</script>

<style>
.user-editor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
```

::

## 最佳实践

### 1. 使用 TypeScript

推荐使用 TypeScript 来获得更好的类型安全和开发体验：

```typescript
// 定义数据类型
interface User {
  id: string
  name: string
  email: string
  // ... 其他字段
}

// 使用泛型
const props: ETProps<User> = {
  // 配置
}
```

### 2. 表单验证

建议使用 Zod 或其他验证库来进行表单验证：

```typescript
import * as z from 'zod'

const schema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符'),
  email: z.string().email('邮箱格式不正确'),
  age: z.number().min(18, '年龄必须大于18岁')
})
```

### 3. 异步操作

确保所有的回调函数都返回 Promise：

```typescript
const props: ETProps<User> = {
  form: {
    onSearch: async (param) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(param)
      })
      return response.json()
    }
  }
}
```

### 4. 错误处理

在异步操作中添加适当的错误处理：

```typescript
onSearch: async (param) => {
  try {
    const response = await fetchUsers(param)
    return response
  } catch (error) {
    console.error('搜索失败:', error)
    // 返回空结果或显示错误消息
    return {
      index: param.index,
      size: param.size,
      total: 0,
      data: []
    }
  }
}
```

## 注意事项

1. **响应式数据**: 使用 `reactive()` 来创建响应式的表单状态
2. **字段命名**: 确保字段的 `name` 属性与数据模型保持一致
3. **异步处理**: 所有的事件回调都应该是异步函数
4. **类型安全**: 充分利用 TypeScript 的类型检查功能

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础表单字段类型
- 集成表格和分页功能
- TypeScript 支持

---

如有问题或建议，请提交 Issue 或 Pull Request。
