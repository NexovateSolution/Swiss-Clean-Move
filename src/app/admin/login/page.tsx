'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

interface LoginForm {
  email: string
  password: string
}

export default function AdminLogin() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('admin.login')
  const tAdmin = useTranslations('admin')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || t('errors.loginFailed'))
      }

      const result = await response.json()
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(result.user))
      
      toast.success(tAdmin('toast.loginSuccess'))
      router.push(`/${locale}/admin`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : tAdmin('toast.loginFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
          <p className="text-blue-100 mt-2">{t('subtitle')}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('fields.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                {...register('email', { 
                  required: t('validation.emailRequired'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('validation.emailInvalid')
                  }
                })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder={t('placeholders.email')}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('fields.password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { 
                  required: t('validation.passwordRequired'),
                  minLength: {
                    value: 6,
                    message: t('validation.passwordMinLength', { count: 6 })
                  }
                })}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder={t('placeholders.password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Lock className="w-5 h-5" />
            )}
            <span>{loading ? t('actions.signingIn') : t('actions.signIn')}</span>
          </button>

          <div className="flex justify-center">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 rounded-lg border border-swiss-red/20 bg-swiss-red/10 px-3 py-2 text-sm font-medium text-swiss-red hover:bg-swiss-red/15 hover:text-swiss-red/90 transition-colors focus:outline-none focus:ring-2 focus:ring-swiss-red/30"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('returnToSite')}</span>
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">{t('demo.title')}</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>{t('demo.emailLabel')}</strong> admin@swisscleanmove.ch</p>
              <p><strong>{t('demo.passwordLabel')}</strong> admin123</p>
            </div>
          </div>
        </form>
      </motion.div>

      <Toaster position="top-right" />
    </div>
  )
}
