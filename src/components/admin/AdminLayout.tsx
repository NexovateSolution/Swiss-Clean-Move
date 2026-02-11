'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import {
  LayoutDashboard,
  Users,
  FileText,
  Camera,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Plus,
  Moon,
  Sun,
  Globe,
  ChevronDown,
  MessageSquare,
  ClipboardList,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useTheme } from '@/contexts/ThemeContext'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const locale = useLocale()
  const t = useTranslations('admin')

  const navigation = [
    { name: t('sidebar.dashboard'), href: `/${locale}/admin`, icon: LayoutDashboard },
    { name: t('sidebar.newProject'), href: `/${locale}/admin/new-project`, icon: Plus },
    { name: t('sidebar.clients'), href: `/${locale}/admin/clients`, icon: Users },
    { name: t('sidebar.quoteRequests'), href: `/${locale}/admin/quotes`, icon: ClipboardList },
    { name: t('sidebar.contactMessages'), href: `/${locale}/admin/contacts`, icon: MessageSquare },
    { name: t('sidebar.serviceForms'), href: `/${locale}/admin/service-forms`, icon: FileText },
    { name: t('sidebar.emailCommunication'), href: `/${locale}/admin/email`, icon: Mail },
    { name: t('sidebar.gallery'), href: `/${locale}/admin/gallery`, icon: Camera },
    { name: t('sidebar.calendar'), href: `/${locale}/admin/calendar`, icon: Calendar },
  ]

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      localStorage.removeItem('user')
      toast.success(t('toast.loggedOut'))
      router.push(`/${locale}/admin/login`)
    } catch (error) {
      toast.error(t('toast.logoutFailed'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 lg:flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex h-full flex-col">
          <div className="relative flex items-center h-32 px-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className={`${sidebarCollapsed ? 'w-full flex justify-center' : 'flex-1 flex justify-center'}`}>
              <div className={`${sidebarCollapsed ? 'w-10' : 'w-full max-w-[260px]'} h-24 relative`}
              >
                <Image
                  src="/images/logo.jpg"
                  alt="SwissCleanMove Logo"
                  fill
                  sizes={sidebarCollapsed ? '40px' : '260px'}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                onClick={() => sidebarCollapsed ? setSidebarCollapsed(false) : setSidebarOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>

          <nav className="mt-8 px-2 space-y-2 flex-1 overflow-y-auto min-h-0">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-2 border-blue-700 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                title={sidebarCollapsed ? item.name : ''}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
          </nav>

          {/* User section */}
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">AD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{t('user.admin')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@swissclean.com</p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={`flex items-center w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors ${sidebarCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'
                }`}
              title={sidebarCollapsed ? t('user.signOut') : ''}
            >
              <LogOut className="w-4 h-4" />
              {!sidebarCollapsed && <span>{t('user.signOut')}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 w-full min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="w-full max-w-lg lg:max-w-xs">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={t('topbar.searchPlaceholder')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 ml-4">
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                  title={t('topbar.language')}
                >
                  <Globe className="w-5 h-5" />
                  <span className="hidden sm:inline text-xs font-medium uppercase text-gray-500 dark:text-gray-400">{locale}</span>
                  <ChevronDown className={`hidden sm:inline w-4 h-4 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    {([
                      { code: 'en', label: 'English' },
                      { code: 'de', label: 'Deutsch' },
                      { code: 'fr', label: 'Français' },
                      { code: 'nl', label: 'Nederlands' },
                    ] as const).map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          const currentPath = pathname.replace(`/${locale}`, '')
                          router.push(`/${l.code}${currentPath}`)
                          setLangOpen(false)
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${locale === l.code ? 'text-swiss-blue font-medium' : 'text-gray-700 dark:text-gray-200'
                          }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={t('topbar.switchTheme', { mode: theme === 'light' ? t('topbar.dark') : t('topbar.light') })}
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 w-full bg-gray-50 dark:bg-gray-900 min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
