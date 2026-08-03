'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Download, Mail, MessageCircle, Send, X, Phone, Globe, Mail as MailIcon, Smartphone, FileEdit } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useTranslations } from 'next-intl'

export default function LetterheadNotepad() {
  const [content, setContent] = useState('')
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState('')
  const [isSending, setIsSending] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  // Focus editor on load
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  const handleDownloadPdf = async () => {
    const element = document.getElementById('letterhead-document')
    if (!element) return

    toast.loading('Generating PDF...', { id: 'pdf' })
    try {
      const html2pdf = (await import('html2pdf.js')).default
      
      // We clone the element to manipulate it for PDF without affecting UI
      const clone = element.cloneNode(true) as HTMLElement
      // Remove any contenteditable attributes for the print version
      const editable = clone.querySelector('[contenteditable]')
      if (editable) {
        editable.removeAttribute('contenteditable')
        ;(editable as HTMLElement).style.border = 'none'
        ;(editable as HTMLElement).style.outline = 'none'
      }

      const opt = {
        margin: 0,
        filename: 'SwissCleanMove_Document.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      }

      await html2pdf().set(opt).from(clone).save()
      toast.success('PDF downloaded!', { id: 'pdf' })
    } catch (error) {
      console.error(error)
      toast.error('Failed to generate PDF', { id: 'pdf' })
    }
  }

  const handleSendWhatsApp = () => {
    if (!editorRef.current) return
    let text = editorRef.current.innerText || ''
    if (!text.trim()) {
      // Fallback: remove html tags and nbsp
      text = content.replace(/<[^>]+>/g, '\n').replace(/&nbsp;/g, ' ').trim()
    }
    if (!text.trim()) {
      toast.error('Document is empty')
      return
    }
    const encoded = encodeURIComponent(text)
    
    // Create an anchor tag to ensure popups aren't blocked by Safari/Mobile
    const link = document.createElement('a')
    link.href = `https://wa.me/?text=${encoded}`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSendEmail = async () => {
    if (!recipientEmail || !recipientEmail.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    const element = document.getElementById('letterhead-document')
    if (!element) return

    setIsSending(true)
    toast.loading('Preparing document...', { id: 'email' })
    
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const clone = element.cloneNode(true) as HTMLElement
      const editable = clone.querySelector('[contenteditable]')
      if (editable) {
        editable.removeAttribute('contenteditable')
      }

      const opt = {
        margin: 0,
        filename: 'document.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      }

      // Generate base64 PDF
      const pdfBase64 = await html2pdf().set(opt).from(clone).output('datauristring')

      const response = await fetch('/api/admin/send-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: recipientEmail,
          pdfBase64,
          text: editorRef.current?.innerText || 'Please find the attached document.'
        })
      })

      if (!response.ok) throw new Error('Failed to send email')

      toast.success('Email sent successfully!', { id: 'email' })
      setEmailModalOpen(false)
      setRecipientEmail('')
    } catch (error) {
      console.error(error)
      toast.error('Failed to send email', { id: 'email' })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-center justify-between border border-gray-100 dark:border-gray-700">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Letterhead Notepad</h1>
          <p className="text-sm text-gray-500">Draft official documents or take notes.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors font-medium text-sm"
          >
            <Download size={16} /> Download PDF
          </button>
          <button 
            onClick={handleSendWhatsApp}
            className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg transition-colors font-medium text-sm"
          >
            <MessageCircle size={16} /> Send via WhatsApp
          </button>
          <button 
            onClick={() => setEmailModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            <Mail size={16} /> Send via Email
          </button>
        </div>
      </div>

      {/* A4 Paper Container */}
      <div className="flex justify-center">
        <div 
          className="bg-white shadow-2xl relative overflow-hidden print:shadow-none"
          style={{ width: '210mm', minHeight: '297mm', position: 'relative' }}
          id="letterhead-document"
        >
          {/* Header */}
          <div className="px-12 pt-12 pb-6 flex justify-between items-start border-b border-[#001233] border-b-[3px]">
            <div className="w-64">
              {/* Note: Using img instead of Next Image for better html2pdf compatibility */}
              <img src="/images/logo.png" alt="SwissCleanMove" style={{ width: '100%', height: 'auto' }} crossOrigin="anonymous" />
            </div>
            
            <div className="flex flex-col gap-2 text-[11px] text-gray-700 font-medium">
              <div className="flex items-center gap-3 justify-end">
                <span>+41 76 488 36 89</span>
                <div className="bg-[#001233] text-white p-1 rounded">
                  <Phone size={12} fill="currentColor" />
                </div>
              </div>
              <div className="flex items-center gap-3 justify-end">
                <span>+41 78 215 80 30</span>
                <div className="bg-[#cc0000] text-white p-1 rounded">
                  <Smartphone size={12} fill="currentColor" />
                </div>
              </div>
              <div className="flex items-center gap-3 justify-end">
                <span>info@swisscleanmove.ch</span>
                <div className="bg-[#001233] text-white p-1 rounded">
                  <MailIcon size={12} fill="currentColor" />
                </div>
              </div>
              <div className="flex items-center gap-3 justify-end">
                <span>www.swisscleanmove.ch</span>
                <div className="bg-[#cc0000] text-white p-1 rounded">
                  <Globe size={12} />
                </div>
              </div>
            </div>
          </div>

          {/* Watermark (Centered absolute) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] z-0">
            <img src="/images/logo.png" style={{ width: '80%' }} alt="" crossOrigin="anonymous" />
          </div>

          {/* Editable Content Area */}
          <div 
            className="px-16 py-12 min-h-[180mm] relative z-10 text-gray-800 text-[14px] leading-relaxed outline-none whitespace-pre-wrap"
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            style={{ 
              outline: 'none', 
              border: 'none',
              fontFamily: '"Arial", sans-serif'
            }}
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
          >
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 w-full h-[35mm] overflow-hidden" style={{ zIndex: 20 }}>
            {/* The text content of the footer */}
            <div className="absolute top-2 left-12 z-30">
              <div className="flex items-baseline gap-1">
                <span className="text-[#cc0000] font-bold text-sm">Swiss</span>
                <span className="text-[#001233] font-bold text-sm">CleanMove</span>
              </div>
              <div className="text-[9px] text-[#001233] mt-1 mb-2">Reinigung &bull; Umzug &bull; Facility Services</div>
              
              <div className="flex items-center gap-2 text-[9px] text-[#001233] mb-1">
                <Globe size={10} />
                <span>Orpundstrasse 31, 2504 Biel/Bienne, Switzerland</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] text-[#001233]">
                <FileEdit size={10} />
                <span>CHE-457.949.122</span>
              </div>
            </div>

            {/* SVG Swoosh Background */}
            <svg 
              className="absolute bottom-0 right-0 w-full h-full z-10" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
              style={{ display: 'block' }}
            >
              {/* Red Swoosh */}
              <polygon points="0,100 100,30 100,100" fill="#cc0000" />
              {/* Dark Blue Swoosh */}
              <polygon points="0,100 100,40.5 100,100" fill="#001233" />
            </svg>
            
            <div className="absolute bottom-4 right-12 z-30 text-white text-[10px] flex items-center gap-2">
              <Globe size={12} />
              <span>www.swisscleanmove.ch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {emailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Send Document via Email</h3>
              <button onClick={() => setEmailModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              The document will be generated as a PDF and attached to the email.
            </p>
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client Email Address
              </label>
              <input 
                type="email" 
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="client@example.com"
                autoFocus
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setEmailModalOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                disabled={isSending}
              >
                Cancel
              </button>
              <button 
                onClick={handleSendEmail}
                disabled={isSending || !recipientEmail}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
              >
                {isSending ? 'Sending...' : <><Send size={16} /> Send Email</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
