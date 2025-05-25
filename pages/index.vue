<template>
  <div class="flex flex-col lg:flex-row h-screen max-w-full mx-auto p-5 gap-0">
    <!-- Left Panel -->
    <div class="flex-1 lg:pr-4 overflow-auto">
      <EditorTable v-bind="props" />
    </div>
    
    <!-- Divider -->
    <div class="h-px lg:h-auto lg:w-px bg-gray-300 my-4 lg:my-0 lg:mx-4 lg:min-h-full"></div>
    
    <!-- Right Panel -->
    <div class="flex-1 lg:pl-4 overflow-auto">
      <ContentRenderer v-if="home" :value="home" />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { ETProps } from '~/components/editor-table/types'

const { data: home } = await useAsyncData(() => queryCollection('content').path('/editor-table').first())

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
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  role: z.enum(['admin', 'user', 'guest']),
  notifications: z.boolean(),
  age: z.number().min(18, 'Must be at least 18 years old'),
  interests: z.array(z.string()),
  bio: z.string().optional(),
  theme: z.enum(['light', 'dark', 'system']),
  favoriteColor: z.string()
})

const props: ETProps<User> = {
  url: '/api/users',
  primary: 'id',
  className: 'user-editor',
  text: {
    submit: 'Search User',
    reset: 'Clear Form',
    edit: 'Edit User',
    cancel: 'Cancel',
    add: 'Add User',
    delete: 'Remove User',
    update: 'Update User',
    empty: 'No users found'
  },
  form: {
    schema: schema,
    state: reactive({
      email: 'devcui@outlook.com',
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
        field: { name: 'name', label: 'Name' },
        component: { placeholder: 'Enter user name' }
      },
      {
        type: 'input',
        field: { name: 'email', label: 'Email Address' },
        component: { placeholder: 'Enter email address', type: 'email' }
      },
      {
        type: 'select',
        field: { name: 'role', label: 'User Role' },
        component: {
          placeholder: 'Select user role',
          items: [
            { label: 'Administrator', value: 'admin' },
            { label: 'Regular User', value: 'user' },
            { label: 'Guest', value: 'guest' }
          ]
        }
      },
      {
        type: 'switch',
        field: { name: 'notifications', label: 'Enable Notifications' }
      },
      {
        type: 'input-number',
        field: { name: 'age', label: 'Age' },
        component: { min: 18, max: 120 }
      },
      {
        type: 'checkbox-group',
        field: { name: 'interests', label: 'Interests' },
        component: {
          items: [
            { label: 'Technology', value: 'tech' },
            { label: 'Sports', value: 'sports' },
            { label: 'Arts', value: 'arts' },
            { label: 'Science', value: 'science' }
          ]
        }
      },
      {
        type: 'textarea',
        field: { name: 'bio', label: 'Biography' },
        component: { placeholder: 'Tell us about yourself', rows: 4 }
      },
      {
        type: 'select',
        field: { name: 'theme', label: 'UI Theme' },
        component: {
          items: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'System', value: 'system' }
          ]
        }
      },
      {
        type: 'color-picker',
        field: { name: 'favoriteColor', label: 'Favorite Color' }
      }
    ],
    buttons: [
      { label: 'Submit', type: 'submit', color: 'primary' },
      { label: 'Reset', type: 'reset' }
    ],
    onCreate: async () => {
      console.log(123)
    },
    onSearch: async (param) => {
      // Mock API call
      console.log('Searching with params:', param)
      return {
        index: param?.index,
        size: param.size,
        total: 100,
        data: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin',
            notifications: true,
            age: 35,
            interests: ['tech', 'sports'],
            bio: 'Software developer with 10+ years experience',
            theme: 'dark',
            favoriteColor: '#3366FF'
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'user',
            notifications: false,
            age: 28,
            interests: ['arts', 'science'],
            bio: 'UX designer and researcher',
            theme: 'light',
            favoriteColor: '#FF6699'
          }
        ]
      }
    },
    onReset: async () => {
      console.log('Form reset')
      return {
        index: 1,
        size: 10,
        total: 0,
        data: []
      }
    }
  },
  table: {
    columns: [],
    onEdit: user => async (param) => {
      console.log('Edit user:', user)
      return await fetchUsers(param)
    },
    onDelete: user => async (param) => {
      console.log('Delete user:', user)
      return await fetchUsers(param)
    }
  },
  page: {
    total: 100,
    onPageIndexChange: async (param) => {
      console.log('Page index changed:', param)
      return await fetchUsers(param)
    },
    onPageSizeChange: async (param) => {
      console.log('Page size changed:', param)
      return await fetchUsers(param)
    }
  }
}

// Mock function to simulate fetching users
const fetchUsers = async (param: any): Promise<any> => {
  // This would be an API call in a real application
  return {
    index: param.index,
    size: param.size,
    total: 100,
    data: [/* mock user data would be returned here */]
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
